'use client';

import { X, MapPin, Phone, User, Package, Wrench, Cpu, CalendarCheck } from 'lucide-react';
import clsx from 'clsx';
import { DealerWithMachines, Machine } from '@/lib/types';

interface DealerDetailModalProps {
  dealer: DealerWithMachines;
  onClose: () => void;
}

const TYPE_BADGE = {
  '2D MG': 'bg-blue-900/60 text-blue-300 border border-blue-700/50',
  '2D MC': 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50',
  '3D': 'bg-violet-900/60 text-violet-300 border border-violet-700/50',
};

function MachineSerials({ machine }: { machine: Machine }) {
  return (
    <div className="rounded-lg bg-[#111111] border border-[#1e1e1e] p-3">
      <div className="flex items-center gap-2 mb-2">
        <span className={clsx('text-xs font-medium px-2 py-0.5 rounded-full', TYPE_BADGE[machine.type])}>
          {machine.type}
        </span>
        <span className="text-xs text-neutral-400">Machine {machine.position}</span>
      </div>
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-neutral-500">Machine S/N</span>
          <span className="font-mono text-white">{machine.serialNumber}</span>
        </div>
        {machine.ecsSerial && (
          <div className="flex justify-between text-xs">
            <span className="text-neutral-500">EC520 S/N</span>
            <span className="font-mono text-white">{machine.ecsSerial}</span>
          </div>
        )}
        {machine.tdsSerial && (
          <div className="flex justify-between text-xs">
            <span className="text-neutral-500">TD540 S/N</span>
            <span className="font-mono text-white">{machine.tdsSerial}</span>
          </div>
        )}
        {machine.gsSerials?.map((sn, i) => (
          <div key={i} className="flex justify-between text-xs">
            <span className="text-neutral-500">
              GS520{machine.gsSerials!.length > 1 ? ` #${i + 1}` : ''} S/N
            </span>
            <span className="font-mono text-white">{sn}</span>
          </div>
        ))}
        {machine.gnssSerials?.map((sn, i) => (
          <div key={i} className="flex justify-between text-xs">
            <span className="text-neutral-500">GNSS Rx{machine.gnssSerials!.length > 1 ? ` #${i + 1}` : ''} S/N</span>
            <span className="font-mono text-white">{sn}</span>
          </div>
        ))}
        {machine.trainingVisitDate && (
          <div className="flex justify-between text-xs pt-1 border-t border-[#1e1e1e] mt-1">
            <span className="text-neutral-500">Training Visit</span>
            <span className="text-red-500">
              {new Date(machine.trainingVisitDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DealerDetailModal({ dealer, onClose }: DealerDetailModalProps) {
  const grouped = {
    '2D MG': dealer.machines.filter((m) => m.type === '2D MG'),
    '2D MC': dealer.machines.filter((m) => m.type === '2D MC'),
    '3D': dealer.machines.filter((m) => m.type === '3D'),
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#0d0d0d] border border-[#1f1f1f] rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 bg-[#111111] border-b border-[#1f1f1f]">
          <div>
            <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">
              Dealer Profile
            </p>
            <h2 className="text-lg font-bold text-white">{dealer.name}</h2>
            <div className="flex items-center gap-3 mt-1.5 flex-wrap">
              <span className="flex items-center gap-1.5 text-xs text-neutral-400">
                <MapPin size={11} />
                {dealer.location}
              </span>
              {dealer.phone && (
                <span className="flex items-center gap-1.5 text-xs text-neutral-400">
                  <Phone size={11} />
                  {dealer.phone}
                </span>
              )}
              {dealer.contactName && (
                <span className="flex items-center gap-1.5 text-xs text-neutral-400">
                  <User size={11} />
                  {dealer.contactName}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-neutral-400 hover:bg-[#161616] hover:text-white transition-colors flex-shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Territory */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-500 uppercase tracking-wider">Territory:</span>
            <span className="text-sm font-semibold text-red-500">{dealer.territory}</span>
          </div>

          {/* Machines by type */}
          {(Object.keys(grouped) as Array<keyof typeof grouped>).map((type) => {
            if (grouped[type].length === 0) return null;
            return (
              <div key={type}>
                <div className="flex items-center gap-2 mb-3">
                  <Cpu size={13} className="text-neutral-500" />
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    {type} Machines
                  </h3>
                  <span className="text-xs text-slate-600">
                    ({grouped[type].length})
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {grouped[type].map((m) => (
                    <MachineSerials key={m.id} machine={m} />
                  ))}
                </div>
              </div>
            );
          })}

          {dealer.machines.length === 0 && (
            <p className="text-sm text-neutral-500 text-center py-4">
              No machines registered for this dealer.
            </p>
          )}

          {/* Parts / Warranty */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dealer.warrantyParts && (
              <div className="rounded-xl bg-[#111111] border border-[#1e1e1e] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Wrench size={13} className="text-red-500" />
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-red-500">
                    Warranty Parts
                  </h4>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">{dealer.warrantyParts}</p>
              </div>
            )}
            {dealer.partsOrdered && (
              <div className="rounded-xl bg-[#111111] border border-[#1e1e1e] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Package size={13} className="text-red-500" />
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-red-500">
                    Parts Ordered
                  </h4>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">{dealer.partsOrdered}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#111111] border-t border-[#1f1f1f] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#1e1e1e] hover:bg-[#2a2a2a] text-sm text-white font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
