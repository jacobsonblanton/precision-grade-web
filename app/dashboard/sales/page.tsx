'use client';

import { useEffect, useState, useCallback } from 'react';
import { RefreshCw, MapPin, Layers, Activity, Map, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import MachineCard from '@/components/MachineCard';
import MachineDetailPanel from '@/components/MachineDetailPanel';
import DealerDetailModal from '@/components/DealerDetailModal';
import { AlphaDealerMap } from '@/components/AlphaDealerMap';
import { alphaDealers } from '@/lib/alphaDealers';
import { dealerKits } from '@/lib/dealerKits';
import { Machine, Dealer, DealerWithMachines, MachineType, AuthPayload } from '@/lib/types';

type MachineWithDealer = Machine & { dealer: Dealer };

const TYPE_GROUPS: { type: MachineType; label: string; color: string }[] = [
  { type: '2D MG', label: '2D Motor Grader', color: 'text-blue-400' },
  { type: '2D MC', label: '2D Machine Control', color: 'text-emerald-400' },
  { type: '3D', label: '3D Machine Control', color: 'text-violet-400' },
];

export default function SalesPage() {
  const [user, setUser] = useState<AuthPayload | null>(null);
  const [machines, setMachines] = useState<MachineWithDealer[]>([]);
  const [dealers, setDealers] = useState<DealerWithMachines[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMachine, setSelectedMachine] = useState<MachineWithDealer | null>(null);
  const [selectedDealer, setSelectedDealer] = useState<DealerWithMachines | null>(null);
  const [showMap, setShowMap] = useState(false);

  // Build joined alpha dealer list filtered to the logged-in rep's dealers
  const joinedAlphaDealers = alphaDealers
    .filter((dealer) => dealer.rm === user?.displayName)
    .map((dealer) => {
      const normalize = (s: string) => s.replace(/\D/g, '');
      const kit = dealerKits.find((k) => normalize(k.dealerOrgNo) === normalize(dealer.dealerOrgNo));
      return {
        ...dealer,
        twoD_guidance: kit?.twoD_guidance ?? 0,
        twoD_control: kit?.twoD_control ?? 0,
        threeD_control: kit?.threeD_control ?? 0,
        total_kits: kit?.total_kits ?? 0,
      };
    });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [meRes, machRes, dealerRes] = await Promise.all([
        fetch('/api/auth/me'),
        fetch('/api/machines'),
        fetch('/api/dealers'),
      ]);
      const [me, mach, deal] = await Promise.all([
        meRes.json(),
        machRes.json(),
        dealerRes.json(),
      ]);
      setUser(me);
      setMachines(mach);
      setDealers(deal);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const panelOpen = selectedMachine !== null;
  const trainedCount = machines.filter((m) => m.trainingVisitDate).length;

  return (
    <div className="flex h-full">
      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#1f1f1f] px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-lg font-black text-white tracking-tight">
                Precision Grade Dashboard
              </h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <MapPin size={12} className="text-red-500" />
                <p className="text-xs text-red-500 font-medium">
                  {user?.territory ?? '—'} Territory
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowMap((v) => !v)}
                className={clsx(
                  'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all',
                  showMap
                    ? 'bg-red-600 text-white'
                    : 'bg-[#161616] text-neutral-300 hover:bg-[#1e1e1e] border border-[#2a2a2a]',
                )}
                title="Toggle alpha dealer map"
              >
                <Map size={15} />
                {showMap ? 'Hide Map' : 'Alpha Map'}
                <ChevronDown size={13} className={clsx('transition-transform', showMap && 'rotate-180')} />
              </button>
              <button
                onClick={load}
                className="p-2 rounded-lg text-neutral-400 hover:bg-[#161616] hover:text-white transition-colors"
                title="Refresh"
              >
              <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            </button>
            </div>
          </div>

          <div className="flex gap-4 mt-3">
            <div className="flex items-center gap-1.5 text-xs text-neutral-400">
              <Layers size={12} className="text-red-500" />
              <span><span className="font-bold text-white">{machines.length}</span> machines</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-neutral-400">
              <Activity size={12} className="text-green-500" />
              <span><span className="font-bold text-white">{trainedCount}</span> trained</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-neutral-400">
              <MapPin size={12} className="text-neutral-500" />
              <span className="text-neutral-500">{dealers.length} dealer{dealers.length !== 1 ? 's' : ''} in territory</span>
            </div>
          </div>
        </div>

        {/* Dealer summary chips */}
        {dealers.length > 0 && (
          <div className="px-6 pt-4 flex gap-2 flex-wrap">
            {dealers.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDealer(d)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#161616] border border-[#2a2a2a] hover:border-red-500/40 hover:bg-[#1e1e1e] text-xs font-medium text-neutral-300 transition-all"
              >
                <MapPin size={10} className="text-red-500" />
                {d.name}
              </button>
            ))}
          </div>
        )}

        {/* Alpha dealer map */}
        {showMap && (
          <div className="px-6 pt-4 pb-2">
            <AlphaDealerMap dealers={joinedAlphaDealers} />
          </div>
        )}

        {/* Machine groups */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
          {loading && (
            <div className="flex items-center justify-center py-16">
              <RefreshCw size={20} className="animate-spin text-red-500" />
            </div>
          )}

          {!loading && machines.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Layers size={32} className="text-neutral-700 mb-3" />
              <p className="text-neutral-400 font-medium">No machines in your territory</p>
              <p className="text-xs text-neutral-600 mt-1">
                Territory: {user?.territory ?? 'Not assigned'}
              </p>
            </div>
          )}

          {!loading &&
            TYPE_GROUPS.map(({ type, label, color }) => {
              const group = machines.filter((m) => m.type === type);
              if (group.length === 0) return null;
              return (
                <section key={type}>
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className={clsx('text-sm font-bold uppercase tracking-wider', color)}>
                      {label}
                    </h2>
                    <span className="text-xs text-neutral-600 bg-[#161616] px-2 py-0.5 rounded-full border border-[#2a2a2a]">
                      {group.length} machine{group.length !== 1 ? 's' : ''}
                    </span>
                    <div className="flex-1 h-px bg-[#1f1f1f]" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                    {group.map((machine) => (
                      <MachineCard
                        key={machine.id}
                        machine={machine}
                        isSelected={selectedMachine?.id === machine.id}
                        onClick={() =>
                          setSelectedMachine((prev) =>
                            prev?.id === machine.id ? null : machine,
                          )
                        }
                      />
                    ))}
                  </div>
                </section>
              );
            })}
        </div>
      </div>

      {/* Side panel */}
      {panelOpen && (
        <div className="hidden lg:flex flex-col w-96 border-l border-[#1f1f1f]">
          <MachineDetailPanel
            machine={selectedMachine!}
            onClose={() => setSelectedMachine(null)}
          />
        </div>
      )}

      {/* Dealer detail modal */}
      {selectedDealer && (
        <DealerDetailModal
          dealer={selectedDealer}
          onClose={() => setSelectedDealer(null)}
        />
      )}
    </div>
  );
}
