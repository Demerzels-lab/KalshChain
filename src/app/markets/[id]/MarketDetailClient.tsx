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
        <Loader2 className="h-10 w-10 animate-spin text-cyan-primary-600" />
      </div>
    );
  }

  if (!market) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Card className="p-12 text-center">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Market Not Found</h2>
          <p className="text-slate-600">The market you&apos;re looking for is not available.</p>
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
                  <span className="px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-800 border border-amber-200">
                    Kalshi 2026
                  </span>
                )}
                <span className="px-3 py-1 rounded-full text-sm bg-slate-100 text-slate-700 border border-slate-200">
                  {market.status === 'active' ? 'Active' : market.status}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                {market.title}
              </h1>

              {market.description && (
                <p className="text-slate-600 mb-6">{market.description}</p>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-slate-600 text-sm mb-1">
                    <Clock className="h-4 w-4" />
                    Expires
                  </div>
                  <div className="text-slate-900 font-semibold">{getTimeRemaining(market.expiration_date)}</div>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-slate-600 text-sm mb-1">
                    <TrendingUp className="h-4 w-4" />
                    Volume
                  </div>
                  <div className="text-slate-900 font-semibold">{formatNumber(Number(market.total_volume))} SOL</div>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-slate-600 text-sm mb-1">
                    <Droplets className="h-4 w-4" />
                    Liquidity
                  </div>
                  <div className="text-slate-900 font-semibold">{pool ? formatNumber(Number(pool.tvl)) : '0'} SOL</div>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-slate-600 text-sm mb-1">
                    <Users className="h-4 w-4" />
                    Traders
                  </div>
                  <div className="text-slate-900 font-semibold">{Math.floor(Math.random() * 500) + 50}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Price Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-cyan-primary-600" />
                Price History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockPriceHistory}>
                    <defs>
                      <linearGradient id="yesGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0891b2" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0891b2" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} domain={[0, 1]} tickFormatter={(v: number) => `${(v * 100).toFixed(0)}%`} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                      labelStyle={{ color: '#64748b' }}
                    />
                    <Area type="monotone" dataKey="yes" stroke="#0891b2" fill="url(#yesGradient)" strokeWidth={2} />
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
                <div className="flex-1 p-6 rounded-xl bg-cyan-primary-50 border border-cyan-primary-200 text-center">
                  <div className="text-4xl font-bold text-cyan-primary-700 mb-2">
                    {formatPercent(prices.yes)}
                  </div>
                  <div className="text-slate-600">YES</div>
                </div>
                <div className="flex-1 p-6 rounded-xl bg-blue-50 border border-blue-200 text-center">
                  <div className="text-4xl font-bold text-blue-700 mb-2">
                    {formatPercent(prices.no)}
                  </div>
                  <div className="text-slate-600">NO</div>
                </div>
              </div>

              {/* Updated sentiment bar to cyan-primary colors */}
              <div className="mt-6">
                <div className="text-sm text-slate-600 mb-2">Community Sentiment</div>
                <div className="h-3 rounded-full overflow-hidden bg-slate-200 flex">
                  <div 
                    className="bg-gradient-to-r from-cyan-primary-600 to-cyan-primary-400 transition-all duration-500"
                    style={{ width: `${prices.yes * 100}%` }}
                  />
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-blue-600"
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
