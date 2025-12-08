'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BookOpen, Code, Zap, TrendingUp, Wallet, 
  HelpCircle, FileText, Database, Lock, Cpu, Search,
  ChevronRight, ChevronDown
} from 'lucide-react';
import { useState } from 'react';

interface NavSection {
  title: string;
  items: NavItem[];
}

interface NavItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const navigation: NavSection[] = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs', icon: BookOpen },
      { title: 'Quick Start Guide', href: '/docs/getting-started', icon: Zap },
      { title: 'Wallet Setup', href: '/docs/wallet-integration', icon: Wallet },
    ]
  },
  {
    title: 'Platform Overview',
    items: [
      { title: 'System Architecture', href: '/docs/architecture', icon: Cpu },
      { title: 'Core Concepts', href: '/docs/concepts', icon: BookOpen },
      { title: 'Security', href: '/docs/security', icon: Lock },
    ]
  },
  {
    title: 'Trading',
    items: [
      { title: 'Trading Engine', href: '/docs/trading-engine', icon: TrendingUp },
      { title: 'Smart Contracts', href: '/docs/smart-contracts', icon: FileText },
    ]
  },
  {
    title: 'API & Development',
    items: [
      { title: 'REST API Reference', href: '/docs/api', icon: Code, badge: 'New' },
      { title: 'Authentication', href: '/docs/api#authentication' },
      { title: 'Markets API', href: '/docs/api#markets-api' },
      { title: 'Trading API', href: '/docs/api#trading-api' },
      { title: 'Positions API', href: '/docs/api#positions-api' },
      { title: 'Analytics API', href: '/docs/api#analytics-api' },
    ]
  },
  {
    title: 'Help & Resources',
    items: [
      { title: 'FAQ', href: '/docs/faq', icon: HelpCircle },
      { title: 'Glossary', href: '/docs/glossary', icon: Database, badge: 'New' },
    ]
  }
];

export function DocsSidebar() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'Getting Started',
    'API Reference',
    'User Guides'
  ]);

  const toggleSection = (title: string) => {
    setExpandedSections(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  return (
    <nav className="w-64 flex-shrink-0 border-r border-slate-800 bg-slate-900/30 h-[calc(100vh-4rem)] overflow-y-auto sticky top-16">
      <div className="p-4">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search docs..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="space-y-6">
          {navigation.map((section) => {
            const isExpanded = expandedSections.includes(section.title);
            
            return (
              <div key={section.title}>
                <button
                  onClick={() => toggleSection(section.title)}
                  className="flex items-center justify-between w-full text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2 hover:text-white transition-colors"
                >
                  <span>{section.title}</span>
                  {isExpanded ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                </button>
                
                {isExpanded && (
                  <ul className="space-y-1">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                      
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                              isActive
                                ? 'bg-indigo-500/10 text-indigo-400 font-medium'
                                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                            }`}
                          >
                            {Icon && <Icon className="h-4 w-4 flex-shrink-0" />}
                            <span className="flex-1">{item.title}</span>
                            {item.badge && (
                              <span className="px-1.5 py-0.5 text-xs rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800">
          <div className="text-xs text-slate-500">
            <p className="mb-1">Documentation v1.0.0</p>
            <p>Last updated: Dec 2025</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
