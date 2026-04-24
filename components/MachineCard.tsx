'use client';

import { Cpu, CalendarCheck, MapPin, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { Machine, Dealer } from '@/lib/types';

interface MachineCardProps {
  machine: Machine & { dealer?: Dealer };
  isSelected?: boolean;
  onClick: () => void;
}

const TYPE_STYLES = {
  '2D MG': {
    badge: 'bg-blue-900/60 text-blue-300 border border-blue-700/50',
    dot: 'bg-blue-400',
    glow: 'hover:border-blue-600/50',
  },
  '2D MC': {
    badge: 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50',
    dot: 'bg-emerald-400',
    glow: 'hover:border-emerald-600/50',
  },
  '3D': {
    badge: 'bg-violet-900/60 text-violet-300 border border-violet-700/50',
    dot: 'bg-violet-400',
    glow: 'hover:border-violet-600/50',
  },
};

export default function MachineCard({ machine, isSelected, onClick }: MachineCardProps) {
  const styles = TYPE_STYLES[machine.type];

  return (
    <button
      onClick={onClick}
      className={clsx(
        'w-full text-left rounded-xl border p-4 transition-all duration-150 group',
        isSelected
          ? 'bg-red-600/10 border-red-500/50 shadow-lg shadow-red-900/20'
          : `bg-neutral-900/70 border-neutral-800 hover:bg-neutral-900 ${styles.glow}`,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className={clsx('h-2 w-2 rounded-full flex-shrink-0 mt-0.5', styles.dot)} />
          <span className="text-sm font-semibold text-white">
            Machine {machine.position}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={clsx('text-xs font-medium rounded-full px-2 py-0.5', styles.badge)}>
            {machine.type}
          </span>
          <ChevronRight
            size={14}
            className={clsx(
              'transition-colors',
              isSelected ? 'text-red-500' : 'text-neutral-600 group-hover:text-neutral-400',
            )}
          />
        </div>
      </div>

      <div className="mt-3 space-y-1.5">
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <Cpu size={11} className="flex-shrink-0 text-neutral-500" />
          <span className="font-mono truncate">{machine.serialNumber}</span>
        </div>

        {machine.dealer && (
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <MapPin size={11} className="flex-shrink-0 text-neutral-500" />
            <span className="truncate">{machine.dealer.name}</span>
          </div>
        )}

        {machine.trainingVisitDate && (
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <CalendarCheck size={11} className="flex-shrink-0 text-neutral-500" />
            <span>
              Trained{' '}
              {new Date(machine.trainingVisitDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-neutral-800">
        <span className="text-xs text-neutral-500">
          Source: <span className="text-neutral-400">{machine.source}</span>
        </span>
      </div>
    </button>
  );
}
