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
    <aside className="flex h-screen w-[220px] flex-shrink-0 flex-col bg-[#0d0d0d] border-r border-[#1f1f1f]">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-4 border-b border-[#1f1f1f]">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-red-600 text-white">
          <HardHat size={15} strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500 leading-none">LBX</p>
          <p className="text-[13px] font-bold text-white leading-tight">Precision Grade</p>
        </div>
      </div>

      {/* User card */}
      <div className="mx-3 my-3 rounded-lg bg-[#161616] border border-[#252525] px-3 py-2.5">
        <p className="text-[10px] font-medium uppercase tracking-widest text-neutral-600 mb-1">Signed in as</p>
        <p className="text-[13px] font-semibold text-white truncate leading-tight">{user.displayName}</p>
        <span className="mt-1.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold bg-red-600/20 text-red-400 border border-red-500/30">
          <Cpu size={9} />
          {user.role === 'admin' ? 'Admin' : user.role === 'trainer' ? 'Trainer' : `Sales`}
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-1 space-y-0.5 overflow-y-auto">
        <p className="px-2 pt-2 pb-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-600">
          Navigation
        </p>
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'group flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors duration-100',
                active
                  ? 'bg-red-600/[0.12] text-red-400 border border-red-500/20'
                  : 'text-neutral-500 hover:bg-[#161616] hover:text-neutral-300',
              )}
            >
              <Icon size={14} className={active ? 'text-red-500' : 'text-neutral-600 group-hover:text-neutral-400'} />
              <span className="truncate">{label}</span>
              {active && <ChevronRight size={11} className="ml-auto shrink-0 text-red-500" />}
            </Link>
          );
        })}

        {/* Cart */}
        {(() => {
          const active = pathname.startsWith('/dashboard/cart');
          return (
            <Link
              href="/dashboard/cart"
              className={clsx(
                'group flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors duration-100',
                active
                  ? 'bg-red-600/[0.12] text-red-400 border border-red-500/20'
                  : 'text-neutral-500 hover:bg-[#161616] hover:text-neutral-300',
              )}
            >
              <ShoppingCart size={14} className={active ? 'text-red-500' : 'text-neutral-600 group-hover:text-neutral-400'} />
              <span>Cart</span>
              {totalCount > 0 && (
                <span className="ml-auto flex items-center justify-center rounded-full bg-red-600 text-white text-[10px] font-bold min-w-[16px] h-4 px-1">
                  {totalCount}
                </span>
              )}
              {active && totalCount === 0 && <ChevronRight size={11} className="ml-auto shrink-0 text-red-500" />}
            </Link>
          );
        })()}
      </nav>

      {/* Footer */}
      <div className="px-2 pb-4 pt-2 border-t border-[#1f1f1f] space-y-0.5">
        <button
          onClick={toggleTheme}
          className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] font-medium text-neutral-500 hover:bg-[#161616] hover:text-neutral-300 transition-colors duration-100"
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] font-medium text-neutral-500 hover:bg-red-500/10 hover:text-red-400 transition-colors duration-100"
        >
          <LogOut size={14} />
          Sign Out
        </button>
        <p className="pt-2 px-2 text-[10px] text-neutral-700">
          Precision Grade Seet1bood v1.0
        </p>
      </div>
    </aside>
  );
}
