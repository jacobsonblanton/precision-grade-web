'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart, RefreshCw, ChevronDown, ChevronRight, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';
import clsx from 'clsx';
import { Order, OrderStatus } from '@/lib/types';

const STATUSES: OrderStatus[] = ['Pending', 'Processing', 'Shipped', 'Complete', 'Cancelled'];

const STATUS_CONFIG: Record<OrderStatus, { color: string; icon: React.ElementType }> = {
  Pending:    { color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20', icon: Clock },
  Processing: { color: 'text-blue-400 bg-blue-400/10 border-blue-400/20',      icon: RefreshCw },
  Shipped:    { color: 'text-violet-400 bg-violet-400/10 border-violet-400/20', icon: Truck },
  Complete:   { color: 'text-green-400 bg-green-400/10 border-green-400/20',    icon: CheckCircle },
  Cancelled:  { color: 'text-neutral-500 bg-neutral-500/10 border-neutral-500/20', icon: XCircle },
};

function StatusBadge({ status }: { status: OrderStatus }) {
  const cfg = STATUS_CONFIG[status];
  const Icon = cfg.icon;
  return (
    <span className={clsx('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border', cfg.color)}>
      <Icon size={11} />
      {status}
    </span>
  );
}

function OrderRow({ order, onStatusChange }: { order: Order; onStatusChange: (id: string, status: OrderStatus) => Promise<void> }) {
  const [expanded, setExpanded] = useState(false);
  const [updating, setUpdating] = useState(false);

  async function handleStatus(status: OrderStatus) {
    setUpdating(true);
    await onStatusChange(order.id, status);
    setUpdating(false);
  }

  return (
    <div className="border border-[#1e1e1e] rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-4 px-5 py-4 hover:bg-[#161616] transition-colors text-left"
      >
        <div className="flex-1 min-w-0 grid grid-cols-[1fr_auto_auto_auto] items-center gap-4">
          <div className="min-w-0">
            <span className="font-mono text-sm font-bold text-red-400">{order.orderNumber}</span>
            <p className="text-xs text-neutral-500 mt-0.5 truncate">{order.dealerName}</p>
          </div>
          <span className="text-xs text-neutral-500 whitespace-nowrap hidden sm:block">
            {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="text-xs text-neutral-500 whitespace-nowrap">
            {order.items.length} item{order.items.length !== 1 ? 's' : ''}
          </span>
          <StatusBadge status={order.status} />
        </div>
        {expanded
          ? <ChevronDown size={14} className="text-neutral-500 shrink-0" />
          : <ChevronRight size={14} className="text-neutral-500 shrink-0" />}
      </button>

      {expanded && (
        <div className="border-t border-[#1e1e1e]">
          {/* Items */}
          <div className="divide-y divide-[#1e1e1e]">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3 gap-4">
                <div className="min-w-0">
                  <p className="text-sm text-neutral-200 font-medium leading-snug">{item.name}</p>
                  {item.trimblePartNumber && (
                    <p className="text-xs font-mono text-neutral-500 mt-0.5">{item.trimblePartNumber}</p>
                  )}
                </div>
                <span className="text-sm text-white font-semibold shrink-0">× {item.quantity}</span>
              </div>
            ))}
          </div>

          {/* Status controls */}
          <div className="px-5 py-4 border-t border-[#1e1e1e] flex items-center gap-3 flex-wrap">
            <span className="text-xs text-neutral-500 uppercase tracking-wider">Update Status:</span>
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => handleStatus(s)}
                disabled={updating || order.status === s}
                className={clsx(
                  'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border',
                  order.status === s
                    ? STATUS_CONFIG[s].color
                    : 'text-neutral-500 border-[#2a2a2a] hover:bg-[#1e1e1e] hover:text-neutral-300',
                  updating && 'opacity-50 cursor-not-allowed',
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<OrderStatus | 'All'>('All');

  async function load() {
    setLoading(true);
    try {
      const res = await fetch('/api/orders');
      if (res.ok) setOrders(await res.json());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleStatusChange(id: string, status: OrderStatus) {
    await fetch(`/api/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status, updatedAt: new Date().toISOString() } : o));
  }

  const filtered = filter === 'All' ? orders : orders.filter((o) => o.status === filter);
  const counts = STATUSES.reduce((acc, s) => ({ ...acc, [s]: orders.filter((o) => o.status === s).length }), {} as Record<OrderStatus, number>);

  return (
    <div className="min-h-full">
      <div className="sticky top-0 z-10 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#1f1f1f] px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShoppingCart size={18} className="text-red-500" />
            <div>
              <h1 className="text-lg font-black text-white">Orders</h1>
              <p className="text-xs text-neutral-500">{orders.length} total order{orders.length !== 1 ? 's' : ''} from all dealers</p>
            </div>
          </div>
          <button onClick={load} className="p-2 rounded-lg text-neutral-400 hover:bg-[#161616] hover:text-white transition-colors">
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1.5 mt-3 flex-wrap">
          {(['All', ...STATUSES] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={clsx(
                'px-3 py-1 rounded-full text-xs font-semibold transition-all border',
                filter === s
                  ? 'bg-red-600/15 text-red-400 border-red-500/25'
                  : 'text-neutral-500 border-[#2a2a2a] hover:text-neutral-300 hover:bg-[#161616]',
              )}
            >
              {s}
              {s !== 'All' && counts[s] > 0 && (
                <span className="ml-1.5 text-[10px] opacity-70">{counts[s]}</span>
              )}
              {s === 'All' && (
                <span className="ml-1.5 text-[10px] opacity-70">{orders.length}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-6 space-y-3">
        {loading && (
          <div className="flex items-center justify-center py-16">
            <RefreshCw size={20} className="animate-spin text-red-500" />
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <ShoppingCart size={40} className="text-neutral-700 mb-4" />
            <p className="text-neutral-400 font-medium">No orders{filter !== 'All' ? ` with status "${filter}"` : ''}</p>
          </div>
        )}

        {!loading && filtered.map((order) => (
          <OrderRow key={order.id} order={order} onStatusChange={handleStatusChange} />
        ))}
      </div>
    </div>
  );
}
