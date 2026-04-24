'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: string; // productKey + '||' + name
  productKey: string;
  productTitle: string;
  name: string;
  partNumber?: string;
  price?: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addItems: (newItems: Omit<CartItem, 'id'>[]) => void;
  updateQty: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function addItems(newItems: Omit<CartItem, 'id'>[]) {
    setItems((prev) => {
      const next = [...prev];
      for (const item of newItems) {
        const id = `${item.productKey}||${item.name}`;
        const existing = next.find((i) => i.id === id);
        if (existing) {
          existing.quantity += item.quantity;
        } else {
          next.push({ ...item, id });
        }
      }
      return next;
    });
  }

  function updateQty(id: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(id);
    } else {
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
    }
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function clearCart() {
    setItems([]);
  }

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItems, updateQty, removeItem, clearCart, totalCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}