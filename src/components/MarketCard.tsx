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
      {/* Updated hover and shadow to cyan-primary */}
      <Card className="h-full hover:border-cyan-primary-500/50 transition-all duration-300 hover:shadow-cyan-primary-500/10 hover:shadow-lg group">
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

          {/* Inverted text color and hover text color to cyan-primary */}
          <h3 className="text-base font-semibold text-slate-900 mb-3 line-clamp-2 group-hover:text-cyan-primary-700 transition-colors">
            {market.title}
          </h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              {/* Updated sentiment bar to cyan-primary colors */}
              <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-primary-500 to-cyan-primary-400 rounded-full transition-all duration-500"
                  style={{ width: `${yesPercent}%` }}
                />
              </div>
              {/* Updated text color to cyan-primary for YES price */}
              <span className="text-sm font-medium text-cyan-primary-600 min-w-[50px] text-right">
                {formatPercent(market.yes_price)}
              </span>
            </div>

            {/* Inverted text color */}
            <div className="flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {timeRemaining}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5" />
                  {formatNumber(Number(market.total_volume))} SOL
                </div>
                <div className="flex items-center gap-1">
                  {/* Updated icon color to cyan-primary */}
                  <Droplets className="h-3.5 w-3.5 text-cyan-primary-600" />
                  On-Chain
                </div>
              </div>
            </div>
          </div>

          {/* Updated button styles for light theme with cyan colors */}
          <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
            <button className="flex-1 py-2 rounded-lg bg-cyan-primary-500/10 text-cyan-primary-600 text-sm font-medium hover:bg-cyan-primary-500/20 transition-colors">
              Yes {formatPercent(market.yes_price)}
            </button>
            <button className="flex-1 py-2 rounded-lg bg-blue-500/10 text-blue-600 text-sm font-medium hover:bg-blue-500/20 transition-colors">
              No {formatPercent(market.no_price)}
            </button>
          </div>
        </div>
      </Card>
    </Link>
  );
}