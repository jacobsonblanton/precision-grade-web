'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart, Package, Clock, CheckCircle, Truck, XCircle, RefreshCw, ChevronDown, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { Order, OrderStatus } from '@/lib/types';

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; icon: React.ElementType }> = {
  Pending:    { label: 'Pending',    color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20', icon: Clock },
  Processing: { label: 'Processing', color: 'text-blue-400 bg-blue-400/10 border-blue-400/20',      icon: RefreshCw },
  Shipped:    { label: 'Shipped',    color: 'text-violet-400 bg-violet-400/10 border-violet-400/20', icon: Truck },
  Complete:   { label: 'Complete',   color: 'text-green-400 bg-green-400/10 border-green-400/20',    icon: CheckCircle },
  Cancelled:  { label: 'Cancelled',  color: 'text-neutral-500 bg-neutral-500/10 border-neutral-500/20', icon: XCircle },
};

function StatusBadge({ status }: { status: OrderStatus }) {
  const cfg = STATUS_CONFIG[status];
  const Icon = cfg.icon;
  return (
    <span className={clsx('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border', cfg.color)}>
      <Icon size={11} />
      {cfg.label}
    </span>
  );
}

function OrderRow({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-[#1e1e1e] rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-4 px-5 py-4 hover:bg-[#161616] transition-colors text-left"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono text-sm font-bold text-red-400">{order.orderNumber}</span>
            <StatusBadge status={order.status} />
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            {' · '}{order.items.length} item{order.items.length !== 1 ? 's' : ''}
          </p>
        </div>
        {expanded
          ? <ChevronDown size={14} className="text-neutral-500 shrink-0" />
          : <ChevronRight size={14} className="text-neutral-500 shrink-0" />}
      </button>

      {expanded && (
        <div className="border-t border-[#1e1e1e] divide-y divide-[#1e1e1e]">
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
          {order.notes && (
            <div className="px-5 py-3">
              <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Notes</p>
              <p className="text-sm text-neutral-300">{order.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function DealerPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

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

  const activeOrders = orders.filter((o) => o.status !== 'Complete' && o.status !== 'Cancelled');
  const pastOrders = orders.filter((o) => o.status === 'Complete' || o.status === 'Cancelled');

  return (
    <div className="min-h-full">
      <div className="sticky top-0 z-10 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#1f1f1f] px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Package size={18} className="text-red-500" />
            <div>
              <h1 className="text-lg font-black text-white">My Orders</h1>
              <p className="text-xs text-neutral-500">Track your Precision Grade kit orders</p>
            </div>
          </div>
          <button
            onClick={load}
            className="p-2 rounded-lg text-neutral-400 hover:bg-[#161616] hover:text-white transition-colors"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      <div className="px-6 py-6 space-y-8">
        {loading && (
          <div className="flex items-center justify-center py-16">
            <RefreshCw size={20} className="animate-spin text-red-500" />
          </div>
        )}

        {!loading && orders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <ShoppingCart size={40} className="text-neutral-700 mb-4" />
            <p className="text-neutral-400 font-medium">No orders yet</p>
            <p className="text-xs text-neutral-600 mt-1">
              Add items to your cart and submit an order to get started
            </p>
          </div>
        )}

        {!loading && activeOrders.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 mb-3">Active Orders</p>
            <div className="space-y-3">
              {activeOrders.map((order) => <OrderRow key={order.id} order={order} />)}
            </div>
          </div>
        )}

        {!loading && pastOrders.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 mb-3">Order History</p>
            <div className="space-y-3">
              {pastOrders.map((order) => <OrderRow key={order.id} order={order} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
