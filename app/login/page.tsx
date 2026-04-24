'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { HardHat, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Login failed.');
        return;
      }

      router.push('/dashboard');
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-[#111111] border border-[#1e1e1e] rounded-2xl shadow-2xl shadow-black/60 overflow-hidden backdrop-blur-sm">
          {/* Top accent bar */}
          <div className="h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600" />

          <div className="px-8 pt-8 pb-10">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-white shadow-lg shadow-red-900/30">
                <HardHat size={22} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-red-500">LBX Company</p>
                <h1 className="text-xl font-black text-white leading-tight">Precision Grade</h1>
                <p className="text-xs text-neutral-500 font-medium">Field Operations Dashboard</p>
              </div>
            </div>

            <h2 className="text-base font-semibold text-white mb-6">Sign In</h2>

            {/* Error banner */}
            {error && (
              <div className="flex items-center gap-2 mb-4 px-3 py-2.5 rounded-lg bg-red-900/40 border border-red-700/50 text-red-300 text-sm">
                <AlertCircle size={15} className="flex-shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1.5">
                  Username or Email
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoFocus
                  placeholder="e.g. trainer"
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-red-500/60 focus:ring-1 focus:ring-red-500/20 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full bg-neutral-950/80 border border-neutral-700/60 rounded-lg px-4 py-3 pr-11 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-red-500/60 focus:ring-1 focus:ring-red-500/20 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
                  >
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 mt-2 rounded-lg bg-red-600 hover:bg-red-500 active:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm transition-colors shadow-lg shadow-red-900/30"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Demo credentials */}
            <div className="mt-6 p-4 rounded-xl bg-[#0a0a0a] border border-[#2a2a2a]">
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                Demo Credentials
              </p>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Trainer:</span>
                  <span className="font-mono text-neutral-300">trainer / trainer123</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Sales (SE):</span>
                  <span className="font-mono text-neutral-300">sales_se / sales123</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Sales (MW):</span>
                  <span className="font-mono text-neutral-300">sales_mw / sales123</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-neutral-700 mt-4">
          &copy; {new Date().getFullYear()} LBX Company LLC &middot; Precision Grade Systems
        </p>
      </div>
    </div>
  );
}
