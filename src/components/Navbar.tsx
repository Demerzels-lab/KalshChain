// demerzels-lab/kalshchain/KalshChain-237051255d46360ee0eab8d0278534895dc525cf/src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { TrendingUp, LayoutGrid, PlusCircle, Wallet, History, Menu, X, BookOpen, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: TrendingUp },
  { href: '/explore', label: 'Explore', icon: LayoutGrid },
  { href: '/how-it-works', label: 'How it Works', icon: HelpCircle },
  { href: '/docs', label: 'Docs', icon: BookOpen },
];

const userItems = [
  { href: '/create', label: 'Create Market', icon: PlusCircle },
  { href: '/positions', label: 'Positions', icon: Wallet },
  { href: '/wallet', label: 'History', icon: History },
];

export function Navbar() {
  const pathname = usePathname();
  const { connected } = useWallet();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg overflow-hidden bg-gradient-to-br from-cyan-primary-300 to-cyan-primary-600 flex items-center justify-center">
                <img
                  src="/logo.jpeg"
                  alt="KalshChain Logo"
                  className="h-6 w-6 object-cover"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-primary-600 to-cyan-primary-900 bg-clip-text text-transparent">
                KalshChain
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-cyan-primary-500/20 text-cyan-primary-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1">
              {userItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-cyan-primary-500/20 text-cyan-primary-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {connected && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-emerald-600">Connected</span>
              </div>
            )}
            {/* Wallet Button: Uses cyan-primary as default button variant */}
            <WalletMultiButton className="!bg-cyan-primary-600 hover:!bg-cyan-primary-700 !rounded-lg !h-10 !text-sm" />
            
            {/* Mobile Menu Button: Darker icon on light background */}
            <button
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-4 py-4">
          <div className="text-xs text-slate-500 uppercase tracking-wider mb-2 px-3">Navigation</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                // Mobile Link Style: Darker text, light hover background
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-700 hover:bg-slate-100"
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
          <div className="text-xs text-slate-500 uppercase tracking-wider mb-2 mt-4 px-3">Trading</div>
          {userItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                // Mobile Link Style: Darker text, light hover background
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-700 hover:bg-slate-100"
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}