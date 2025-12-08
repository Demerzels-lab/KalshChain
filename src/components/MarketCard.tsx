'use client';

import Link from 'next/link';
import { Market } from '@/types';
import { Card } from '@/components/ui/card';
import { formatPercent, formatNumber, getTimeRemaining, getCategoryColor } from '@/lib/utils';
import { Clock, TrendingUp, Droplets } from 'lucide-react';

interface MarketCardProps {
  market: Market;
}

export function MarketCard({ market }: MarketCardProps) {
  const yesPercent = Number(market.yes_price) * 100;
  const timeRemaining = getTimeRemaining(market.expiration_date);

  return (
    <Link href={`/markets/${market.id}`}>
      <Card className="h-full hover:border-indigo-500/50 transition-all duration-300 hover:shadow-indigo-500/10 hover:shadow-lg group">
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-4">
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getCategoryColor(market.category)}`}>
              {market.category}
            </span>
            {market.is_kalshi && (
              <span className="px-2 py-0.5 rounded text-xs bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Kalshi
              </span>
            )}
          </div>

          <h3 className="text-base font-semibold text-white mb-3 line-clamp-2 group-hover:text-indigo-300 transition-colors">
            {market.title}
          </h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${yesPercent}%` }}
                />
              </div>
              <span className="text-sm font-medium text-emerald-400 min-w-[50px] text-right">
                {formatPercent(market.yes_price)}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {timeRemaining}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5" />
                  ${formatNumber(Number(market.total_volume))}
                </div>
                <div className="flex items-center gap-1">
                  <Droplets className="h-3.5 w-3.5 text-indigo-400" />
                  On-Chain
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 flex gap-2">
            <button className="flex-1 py-2 rounded-lg bg-emerald-600/20 text-emerald-400 text-sm font-medium hover:bg-emerald-600/30 transition-colors">
              Yes {formatPercent(market.yes_price)}
            </button>
            <button className="flex-1 py-2 rounded-lg bg-rose-600/20 text-rose-400 text-sm font-medium hover:bg-rose-600/30 transition-colors">
              No {formatPercent(market.no_price)}
            </button>
          </div>
        </div>
      </Card>
    </Link>
  );
}
