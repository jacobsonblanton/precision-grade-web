'use client';

import { X, Cpu, CalendarCheck, MapPin, Package, Wrench, Radio } from 'lucide-react';
import clsx from 'clsx';
import { Machine, Dealer } from '@/lib/types';

interface MachineDetailPanelProps {
  machine: Machine & { dealer?: Dealer };
  onClose: () => void;
}

const TYPE_COLORS = {
  '2D MG': 'text-blue-400 border-blue-700/50 bg-blue-900/30',
  '2D MC': 'text-emerald-400 border-emerald-700/50 bg-emerald-900/30',
  '3D': 'text-violet-400 border-violet-700/50 bg-violet-900/30',
};

function SerialRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 border-b border-neutral-800 last:border-0">
      <span className="text-xs text-neutral-400 flex-shrink-0 w-28">{label}</span>
      <span className="font-mono text-xs text-white text-right break-all">{value}</span>
    </div>
  );
}

export default function MachineDetailPanel({ machine, onClose }: MachineDetailPanelProps) {
  const typeColor = TYPE_COLORS[machine.type];

  return (
    <div className="flex flex-col h-full bg-neutral-900/90 border-l border-neutral-800 animate-slide-in">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800 bg-neutral-900">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={clsx('text-xs font-semibold px-2 py-0.5 rounded-full border', typeColor)}>
              {machine.type}
            </span>
            <span className="text-xs text-neutral-500">Machine {machine.position}</span>
          </div>
          <h2 className="text-base font-bold text-white">Machine Detail</h2>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
        {/* Machine serial block */}
        <div className="rounded-xl bg-neutral-900/60 border border-neutral-800 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Cpu size={14} className="text-red-500" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-red-500">
              Serial Numbers
            </h3>
          </div>
          <SerialRow label="Machine S/N" value={machine.serialNumber} />
          <SerialRow label="EC520 S/N" value={machine.ecsSerial} />
          <SerialRow label="TD540 S/N" value={machine.tdsSerial} />
          {machine.gsSerials?.map((sn, i) => (
            <SerialRow key={i} label={`GS520 S/N${machine.gsSerials!.length > 1 ? ` ${i + 1}` : ''}`} value={sn} />
          ))}
          {machine.gnssSerials?.map((sn, i) => (
            <SerialRow key={i} label={`GNSS Rx S/N${machine.gnssSerials!.length > 1 ? ` ${i + 1}` : ''}`} value={sn} />
          ))}
        </div>

        {/* Training */}
        <div className="rounded-xl bg-neutral-900/60 border border-neutral-800 p-4">
          <div className="flex items-center gap-2 mb-3">
            <CalendarCheck size={14} className="text-red-500" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-red-500">
              Training Info
            </h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-neutral-400">Training Visit</span>
              <span className="text-white font-medium">
                {machine.trainingVisitDate
                  ? new Date(machine.trainingVisitDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : 'Not scheduled'}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-neutral-400">Install Date</span>
              <span className="text-white font-medium">
                {machine.installDate
                  ? new Date(machine.installDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : '—'}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-neutral-400">Model</span>
              <span className="text-white font-medium">{machine.model ?? '—'}</span>
            </div>
          </div>
        </div>

        {/* Dealer */}
        {machine.dealer && (
          <div className="rounded-xl bg-neutral-900/60 border border-neutral-800 p-4">
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={14} className="text-red-500" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-red-500">
                Dealer
              </h3>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-400">Name</span>
                <span className="text-white font-medium">{machine.dealer.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Location</span>
                <span className="text-white font-medium">{machine.dealer.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Territory</span>
                <span className="text-white font-medium">{machine.dealer.territory}</span>
              </div>
              {machine.dealer.contactName && (
                <div className="flex justify-between">
                  <span className="text-neutral-400">Contact</span>
                  <span className="text-white font-medium">{machine.dealer.contactName}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Data source */}
        <div className="rounded-xl bg-neutral-900/60 border border-neutral-800 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Radio size={14} className="text-red-500" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-red-500">
              Data Source
            </h3>
          </div>
          <span className="text-sm text-white font-medium">{machine.source}</span>
        </div>
      </div>
    </div>
  );
}
