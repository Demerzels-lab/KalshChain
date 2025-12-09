// demerzels-lab/kalshchain/KalshChain-237051255d46360ee0eab8d0278534895dc525cf/src/app/page.tsx
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
      {/* Inverted hero section colors */}
      <section className="relative overflow-hidden bg-white border-b border-gray-200">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center max-w-3xl mx-auto">
            {/* New Cyan-Primary accent */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-primary-500/10 border border-cyan-primary-500/20 text-cyan-primary-600 text-sm mb-6">
              <Zap className="h-4 w-4" />
              Powered by Solana Blockchain
            </div>
            {/* Inverted text color */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Decentralized{' '}
              {/* Updated gradient to use cyan-primary (from light to dark on white BG) */}
              <span className="bg-gradient-to-r from-cyan-primary-600 to-cyan-primary-900 bg-clip-text text-transparent">
                Prediction Markets
              </span>
            </h1>
            {/* Inverted text color */}
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
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
                {/* Updated outline button for light theme */}
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-slate-300 text-slate-700 hover:bg-slate-100">
                  How it Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      {/* Inverted section color */}
      <section className="border-b border-gray-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              {/* New Cyan-Primary accent */}
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-cyan-primary-500/10 text-cyan-primary-600 mb-4">
                <Shield className="h-6 w-6" />
              </div>
              {/* Inverted text color */}
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Decentralized</h3>
              {/* Inverted text color */}
              <p className="text-sm text-slate-600">Non-custodial trading with transparent on-chain settlement via Solana.</p>
            </div>
            <div className="text-center p-6">
              {/* Changed accent to a different color (Emerald/Green remains for AMM efficiency) */}
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-600 mb-4">
                <Zap className="h-6 w-6" />
              </div>
              {/* Inverted text color */}
              <h3 className="text-lg font-semibold text-slate-900 mb-2">AMM Trading</h3>
              {/* Inverted text color */}
              <p className="text-sm text-slate-600">Automated market maker with deep liquidity and minimal slippage.</p>
            </div>
            <div className="text-center p-6">
              {/* Changed accent to a different color (Purple remains for community/user) */}
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-purple-500/10 text-purple-600 mb-4">
                <Users className="h-6 w-6" />
              </div>
              {/* Inverted text color */}
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Community Driven</h3>
              {/* Inverted text color */}
              <p className="text-sm text-slate-600">Create markets, provide liquidity, and earn fees as a market maker.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      {/* Inverted section color */}
      <section className="border-b border-gray-200">
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
                  {/* New Cyan-Primary accent */}
                  <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-cyan-primary-500/10 text-cyan-primary-600 mb-2">
                    <Icon className="h-5 w-5" />
                  </div>
                  {/* Inverted text color */}
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  {/* Inverted text color */}
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Markets */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          {/* Inverted text color */}
          <h2 className="text-2xl font-bold text-slate-900">Popular Markets</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? 'bg-cyan-primary-600 text-white' // New Cyan-Primary Accent
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300 hover:text-slate-900' // Inverted passive button colors
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            {/* New Cyan-Primary Accent */}
            <Loader2 className="h-8 w-8 animate-spin text-cyan-primary-500" />
          </div>
        ) : (
          <>
            {onChainMarkets.length > 0 && (
              <>
                {/* Inverted text color */}
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
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
                {/* Inverted text color */}
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
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
                <p className="text-slate-600">No markets found for this category.</p>
              </Card>
            )}
          </>
        )}

        {filteredMarkets.length > 6 && (
          <div className="text-center mt-10">
            <Link href="/explore">
              {/* Updated outline button for light theme */}
              <Button variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:bg-slate-100">
                View All Markets
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        )}
      </section>

      {/* CTA */}
      {/* Inverted CTA section colors */}
      <section className="border-t border-gray-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            {/* Inverted text color */}
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Start Trading?</h2>
            {/* Inverted text color */}
            <p className="text-slate-600 mb-8 max-w-xl mx-auto">
              Connect your Phantom wallet and start trading on prediction markets in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/explore">
                <Button size="lg">Start Trading</Button>
              </Link>
              <Link href="/docs">
                {/* Updated outline button for light theme */}
                <Button variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:bg-slate-100">
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