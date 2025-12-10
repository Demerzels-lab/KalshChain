'use client';

import Link from 'next/link';
import { Market } from '@/types';
import { Card } from '@/components/ui/card';
import { formatPercent, formatNumber, getTimeRemaining, getCategoryColor } from '@/lib/utils';
import { Clock, TrendingUp, Droplets, Activity } from 'lucide-react';

interface MarketCardProps {
  market: Market;
}

export function MarketCard({ market }: MarketCardProps) {
  const yesPercent = Number(market.yes_price) * 100;
  const timeRemaining = getTimeRemaining(market.expiration_date);

  // Helper to strip the Tailwind color classes and just get the color name if needed, 
  // or we just define new technical styles map here.
  const getTechBadgeStyle = (cat: string) => {
    // Mapping standard categories to our new "Tactical" colors
    switch(cat) {
      case 'Crypto': return 'text-orange-600 border-orange-200 bg-orange-50';
      case 'Politics': return 'text-blue-600 border-blue-200 bg-blue-50';
      case 'Economy': return 'text-emerald-600 border-emerald-200 bg-emerald-50';
      case 'Sports': return 'text-rose-600 border-rose-200 bg-rose-50';
      case 'AI & Tech': return 'text-purple-600 border-purple-200 bg-purple-50';
      default: return 'text-slate-600 border-slate-200 bg-slate-50';
    }
  };

  return (
    <Link href={`/markets/${market.id}`} className="block group h-full">
      <Card className="h-full relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-primary-500/10 hover:border-cyan-primary-400/50">
        
        {/* Subtle background highlight on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-primary-50/0 to-cyan-primary-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="p-6 relative z-10 flex flex-col h-full">
          
          {/* --- Header: Tech Tags --- */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex gap-2">
              <span className={`px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wider font-bold border ${getTechBadgeStyle(market.category)}`}>
                {market.category}
              </span>
              {market.is_kalshi && (
                <span className="px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wider font-bold bg-amber-50 text-amber-600 border border-amber-200 flex items-center gap-1">
                  <Activity className="w-3 h-3" /> 2026
                </span>
              )}
            </div>
            
            {/* Live Indicator (Pulse) */}
            {market.status === 'active' && (
              <div className="flex h-2 w-2 relative mt-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>
            )}
          </div>

          {/* --- Title --- */}
          <h3 className="text-lg font-bold text-slate-800 mb-4 leading-tight group-hover:text-cyan-primary-700 transition-colors line-clamp-2">
            {market.title}
          </h3>

          <div className="mt-auto space-y-5">
            
            {/* --- Probability Gauge --- */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Probability</span>
                <span className="text-lg font-mono font-bold text-cyan-primary-600">{formatPercent(market.yes_price)} YES</span>
              </div>
              
              {/* Tactical Progress Bar */}
              <div className="h-1.5 w-full bg-slate-100 rounded-sm overflow-hidden border border-slate-200/50">
                <div
                  className="h-full bg-gradient-to-r from-cyan-primary-500 to-cyan-primary-400 relative"
                  style={{ width: `${yesPercent}%` }}
                >
                  {/* Shimmer effect on bar */}
                  <div className="absolute inset-0 bg-white/30 w-full animate-[shimmer_2s_infinite] -skew-x-12 origin-top-left" style={{ transform: 'translateX(-100%)' }} />
                </div>
              </div>
            </div>

            {/* --- Data Footer (Mono Font) --- */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Volume</span>
                <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-slate-600">
                  <TrendingUp className="h-3.5 w-3.5 text-slate-400" />
                  {formatNumber(Number(market.total_volume))} SOL
                </div>
              </div>
              
              <div className="flex flex-col gap-1 text-right">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Expires</span>
                <div className="flex items-center justify-end gap-1.5 text-xs font-mono font-medium text-slate-600">
                  {timeRemaining}
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </Card>
    </Link>
  );
}