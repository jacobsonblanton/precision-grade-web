'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { CartProvider } from '@/lib/cartContext';
import { AuthPayload } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<AuthPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => {
        if (r.status === 401) {
          router.push('/login');
          return null;
        }
        return r.json();
      })
      .then((data) => {
        if (data) setUser(data);
      })
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <Loader2 size={28} className="animate-spin text-red-500" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex h-screen bg-neutral-950 overflow-hidden">
      <CartProvider>
        <Sidebar user={user} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </CartProvider>
    </div>
  );
}
