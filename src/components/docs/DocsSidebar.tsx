'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutGrid, FileText, Cpu, Code, Shield, HelpCircle, BookOpen, Clock, Zap, Wallet, Info } from 'lucide-react';

const docStructure = [
  {
    title: 'Introduction',
    items: [
      { href: '/docs', label: 'Docs Home', icon: BookOpen },
      { href: '/docs/getting-started', label: 'Getting Started', icon: LayoutGrid },
      { href: '/docs/concepts', label: 'Core Concepts', icon: Info },
    ],
  },
  {
    title: 'Architecture',
    items: [
      { href: '/docs/architecture', label: 'System Architecture', icon: Cpu },
      { href: '/docs/smart-contracts', label: 'Smart Contracts', icon: Code },
      { href: '/docs/trading-engine', label: 'Trading Engine (AMM)', icon: Zap },
    ],
  },
  {
    title: 'Integration & Security',
    items: [
      { href: '/docs/api', label: 'API Reference', icon: FileText },
      { href: '/docs/wallet-integration', label: 'Wallet Integration', icon: Wallet },
      { href: '/docs/security', label: 'Security', icon: Shield },
    ],
  },
  {
    title: 'Resources',
    items: [
      { href: '/docs/faq', label: 'FAQ', icon: HelpCircle },
      { href: '/docs/glossary', label: 'Glossary', icon: Clock },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    // Inverted background and border for light theme
    <aside className="sticky top-16 h-[calc(100vh-64px)] w-64 p-6 border-r border-gray-200 bg-white/90 backdrop-blur-sm hidden lg:block">
      <nav className="space-y-6">
        {docStructure.map((section) => (
          <div key={section.title} className="space-y-2">
            {/* Inverted text color */}
            <h4 className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
              {section.title}
            </h4>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/docs' && pathname.startsWith(item.href) && pathname.split('/').length === item.href.split('/').length);
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-cyan-primary-500/10 text-cyan-primary-700' // Cyan-primary active
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' // Inverted passive
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}