'use client';

import { useState } from 'react';
import {
  Search,
  Building2,
  Cpu,
  X,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import clsx from 'clsx';
import { DealerWithMachines, Machine, Dealer } from '@/lib/types';

interface SearchPanelProps {
  onDealerSelect: (dealer: DealerWithMachines) => void;
  onMachineSelect: (machine: Machine & { dealer: Dealer }) => void;
}

type SearchMode = 'dealer' | 'serial';

export default function SearchPanel({ onDealerSelect, onMachineSelect }: SearchPanelProps) {
  const [mode, setMode] = useState<SearchMode>('dealer');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [dealerResults, setDealerResults] = useState<DealerWithMachines[]>([]);
  const [machineResults, setMachineResults] = useState<(Machine & { dealer: Dealer })[]>([]);

  async function handleSearch() {
    if (!query.trim()) return;
    setLoading(true);
    setDealerResults([]);
    setMachineResults([]);

    try {
      if (mode === 'dealer') {
        const res = await fetch(`/api/dealers?search=${encodeURIComponent(query)}`);
        const data = await res.json();
        setDealerResults(data);
      } else {
        const res = await fetch(`/api/machines?search=${encodeURIComponent(query)}`);
        const data = await res.json();
        setMachineResults(data);
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }

  function clearSearch() {
    setQuery('');
    setDealerResults([]);
    setMachineResults([]);
  }

  const hasResults = dealerResults.length > 0 || machineResults.length > 0;
  const noResults =
    !loading && query && !hasResults;

  return (
    <div className="flex flex-col h-full bg-[#0d0d0d] border-l border-[#1f1f1f]">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#1f1f1f] bg-[#0d0d0d]">
        <h2 className="text-sm font-bold text-white mb-3">Search</h2>

        {/* Mode toggle */}
        <div className="flex gap-1 bg-[#0a0a0a] p-1 rounded-lg mb-3">
          <button
            onClick={() => { setMode('dealer'); clearSearch(); }}
            className={clsx(
              'flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all',
              mode === 'dealer'
                ? 'bg-red-600 text-white'
                : 'text-neutral-400 hover:text-neutral-200',
            )}
          >
            <Building2 size={12} />
            By Dealer
          </button>
          <button
            onClick={() => { setMode('serial'); clearSearch(); }}
            className={clsx(
              'flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all',
              mode === 'serial'
                ? 'bg-red-600 text-white'
                : 'text-neutral-400 hover:text-neutral-200',
            )}
          >
            <Cpu size={12} />
            By Serial #
          </button>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder={
              mode === 'dealer'
                ? 'Dealer name or city...'
                : 'Serial number...'
            }
            className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg pl-9 pr-9 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20"
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-slate-300"
            >
              <X size={12} />
            </button>
          )}
        </div>

        <button
          onClick={handleSearch}
          disabled={!query.trim() || loading}
          className="mt-2 w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold transition-colors"
        >
          {loading ? <Loader2 size={13} className="animate-spin" /> : <Search size={13} />}
          Search
        </button>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        {noResults && (
          <p className="text-center text-xs text-neutral-500 py-6">
            No results found for &quot;{query}&quot;
          </p>
        )}

        {/* Dealer results */}
        {dealerResults.map((dealer) => (
          <button
            key={dealer.id}
            onClick={() => onDealerSelect(dealer)}
            className="w-full text-left rounded-xl bg-[#111111] border border-[#1e1e1e] p-4 hover:bg-[#161616] hover:border-red-500/30 transition-all group"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <Building2 size={14} className="text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-white leading-tight">
                  {dealer.name}
                </span>
              </div>
              <ChevronRight size={14} className="text-neutral-600 group-hover:text-red-500 flex-shrink-0 mt-0.5 transition-colors" />
            </div>
            <p className="text-xs text-neutral-400 mt-1 ml-5">{dealer.location}</p>
            <p className="text-xs text-neutral-500 ml-5">
              {dealer.machines.length} machine{dealer.machines.length !== 1 ? 's' : ''} &middot; {dealer.territory}
            </p>
          </button>
        ))}

        {/* Machine results */}
        {machineResults.map((machine) => (
          <button
            key={machine.id}
            onClick={() => onMachineSelect(machine)}
            className="w-full text-left rounded-xl bg-[#111111] border border-[#1e1e1e] p-4 hover:bg-[#161616] hover:border-red-500/30 transition-all group"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <Cpu size={14} className="text-red-500 flex-shrink-0 mt-0.5" />
                <span className="font-mono text-sm font-semibold text-white">
                  {machine.serialNumber}
                </span>
              </div>
              <ChevronRight size={14} className="text-neutral-600 group-hover:text-red-500 flex-shrink-0 mt-0.5 transition-colors" />
            </div>
            <div className="mt-1 ml-5 flex items-center gap-2 flex-wrap">
              <span className="text-xs text-neutral-400">{machine.type}</span>
              <span className="text-neutral-600">·</span>
              <span className="text-xs text-neutral-400">{machine.dealer?.name}</span>
            </div>
            {machine.ecsSerial && (
              <p className="text-xs font-mono text-neutral-500 ml-5 mt-0.5">
                ECS: {machine.ecsSerial}
              </p>
            )}
          </button>
        ))}

        {/* Hint text */}
        {!query && (
          <div className="text-center py-6 px-4">
            <Search size={24} className="mx-auto text-neutral-700 mb-2" />
            <p className="text-xs text-neutral-500">
              {mode === 'dealer'
                ? 'Enter a dealer name or city to search'
                : 'Enter any serial number (machine, EC520, TD540, GS520)'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
