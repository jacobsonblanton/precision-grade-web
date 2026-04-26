'use client';

import { useState } from 'react';
import { ShoppingCart, Trash2, X, Download, Send, CheckCircle, Loader2 } from 'lucide-react';
import { useCart, CartItem } from '@/lib/cartContext';
import { lbxToTrimble } from '@/lib/partNumberMapping';

function downloadCartCsv(items: CartItem[]) {
  const rows: string[] = [];
  items.forEach((item) => {
    const raw = (item.partNumber ?? '').replace(/^Part Number:\s*/i, '').trim();
    const trimble = lbxToTrimble[raw] ?? raw;
    rows.push(`${trimble},${item.quantity}`);
  });
  const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'precision-grade-cart.csv';
  a.click();
  URL.revokeObjectURL(url);
}

export default function CartPage() {
  const { items, updateQty, removeItem, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState('');

  async function handleSubmitOrder() {
    setSubmitting(true);
    setSubmitError('');
    try {
      const orderItems = items.map((item) => ({
        name: item.name,
        partNumber: item.partNumber,
        quantity: item.quantity,
      }));
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: orderItems }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Order failed.');
      setSubmitted(data.orderNumber);
      clearCart();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Order failed.');
    } finally {
      setSubmitting(false);
    }
  }

  // Group items by product
  const grouped = items.reduce<Record<string, typeof items>>((acc, item) => {
    if (!acc[item.productTitle]) acc[item.productTitle] = [];
    acc[item.productTitle].push(item);
    return acc;
  }, {});

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-full">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#1f1f1f] px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShoppingCart size={18} className="text-red-500" />
            <div>
              <h1 className="text-lg font-black text-white">Cart</h1>
              <p className="text-xs text-neutral-500">
                {totalItems === 0
                  ? 'No items selected'
                  : `${totalItems} item${totalItems !== 1 ? 's' : ''} from ${Object.keys(grouped).length} kit${Object.keys(grouped).length !== 1 ? 's' : ''}`}
              </p>
            </div>
          </div>
          {items.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => downloadCartCsv(items)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-400 hover:bg-[#161616] hover:text-white border border-[#2a2a2a] transition-all"
              >
                <Download size={13} />
                Download CSV
              </button>
              <button
                onClick={clearCart}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-400 hover:bg-red-500/10 hover:text-red-400 border border-[#2a2a2a] transition-all"
              >
                <Trash2 size={13} />
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <ShoppingCart size={40} className="text-neutral-700 mb-4" />
            <p className="text-neutral-400 font-medium">Your cart is empty</p>
            <p className="text-xs text-neutral-600 mt-1">
              Open a kit from the Components page to add items
            </p>
          </div>
        )}

        {Object.entries(grouped).map(([productTitle, groupItems]) => (
          <div key={productTitle} className="rounded-xl bg-[#111111] border border-[#1e1e1e] overflow-hidden">
            {/* Product header */}
            <div className="px-5 py-3 border-b border-[#1e1e1e] bg-[#111111]">
              <p className="text-sm font-bold text-white">{productTitle}</p>
              <p className="text-xs text-neutral-500 mt-0.5">
                {groupItems.reduce((s, i) => s + i.quantity, 0)} item{groupItems.reduce((s, i) => s + i.quantity, 0) !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Items */}
            <div className="divide-y divide-[#1e1e1e]">
              {groupItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 px-5 py-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-neutral-200 font-medium leading-snug">{item.name}</p>
                    {item.partNumber && (
                      <p className="text-xs text-neutral-500 mt-0.5">{item.partNumber}</p>
                    )}
                  </div>

                  {/* Qty stepper */}
                  <div className="flex items-center border border-[#2a2a2a] rounded shrink-0">
                    <button
                      onClick={() => updateQty(item.id, item.quantity - 1)}
                      className="px-2.5 py-1 text-neutral-400 hover:text-white hover:bg-[#161616] text-sm transition-colors"
                    >
                      −
                    </button>
                    <span className="px-3 text-sm text-white border-x border-[#2a2a2a] min-w-[32px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                      className="px-2.5 py-1 text-neutral-400 hover:text-white hover:bg-[#161616] text-sm transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 rounded-lg text-neutral-600 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0"
                    title="Remove item"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {submitError && (
          <div className="rounded-lg bg-red-900/20 border border-red-500/30 px-4 py-3 text-sm text-red-400">
            {submitError}
          </div>
        )}

        {items.length > 0 && (
          <div className="rounded-xl bg-[#111111] border border-[#1e1e1e] px-5 py-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-neutral-500 uppercase tracking-wider">Total Items</p>
              <p className="text-2xl font-black text-white mt-0.5">{totalItems}</p>
            </div>
            <button
              onClick={handleSubmitOrder}
              disabled={submitting}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
            >
              {submitting ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
              {submitting ? 'Placing Order...' : 'Submit Order Request'}
            </button>
          </div>
        )}

        {submitted && (
          <div className="rounded-xl bg-[#111111] border border-green-500/30 px-5 py-6 flex flex-col items-center text-center gap-3">
            <CheckCircle size={32} className="text-green-500" />
            <div>
              <p className="text-white font-bold text-base">Order Placed!</p>
              <p className="text-neutral-400 text-sm mt-0.5">
                Order <span className="text-red-400 font-mono font-semibold">{submitted}</span> has been submitted.
              </p>
              <p className="text-neutral-600 text-xs mt-1">You&apos;ll receive a confirmation and can track your order status on your dashboard.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}