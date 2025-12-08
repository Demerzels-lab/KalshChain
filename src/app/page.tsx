'use client';

import { useState } from 'react';
import { useMarkets } from '@/hooks/useMarkets';
import { MarketCard } from '@/components/MarketCard';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Zap, Shield, ArrowRight, Loader2, Users, BookOpen } from 'lucide-react';
import Link from 'next/link';

const categories = ['All', 'Crypto', 'Politics', 'Economy', 'Sports', 'AI & Tech', 'Culture'];

export default function HomePage() {
  const { markets, loading } = useMarkets();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredMarkets = activeCategory === 'All'
    ? markets
    : markets.filter(m => m.category === activeCategory);

  const onChainMarkets = filteredMarkets.filter(m => !m.is_kalshi);
  const kalshiMarkets = filteredMarkets.filter(m => m.is_kalshi);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-950/50 to-slate-950 border-b border-slate-800">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm mb-6">
              <Zap className="h-4 w-4" />
              Powered by Solana Blockchain
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Decentralized{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Prediction Markets
              </span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              Trade on the future with blockchain transparency. From crypto to politics, economics to sports - all in one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/explore">
                <Button size="lg" className="w-full sm:w-auto">
                  Explore Markets
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  How it Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-slate-800 bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-indigo-500/10 text-indigo-400 mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Decentralized</h3>
              <p className="text-sm text-slate-400">Non-custodial trading with transparent on-chain settlement via Solana.</p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-400 mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">AMM Trading</h3>
              <p className="text-sm text-slate-400">Automated market maker with deep liquidity and minimal slippage.</p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-purple-500/10 text-purple-400 mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Community Driven</h3>
              <p className="text-sm text-slate-400">Create markets, provide liquidity, and earn fees as a market maker.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Markets', value: markets.length, icon: TrendingUp },
              { label: 'Total Volume', value: '$2.4M', icon: Zap },
              { label: 'Kalshi 2026', value: kalshiMarkets.length, icon: Shield },
              { label: 'On-Chain', value: onChainMarkets.length, icon: Shield },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-indigo-500/10 text-indigo-400 mb-2">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Markets */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl font-bold text-white">Popular Markets</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
          </div>
        ) : (
          <>
            {onChainMarkets.length > 0 && (
              <>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  On-Chain Markets
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                  {onChainMarkets.slice(0, 6).map((market) => (
                    <MarketCard key={market.id} market={market} />
                  ))}
                </div>
              </>
            )}

            {kalshiMarkets.length > 0 && (
              <>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-500" />
                  Kalshi 2026 Markets
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {kalshiMarkets.slice(0, 6).map((market) => (
                    <MarketCard key={market.id} market={market} />
                  ))}
                </div>
              </>
            )}

            {filteredMarkets.length === 0 && (
              <Card className="p-12 text-center">
                <p className="text-slate-400">No markets found for this category.</p>
              </Card>
            )}
          </>
        )}

        {filteredMarkets.length > 6 && (
          <div className="text-center mt-10">
            <Link href="/explore">
              <Button variant="outline" size="lg">
                View All Markets
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="border-t border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Trading?</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Connect your Phantom wallet and start trading on prediction markets in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/explore">
                <Button size="lg">Start Trading</Button>
              </Link>
              <Link href="/docs">
                <Button variant="outline" size="lg">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Read Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
