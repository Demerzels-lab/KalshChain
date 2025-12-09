import { Card } from '@/components/ui/card';
import { FileText, Cpu, Code, Shield, HelpCircle, LayoutGrid, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

const docCards = [
  {
    title: 'Getting Started',
    description: 'Quickly set up your environment and make your first trade.',
    icon: LayoutGrid,
    href: '/docs/getting-started',
    color: 'text-cyan-primary-600',
    bg: 'bg-cyan-primary-500/10',
  },
  {
    title: 'Core Architecture',
    description: 'Understand the Solana, Supabase, and Next.js layers.',
    icon: Cpu,
    href: '/docs/architecture',
    color: 'text-purple-600',
    bg: 'bg-purple-500/10',
  },
  {
    title: 'Smart Contracts',
    description: 'Deep dive into the on-chain programs and logic.',
    icon: Code,
    href: '/docs/smart-contracts',
    color: 'text-emerald-600',
    bg: 'bg-emerald-500/10',
  },
  {
    title: 'API Reference',
    description: 'Explore our REST API for data access and integration.',
    icon: FileText,
    href: '/docs/api',
    color: 'text-orange-600',
    bg: 'bg-orange-500/10',
  },
  {
    title: 'Security',
    description: 'Review our security model and audit results.',
    icon: Shield,
    href: '/docs/security',
    color: 'text-red-600',
    bg: 'bg-red-500/10',
  },
  {
    title: 'FAQ & Glossary',
    description: 'Find quick answers and definitions for key terms.',
    icon: HelpCircle,
    href: '/docs/faq',
    color: 'text-slate-600',
    bg: 'bg-slate-500/10',
  },
];

export default function DocsHomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-10 text-center">
        {/* Inverted text color and cyan accent */}
        <h1 className="text-4xl font-bold text-slate-900 mb-2 flex items-center justify-center gap-3">
            <BookOpen className="h-8 w-8 text-cyan-primary-600" />
            KalshChain Documentation
        </h1>
        <p className="text-lg text-slate-600">
          Your guide to building on and trading with the KalshChain prediction market platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {docCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.title} href={card.href}>
              {/* Card hover uses cyan-primary accent */}
              <Card className="h-full p-6 transition-all hover:shadow-lg hover:shadow-cyan-primary-500/10 hover:border-cyan-primary-400">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center mb-3 ${card.bg}`}>
                  <Icon className={`h-5 w-5 ${card.color}`} />
                </div>
                {/* Inverted text color */}
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{card.title}</h3>
                {/* Inverted text color */}
                <p className="text-sm text-slate-600 mb-3">{card.description}</p>
                {/* Inverted link color, cyan accent */}
                <div className="flex items-center text-sm font-medium text-cyan-primary-600 hover:text-cyan-primary-700">
                  Read More
                  <ArrowRight className="h-4 w-4 ml-2" />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}