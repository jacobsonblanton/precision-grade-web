'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  Cpu,
  BookOpen,
  LogOut,
  HardHat,
  ChevronRight,
  Package,
  Sun,
  Moon,
  ShoppingCart,
  Layers,
} from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import clsx from 'clsx';
import { AuthPayload } from '@/lib/types';

interface SidebarProps {
  user: AuthPayload;
}

const trainerLinks = [
  { href: '/dashboard/trainer', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/tips', label: 'Tips & Tricks', icon: BookOpen },
  { href: '/dashboard/components', label: 'Components', icon: Package },
];

const salesLinks = [
  { href: '/dashboard/sales', label: 'My Territory', icon: LayoutDashboard },
  { href: '/dashboard/tips', label: 'Tips & Tricks', icon: BookOpen },
  { href: '/dashboard/components', label: 'Components', icon: Package },
];

const adminLinks = [
  { href: '/dashboard/kits', label: 'Precision Grade Kits', icon: Layers },
  { href: '/dashboard/sales', label: 'Sales Territory', icon: LayoutDashboard },
  { href: '/dashboard/trainer', label: 'Trainer Dashboard', icon: HardHat },
  { href: '/dashboard/tips', label: 'Tips & Tricks', icon: BookOpen },
  { href: '/dashboard/components', label: 'Components', icon: Package },
];

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { totalCount } = useCart();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const saved = (localStorage.getItem('pg-theme') ?? 'dark') as 'dark' | 'light';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('pg-theme', next);
  }

  const links = user.role === 'admin' ? adminLinks : user.role === 'trainer' ? trainerLinks : salesLinks;

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  }

  return (
    <aside className="flex h-screen w-64 flex-col bg-neutral-950 border-r border-neutral-800 shadow-xl">
      {/* Logo / Brand */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-neutral-800">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600 text-white shadow-lg">
          <HardHat size={18} strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-red-500">
            LBX
          </p>
          <p className="text-sm font-bold text-white leading-tight">
            Precision Grade
          </p>
        </div>
      </div>

      {/* User badge */}
      <div className="mx-4 my-4 rounded-lg bg-neutral-900 border border-neutral-800 px-4 py-3">
        <p className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">
          Signed in as
        </p>
        <p className="text-sm font-semibold text-white truncate">
          {user.displayName}
        </p>
        <span
          className={clsx(
            'mt-1.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
            user.role === 'admin'
              ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
              : user.role === 'trainer'
              ? 'bg-red-600/20 text-red-300 border border-red-500/30'
              : 'bg-lbx-green/20 text-green-300 border border-green-600/30',
          )}
        >
          <Cpu size={10} />
          {user.role === 'admin' ? 'Admin' : user.role === 'trainer' ? 'Trainer' : `Sales · ${user.territory}`}
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        <p className="px-2 pt-2 pb-1 text-xs font-semibold uppercase tracking-widest text-neutral-500">
          Navigation
        </p>
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150',
                active
                  ? 'bg-red-600/15 text-red-300 border border-red-500/25'
                  : 'text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200',
              )}
            >
              <Icon
                size={16}
                className={active ? 'text-red-500' : 'text-neutral-500 group-hover:text-neutral-400'}
              />
              {label}
              {active && (
                <ChevronRight size={12} className="ml-auto text-red-500" />
              )}
            </Link>
          );
        })}

        {/* Cart link */}
        {(() => {
          const active = pathname.startsWith('/dashboard/cart');
          return (
            <Link
              href="/dashboard/cart"
              className={clsx(
                'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150',
                active
                  ? 'bg-red-600/15 text-red-300 border border-red-500/25'
                  : 'text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200',
              )}
            >
              <ShoppingCart
                size={16}
                className={active ? 'text-red-500' : 'text-neutral-500 group-hover:text-neutral-400'}
              />
              Cart
              {totalCount > 0 && (
                <span className="ml-auto flex items-center justify-center rounded-full bg-red-600 text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1">
                  {totalCount}
                </span>
              )}
              {active && totalCount === 0 && (
                <ChevronRight size={12} className="ml-auto text-red-500" />
              )}
            </Link>
          );
        })()}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-5 pt-2 border-t border-neutral-800">
        <button
          onClick={toggleTheme}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200 transition-all duration-150 mb-1"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-150"
        >
          <LogOut size={16} />
          Sign Out
        </button>
        <p className="mt-3 px-2 text-xs text-neutral-600">
          Precision Grade Dashboard v1.0
        </p>
      </div>
    </aside>
  );
}
