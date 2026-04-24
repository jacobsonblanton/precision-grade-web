'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { AuthPayload } from '@/lib/types';
import { kitSales, KitSale } from '@/lib/kitSales';
import { Layers, Search, ChevronUp, ChevronDown, ChevronRight, DollarSign, Package, Building2, CalendarDays, RefreshCw } from 'lucide-react';
import clsx from 'clsx';

type SortKey = 'name' | 'units' | 'revenue' | 'lastSale';
type SortDir = 'asc' | 'desc';
type View = 'dealers' | 'transactions';
type KitType = 'all' | 'full' | 'partial';

const FULL_KIT_THRESHOLD = 3000;
function isFullKit(s: KitSale) { return s.cost >= FULL_KIT_THRESHOLD; }

interface DealerSummary {
  branch: string;
  name: string;
  sales: KitSale[];
  units: number;
  revenue: number;
  lastSale: string; // ISO for sorting
  lastSaleDisplay: string;
}

function parseDate(d: string): Date {
  // handles both YYYY-MM-DD and M/D/YYYY
  if (d.includes('-')) {
    const [y, m, day] = d.split('-').map(Number);
    return new Date(y, m - 1, day);
  }
  const [m, day, y] = d.split('/').map(Number);
  return new Date(y, m - 1, day);
}

function fmt(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

export default function KitsPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthPayload | null>(null);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('revenue');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [view, setView] = useState<View>('dealers');
  const [txSearch, setTxSearch] = useState('');
  const [kitType, setKitType] = useState<KitType>('all');
  const [allSales, setAllSales] = useState<KitSale[]>(kitSales);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshMsg, setRefreshMsg] = useState('');

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => {
        if (r.status === 401) { router.push('/login'); return null; }
        return r.json();
      })
      .then((data) => {
        if (data && data.role !== 'admin') router.replace('/dashboard');
        if (data) setUser(data);
      });
  }, [router]);

  useEffect(() => {
    fetch('/api/kit-sales')
      .then((r) => r.ok ? r.json() : null)
      .then((json) => {
        if (json?.data?.length) {
          setAllSales(json.data);
        }
      })
      .catch(() => {}); // silently keep static fallback
  }, []);

  const typedSales = useMemo(() =>
    kitType === 'all' ? allSales :
    kitType === 'full' ? allSales.filter(isFullKit) :
    allSales.filter((s) => !isFullKit(s)),
  [kitType, allSales]);

  const dealerMap = useMemo(() => {
    const map = new Map<string, DealerSummary>();
    for (const s of typedSales) {
      const key = s.branch;
      if (!map.has(key)) {
        map.set(key, { branch: s.branch, name: s.name, sales: [], units: 0, revenue: 0, lastSale: '', lastSaleDisplay: '' });
      }
      const d = map.get(key)!;
      d.sales.push(s);
      d.units += s.qty;
      d.revenue += s.cost * s.qty;
      const dt = parseDate(s.orderDate);
      if (!d.lastSale || dt > parseDate(d.lastSale)) {
        d.lastSale = s.orderDate;
        d.lastSaleDisplay = s.orderDate;
      }
    }
    // sort each dealer's sales newest first
    for (const d of map.values()) {
      d.sales.sort((a, b) => parseDate(b.orderDate).getTime() - parseDate(a.orderDate).getTime());
    }
    return map;
  }, [typedSales]);

  const dealers = useMemo(() => Array.from(dealerMap.values()), [dealerMap]);

  const totalRevenue = dealers.reduce((s, d) => s + d.revenue, 0);
  const totalUnits = dealers.reduce((s, d) => s + d.units, 0);
  const latestSale = dealers.reduce((best, d) => {
    return !best || parseDate(d.lastSale) > parseDate(best) ? d.lastSale : best;
  }, '' as string);

  const filtered = dealers.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.branch.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortKey === 'name') return sortDir === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    if (sortKey === 'units') return sortDir === 'asc' ? a.units - b.units : b.units - a.units;
    if (sortKey === 'revenue') return sortDir === 'asc' ? a.revenue - b.revenue : b.revenue - a.revenue;
    if (sortKey === 'lastSale') {
      const ta = parseDate(a.lastSale).getTime();
      const tb = parseDate(b.lastSale).getTime();
      return sortDir === 'asc' ? ta - tb : tb - ta;
    }
    return 0;
  });

  const filteredTx = typedSales
    .filter((s) =>
      s.name.toLowerCase().includes(txSearch.toLowerCase()) ||
      s.description.toLowerCase().includes(txSearch.toLowerCase()) ||
      s.partNo.toLowerCase().includes(txSearch.toLowerCase()) ||
      s.invoice.toLowerCase().includes(txSearch.toLowerCase())
    )
    .sort((a, b) => parseDate(b.orderDate).getTime() - parseDate(a.orderDate).getTime());

  async function handleRefresh() {
    setRefreshing(true);
    setRefreshMsg('');
    try {
      const res = await fetch('/api/kit-sales/refresh', { method: 'POST' });
      const json = await res.json();
      if (json.success) {
        setRefreshMsg(json.log ?? 'Refreshed successfully.');
        // Reload the page so the new kitSales.ts data is picked up
        window.location.reload();
      } else {
        setRefreshMsg(`Error: ${json.error}`);
      }
    } catch (e) {
      setRefreshMsg('Refresh failed.');
    } finally {
      setRefreshing(false);
    }
  }

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('desc'); }
  }

  function toggleExpand(branch: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(branch) ? next.delete(branch) : next.add(branch);
      return next;
    });
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <ChevronUp size={12} className="text-neutral-600" />;
    return sortDir === 'asc'
      ? <ChevronUp size={12} className="text-red-400" />
      : <ChevronDown size={12} className="text-red-400" />;
  }

  if (!user) return null;

  const statCards = [
    { label: 'Total Units Sold', value: totalUnits.toString(), icon: Package, color: 'text-red-400', bg: 'bg-red-600/10 border-red-500/20' },
    { label: 'Total Revenue', value: fmt(totalRevenue), icon: DollarSign, color: 'text-green-400', bg: 'bg-green-600/10 border-green-500/20' },
    { label: 'Active Dealers', value: dealers.length.toString(), icon: Building2, color: 'text-blue-400', bg: 'bg-blue-600/10 border-blue-500/20' },
    { label: 'Most Recent Sale', value: latestSale, icon: CalendarDays, color: 'text-orange-400', bg: 'bg-orange-600/10 border-orange-500/20' },
  ];

  const colHeaders: { key: SortKey; label: string }[] = [
    { key: 'name', label: 'Dealer' },
    { key: 'units', label: 'Units Sold' },
    { key: 'revenue', label: 'Revenue' },
    { key: 'lastSale', label: 'Last Sale' },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600/20 border border-red-500/30">
            <Layers size={20} className="text-red-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Precision Grade Kits</h1>
            <p className="text-sm text-neutral-400">All kits sold and deployed in the field since January 2018. </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Refresh button */}
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            title={refreshMsg || 'Refresh data from database'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-neutral-700 text-neutral-400 hover:text-white hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
            {refreshing ? 'Refreshing…' : 'Refresh Data'}
          </button>

          {/* Kit type filter */}
          <div className="flex items-center gap-1 rounded-lg bg-neutral-900 border border-neutral-800 p-1">
            {([
              { key: 'all',     label: 'All Kits' },
              { key: 'full',    label: 'Full Kits' },
              { key: 'partial', label: 'Partial Kits' },
            ] as { key: KitType; label: string }[]).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setKitType(key)}
                className={clsx(
                  'px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
                  kitType === key ? 'bg-red-600 text-white' : 'text-neutral-400 hover:text-neutral-200'
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1 rounded-lg bg-neutral-900 border border-neutral-800 p-1">
            {(['dealers', 'transactions'] as View[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={clsx(
                  'px-3 py-1.5 rounded-md text-xs font-medium transition-colors capitalize',
                  view === v ? 'bg-red-600 text-white' : 'text-neutral-400 hover:text-neutral-200'
                )}
              >
                {v === 'dealers' ? 'By Dealer' : 'All Transactions'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <div key={s.label} className={clsx('rounded-xl border p-4', s.bg)}>
            <div className="flex items-center gap-2 mb-2">
              <s.icon size={14} className={s.color} />
              <p className="text-xs text-neutral-500 uppercase tracking-wider">{s.label}</p>
            </div>
            <p className={clsx('text-2xl font-bold', s.color)}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* By Dealer view */}
      {view === 'dealers' && (
        <div className="rounded-xl bg-neutral-900 border border-neutral-800 overflow-hidden">
          <div className="px-4 py-3 border-b border-neutral-800 flex items-center gap-2">
            <Search size={15} className="text-neutral-500 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search by dealer name or org number…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm text-white placeholder-neutral-600 outline-none flex-1"
            />
            {search && <button onClick={() => setSearch('')} className="text-xs text-neutral-500 hover:text-neutral-300">Clear</button>}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="px-4 py-2.5 w-8" />
                  <th className="px-4 py-2.5 w-8 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">#</th>
                  {colHeaders.map(({ key, label }) => (
                    <th
                      key={key}
                      onClick={() => handleSort(key)}
                      className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500 cursor-pointer hover:text-neutral-300 select-none"
                    >
                      <span className="flex items-center gap-1">{label}<SortIcon col={key} /></span>
                    </th>
                  ))}
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">Org No.</th>
                </tr>
              </thead>
              <tbody>
                {sorted.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-neutral-600 text-sm">No dealers match your search.</td>
                  </tr>
                ) : sorted.map((d, i) => {
                  const open = expanded.has(d.branch);
                  return [
                    <tr
                      key={d.branch}
                      onClick={() => toggleExpand(d.branch)}
                      className="border-b border-neutral-800/50 hover:bg-neutral-800/30 transition-colors cursor-pointer"
                    >
                      <td className="px-3 py-3">
                        <ChevronRight
                          size={14}
                          className={clsx('text-neutral-500 transition-transform', open && 'rotate-90')}
                        />
                      </td>
                      <td className="px-4 py-3 text-neutral-600 text-xs">{i + 1}</td>
                      <td className="px-4 py-3 text-white font-medium">{d.name}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium border bg-red-600/20 text-red-300 border-red-500/30">
                          {d.units}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-green-400 font-medium">{fmt(d.revenue)}</td>
                      <td className="px-4 py-3 text-neutral-400 text-xs">{d.lastSaleDisplay}</td>
                      <td className="px-4 py-3 text-neutral-500 font-mono text-xs">{d.branch}</td>
                    </tr>,
                    open && (
                      <tr key={`${d.branch}-exp`} className="bg-neutral-800/20">
                        <td colSpan={7} className="px-6 pb-3 pt-1">
                          <table className="w-full text-xs">
                            <thead>
                              <tr className="text-neutral-500 border-b border-neutral-700/50">
                                <th className="pb-1.5 text-left font-semibold uppercase tracking-wider pr-4">Date</th>
                                <th className="pb-1.5 text-left font-semibold uppercase tracking-wider pr-4">Description</th>
                                <th className="pb-1.5 text-left font-semibold uppercase tracking-wider pr-4">Part #</th>
                                <th className="pb-1.5 text-left font-semibold uppercase tracking-wider pr-4">Order #</th>
                                <th className="pb-1.5 text-left font-semibold uppercase tracking-wider pr-4">Invoice</th>
                                <th className="pb-1.5 text-right font-semibold uppercase tracking-wider pr-4">Net</th>
                                <th className="pb-1.5 text-right font-semibold uppercase tracking-wider">Cost</th>
                              </tr>
                            </thead>
                            <tbody>
                              {d.sales.map((s, j) => (
                                <tr key={j} className="border-b border-neutral-700/20 last:border-0">
                                  <td className="py-1.5 pr-4 text-neutral-400">{s.orderDate}</td>
                                  <td className="py-1.5 pr-4 text-slate-300">{s.description}</td>
                                  <td className="py-1.5 pr-4 font-mono text-neutral-400">{s.partNo}</td>
                                  <td className="py-1.5 pr-4 font-mono text-neutral-500">{s.orderNo}</td>
                                  <td className="py-1.5 pr-4 font-mono text-neutral-500">{s.invoice}</td>
                                  <td className="py-1.5 pr-4 text-right text-blue-400">{fmt(s.net * s.qty)}</td>
                                  <td className="py-1.5 text-right text-green-400">{fmt(s.cost * s.qty)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    ),
                  ];
                })}
              </tbody>
              {sorted.length > 0 && (
                <tfoot>
                  <tr className="border-t border-neutral-700 bg-neutral-800/30">
                    <td className="px-4 py-3" />
                    <td className="px-4 py-3" />
                    <td className="px-4 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                      Totals ({sorted.length} dealers)
                    </td>
                    <td className="px-4 py-3 font-bold text-red-400">
                      {sorted.reduce((s, d) => s + d.units, 0)}
                    </td>
                    <td className="px-4 py-3 font-bold text-green-400">
                      {fmt(sorted.reduce((s, d) => s + d.revenue, 0))}
                    </td>
                    <td className="px-4 py-3" />
                    <td className="px-4 py-3" />
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
      )}

      {/* All Transactions view */}
      {view === 'transactions' && (
        <div className="rounded-xl bg-neutral-900 border border-neutral-800 overflow-hidden">
          <div className="px-4 py-3 border-b border-neutral-800 flex items-center gap-2">
            <Search size={15} className="text-neutral-500 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search by dealer, description, part number, or invoice…"
              value={txSearch}
              onChange={(e) => setTxSearch(e.target.value)}
              className="bg-transparent text-sm text-white placeholder-neutral-600 outline-none flex-1"
            />
            {txSearch && <button onClick={() => setTxSearch('')} className="text-xs text-neutral-500 hover:text-neutral-300">Clear</button>}
            <span className="text-xs text-neutral-600">{filteredTx.length} records</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">Date</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">Dealer</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">Description</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">Part #</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">Order #</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">Invoice</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">Qty</th>
                  <th className="px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-neutral-500">Net</th>
                  <th className="px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-neutral-500">Cost</th>
                </tr>
              </thead>
              <tbody>
                {filteredTx.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-neutral-600 text-sm">No transactions match your search.</td>
                  </tr>
                ) : filteredTx.map((s, i) => (
                  <tr key={i} className="border-b border-neutral-800/50 hover:bg-neutral-800/30 transition-colors">
                    <td className="px-4 py-3 text-neutral-400 text-xs whitespace-nowrap">{s.orderDate}</td>
                    <td className="px-4 py-3 text-white font-medium">{s.name}</td>
                    <td className="px-4 py-3 text-slate-300">{s.description}</td>
                    <td className="px-4 py-3 font-mono text-xs text-neutral-400">{s.partNo}</td>
                    <td className="px-4 py-3 font-mono text-xs text-neutral-500">{s.orderNo}</td>
                    <td className="px-4 py-3 font-mono text-xs text-neutral-500">{s.invoice}</td>
                    <td className="px-4 py-3 text-neutral-300">{s.qty}</td>
                    <td className="px-4 py-3 text-right text-blue-400 font-medium">{fmt(s.net * s.qty)}</td>
                    <td className="px-4 py-3 text-right text-green-400 font-medium">{fmt(s.cost * s.qty)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
