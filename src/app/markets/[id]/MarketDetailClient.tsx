'use client';

import { useMarket } from '@/hooks/useMarkets';
import { TradingPanel } from '@/components/TradingPanel';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatPercent, formatNumber, getTimeRemaining, getCategoryColor } from '@/lib/utils';
import { getCurrentPrices } from '@/lib/amm';
import { Clock, TrendingUp, Droplets, Users, BarChart3, Loader2 } from 'lucide-react';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const mockPriceHistory = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  yes: 0.4 + Math.random() * 0.2,
  no: 0.4 + Math.random() * 0.2,
}));

export function MarketDetailClient({ marketId }: { marketId: string }) {
  const { market, pool, loading } = useMarket(marketId);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (!market) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Card className="p-12 text-center">
          <h2 className="text-xl font-semibold text-white mb-2">Market Not Found</h2>
          <p className="text-slate-400">The market you&apos;re looking for is not available.</p>
        </Card>
      </div>
    );
  }

  const prices = pool ? getCurrentPrices(pool) : { yes: Number(market.yes_price), no: Number(market.no_price) };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(market.category)}`}>
                  {market.category}
                </span>
                {market.is_kalshi && (
                  <span className="px-3 py-1 rounded-full text-sm bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    Kalshi 2026
                  </span>
                )}
                <span className="px-3 py-1 rounded-full text-sm bg-slate-700 text-slate-300">
                  {market.status === 'active' ? 'Active' : market.status}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                {market.title}
              </h1>

              {market.description && (
                <p className="text-slate-400 mb-6">{market.description}</p>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-slate-800/50">
                  <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                    <Clock className="h-4 w-4" />
                    Expires
                  </div>
                  <div className="text-white font-semibold">{getTimeRemaining(market.expiration_date)}</div>
                </div>
                <div className="p-4 rounded-lg bg-slate-800/50">
                  <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                    <TrendingUp className="h-4 w-4" />
                    Volume
                  </div>
                  <div className="text-white font-semibold">${formatNumber(Number(market.total_volume))}</div>
                </div>
                <div className="p-4 rounded-lg bg-slate-800/50">
                  <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                    <Droplets className="h-4 w-4" />
                    Liquidity
                  </div>
                  <div className="text-white font-semibold">${pool ? formatNumber(Number(pool.tvl)) : '0'}</div>
                </div>
                <div className="p-4 rounded-lg bg-slate-800/50">
                  <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                    <Users className="h-4 w-4" />
                    Traders
                  </div>
                  <div className="text-white font-semibold">{Math.floor(Math.random() * 500) + 50}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Price Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-indigo-400" />
                Price History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockPriceHistory}>
                    <defs>
                      <linearGradient id="yesGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} domain={[0, 1]} tickFormatter={(v: number) => `${(v * 100).toFixed(0)}%`} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                      labelStyle={{ color: '#94a3b8' }}
                    />
                    <Area type="monotone" dataKey="yes" stroke="#10b981" fill="url(#yesGradient)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Probability Display */}
          <Card>
            <CardHeader>
              <CardTitle>Current Probability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1 p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center">
                  <div className="text-4xl font-bold text-emerald-400 mb-2">
                    {formatPercent(prices.yes)}
                  </div>
                  <div className="text-slate-400">YES</div>
                </div>
                <div className="flex-1 p-6 rounded-xl bg-rose-500/10 border border-rose-500/30 text-center">
                  <div className="text-4xl font-bold text-rose-400 mb-2">
                    {formatPercent(prices.no)}
                  </div>
                  <div className="text-slate-400">NO</div>
                </div>
              </div>

              {/* Sentiment Bar */}
              <div className="mt-6">
                <div className="text-sm text-slate-400 mb-2">Community Sentiment</div>
                <div className="h-3 rounded-full overflow-hidden bg-slate-800 flex">
                  <div 
                    className="bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-500"
                    style={{ width: `${prices.yes * 100}%` }}
                  />
                  <div 
                    className="bg-gradient-to-r from-rose-400 to-rose-600"
                    style={{ width: `${prices.no * 100}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trading Panel */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <TradingPanel market={market} pool={pool} />
          </div>
        </div>
      </div>
    </div>
  );
}
