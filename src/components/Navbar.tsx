'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { TrendingUp, LayoutGrid, PlusCircle, Wallet, History, Menu, X, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: TrendingUp },
  { href: '/explore', label: 'Markets', icon: LayoutGrid },
  { href: '/docs', label: 'Docs', icon: BookOpen },
];

const userItems = [
  { href: '/create', label: 'Create', icon: PlusCircle },
  { href: '/positions', label: 'Positions', icon: Wallet },
  { href: '/wallet', label: 'History', icon: History },
];

export function Navbar() {
  const pathname = usePathname();
  const { connected } = useWallet();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    // QELVA Style: High blur, thin technical border, slight transparency
    <nav className="sticky top-0 z-50 border-b border-cyan-primary-200/40 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative h-8 w-8 rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-br from-cyan-primary-400 to-cyan-primary-600 shadow-lg shadow-cyan-primary-500/20 group-hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 blur-sm"></div>
                <img
                  src="/logo.jpeg"
                  alt="KalshChain"
                  className="h-6 w-6 object-cover relative z-10"
                />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight">
                KalshChain
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200',
                      isActive
                        ? 'bg-cyan-primary-50 text-cyan-primary-700 shadow-sm ring-1 ring-cyan-primary-200'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                    )}
                  >
                    <Icon className={cn("h-4 w-4", isActive ? "text-cyan-primary-600" : "text-slate-400")} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 mr-2">
              {userItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'text-cyan-primary-700 bg-cyan-primary-50'
                        : 'text-slate-600 hover:text-cyan-primary-600 hover:bg-cyan-primary-50/50'
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {connected && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/20 shadow-sm">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-emerald-700 tracking-wide uppercase">Connected</span>
              </div>
            )}
            
            {/* Wallet Button */}
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-primary-400 to-cyan-primary-600 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-200"></div>
                <div className="relative">
                    <WalletMultiButton style={{ height: '40px', borderRadius: '0.75rem' }} />
                </div>
            </div>
            
            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-xl px-4 py-6 shadow-xl animate-in slide-in-from-top-5">
          <div className="grid gap-6">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">Menu</div>
              <div className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-cyan-primary-700 transition-colors font-medium"
                    >
                      <Icon className="h-5 w-5 opacity-70" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
            
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">Trading</div>
              <div className="grid grid-cols-2 gap-2">
                {userItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:border-cyan-primary-200 hover:bg-cyan-primary-50/50 transition-all text-center"
                    >
                      <Icon className="h-6 w-6 text-cyan-primary-600" />
                      <span className="text-sm font-medium text-slate-700">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}