'use client';

import { useState } from 'react';
import { useMarkets } from '@/hooks/useMarkets';
import { MarketCard } from '@/components/MarketCard';
import { InteractiveBackground } from '@/components/InteractiveBackground';
import { LoadingScreen } from '@/components/LoadingScreen';
import { useLoading } from '@/contexts/LoadingContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Shield, ArrowRight, Loader2, Globe, Activity, Construction, Layers, CheckCircle2, Timer, Rocket } from 'lucide-react';
import Link from 'next/link';

const categories = ['All', 'Crypto', 'Politics', 'Economy', 'Sports', 'AI & Tech', 'Culture'];

export default function HomePage() {
  const { markets, loading } = useMarkets();
  const { isLoading, setIsLoading } = useLoading();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredMarkets = activeCategory === 'All'
    ? markets
    : markets.filter(m => m.category === activeCategory);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen">
      <InteractiveBackground />
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Text */}
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-cyan-primary-200 shadow-sm backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-primary-500"></span>
                </span>
                <span className="text-xs font-semibold text-slate-600 tracking-wide uppercase">Solana Mainnet Beta</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                Tactical <br />
                <span className="bg-gradient-to-r from-cyan-primary-600 via-cyan-primary-500 to-teal-500 bg-clip-text text-transparent">
                  Prediction Engine
                </span>
              </h1>
              
              <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
                Execute trades on future outcomes with decentralized precision. 
                Non-custodial, AMM-powered, and settled instantly on Solana.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/explore">
                  <Button size="lg" className="h-14 px-8 text-lg shadow-cyan-primary-500/20 hover:shadow-cyan-primary-500/40">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Launch App
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button variant="outline" size="lg" className="h-14 px-8 text-lg bg-white/50 backdrop-blur-sm border-slate-300">
                    Protocol Docs
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-4 text-sm text-slate-500 font-mono">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-emerald-500" />
                  <span>Audited</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-amber-500" />
                  <span>&lt;400ms Latency</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual (Glass Card Stack) */}
            <div className="relative hidden lg:block perspective-[2000px]">
              {/* Abstract decorative elements floating behind */}
              <div className="absolute -top-12 -right-12 w-72 h-72 bg-gradient-to-br from-cyan-primary-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse-slow" />
              
              <div className="relative transform rotate-y-[-10deg] rotate-x-[10deg] transition-transform duration-500 hover:rotate-0">
                {/* Main Dashboard Card */}
                <div className="glass-card p-6 rounded-2xl border-slate-200/60 shadow-2xl bg-white/60">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                    </div>
                    <div className="px-2 py-1 rounded bg-slate-100 text-xs font-mono text-slate-500">
                      LIVE FEED
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/50 border border-slate-100 shadow-sm hover:border-cyan-primary-200 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${i===1 ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                            {i===1 ? <Zap className="w-4 h-4"/> : <Activity className="w-4 h-4"/>}
                          </div>
                          <div>
                            <div className="h-2 w-24 bg-slate-200 rounded mb-1.5" />
                            <div className="h-1.5 w-16 bg-slate-100 rounded" />
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-slate-900">+{90 - i*10}%</div>
                          <div className="text-xs text-emerald-500">VOL ${(4-i)*1.2}M</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating Stat Card */}
                <div className="absolute -bottom-6 -left-6 glass-card p-4 rounded-xl border-cyan-primary-100 shadow-xl animate-float bg-white/80" style={{ animationDelay: '1.5s' }}>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Total Volume</div>
                  <div className="text-2xl font-bold text-slate-900">30K SOL</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID (QELVA BENTO STYLE) --- */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="glass-card p-8 group cursor-pointer hover:bg-white/90">
              <div className="h-12 w-12 rounded-xl bg-cyan-primary-50 text-cyan-primary-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Trustless Settlement</h3>
              <p className="text-slate-600 leading-relaxed">
                Smart contracts handle resolution automatically. No intermediaries, no frozen funds.
              </p>
            </div>

            <div className="glass-card p-8 group cursor-pointer hover:bg-white/90">
              <div className="h-12 w-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">High-Frequency AMM</h3>
              <p className="text-slate-600 leading-relaxed">
                Our CPMM engine ensures instant liquidity for any market size with minimal slippage.
              </p>
            </div>

            <div className="glass-card p-8 group cursor-pointer hover:bg-white/90">
              <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Global Access</h3>
              <p className="text-slate-600 leading-relaxed">
                Trade on events worldwide. From US elections to obscure crypto milestones.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* --- MARKETS PREVIEW --- */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Active Markets</h2>
              <p className="text-slate-500">Real-time prediction pools open for trading</p>
            </div>
            <Link href="/explore" className="hidden sm:flex items-center gap-2 text-cyan-primary-600 font-semibold hover:text-cyan-primary-700 transition-colors">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-6 scrollbar-hide mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-cyan-primary-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64 glass-card rounded-2xl">
              <Loader2 className="h-8 w-8 animate-spin text-cyan-primary-500" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(activeCategory === 'All' ? markets : filteredMarkets).slice(0, 6).map((market) => (
                <MarketCard key={market.id} market={market} />
              ))}
            </div>
          )}
          
          <div className="mt-10 text-center sm:hidden">
            <Link href="/explore">
              <Button variant="outline" className="w-full">View All Markets</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900 -z-10">
          <div className="absolute inset-0 opacity-20 bg-[url('/grid.svg')]" />
          {/* Dark mode glow for contrast in footer area */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-primary-500/20 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to execute your strategy?</h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            Join thousands of traders on the most advanced prediction layer on Solana.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/explore">
              <Button size="lg" className="bg-cyan-primary-500 hover:bg-cyan-primary-400 text-white border-0 shadow-lg shadow-cyan-primary-500/30">
                Start Trading
              </Button>
            </Link>
            <Link href="/create">
              <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-white/10 bg-transparent">
                Create Market
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- ROADMAP TIMELINE --- */}
      {/* --- ROADMAP SECTION --- */}
      {/* --- TACTICAL TIMELINE ROADMAP --- */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-primary-500/10 border border-cyan-primary-500/20 text-cyan-primary-600 text-xs font-mono font-bold uppercase tracking-widest mb-4">
              <Timer className="h-4 w-4" /> 
              Protocol Sync
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Mission Timeline</h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Executing our strategic roadmap to decentralize global prediction markets.
            </p>
          </div>

          <div className="relative">
            {/* Central Timeline Spine (Tactical Line) */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2 md:translate-x-0 hidden sm:block" />
            
            <div className="space-y-12 sm:space-y-24">
              
              {/* --- PHASE 1: Q4 2025 (COMPLETED) --- */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="relative flex flex-col md:flex-row items-center justify-between gap-8 group"
              >
                {/* Right Side Content (Desktop: Left) */}
                <div className="w-full md:w-[45%] order-2 md:order-1">
                  <div className="glass-card p-6 border-emerald-500/30 bg-emerald-50/30 shadow-lg shadow-emerald-500/5 relative overflow-hidden group-hover:-translate-y-1 transition-transform duration-300">
                    <div className="absolute top-0 right-0 px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-bl-lg">
                      Completed
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                      <span className="text-emerald-600">Q4 2025</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300"/>
                      Core Platform
                    </h3>
                    <ul className="space-y-2.5 mt-4">
                      {[
                        'Real-time market data integration',
                        'On-chain style trading & liquidity pools',
                        'Phantom Wallet connection',
                        '20–30 native markets live',
                        'PnL Dashboard active'
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Center Node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center order-1 md:order-2 hidden sm:flex">
                  <div className="w-4 h-4 bg-emerald-500 rounded-full shadow-[0_0_0_4px_rgba(16,185,129,0.2)] z-10 group-hover:scale-125 transition-transform duration-300" />
                </div>

                {/* Empty Spacer for alternating layout */}
                <div className="w-full md:w-[45%] order-3 hidden md:block" />
              </motion.div>


              {/* --- PHASE 2: Q1 2026 (IN PROGRESS) --- */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative flex flex-col md:flex-row items-center justify-between gap-8 group"
              >
                {/* Spacer */}
                <div className="w-full md:w-[45%] order-3 md:order-1 hidden md:block" />

                {/* Center Node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center order-1 md:order-2 hidden sm:flex">
                  <div className="relative flex items-center justify-center z-10">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <div className="w-4 h-4 bg-amber-500 rounded-full shadow-[0_0_0_4px_rgba(245,158,11,0.2)] relative" />
                  </div>
                </div>

                {/* Left Side Content (Desktop: Right) */}
                <div className="w-full md:w-[45%] order-2 md:order-3">
                  <div className="glass-card p-6 border-amber-500/30 bg-amber-50/30 shadow-lg shadow-amber-500/5 relative overflow-hidden group-hover:-translate-y-1 transition-transform duration-300">
                    <div className="absolute top-0 right-0 px-3 py-1 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-bl-lg">
                      In Progress
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                      <span className="text-amber-600">Q1 2026</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300"/>
                      Scalability & Social
                    </h3>
                    <ul className="space-y-2.5 mt-4">
                      {[
                        'Faster data ingestion & caching',
                        'User profiles & public history',
                        'Market sentiment signals',
                        'Leaderboards & ranking',
                        'Mobile UI optimization'
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                          <Construction className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>


              {/* --- PHASE 3: Q2 2026 (PLANNED) --- */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative flex flex-col md:flex-row items-center justify-between gap-8 group"
              >
                {/* Content */}
                <div className="w-full md:w-[45%] order-2 md:order-1">
                  <div className="glass-card p-6 border-cyan-primary-200/50 hover:border-cyan-primary-400/50 relative overflow-hidden group-hover:-translate-y-1 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                      <span className="text-cyan-primary-600">Q2 2026</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300"/>
                      Advanced Trading
                    </h3>
                    <ul className="space-y-2.5 mt-4">
                      {[
                        'Advanced AMM curves',
                        'Dynamic liquidity incentives',
                        'Multi-position portfolio tools',
                        'Risk metrics & analytics',
                        'Strategy-based dashboards'
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <Layers className="h-4 w-4 text-cyan-primary-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Center Node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center order-1 md:order-2 hidden sm:flex">
                  <div className="w-3 h-3 bg-slate-200 rounded-full ring-4 ring-white group-hover:bg-cyan-primary-400 transition-colors duration-300" />
                </div>

                {/* Spacer */}
                <div className="w-full md:w-[45%] order-3 hidden md:block" />
              </motion.div>


              {/* --- PHASE 4: Q3 2026 (PLANNED) --- */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative flex flex-col md:flex-row items-center justify-between gap-8 group"
              >
                {/* Spacer */}
                <div className="w-full md:w-[45%] order-3 md:order-1 hidden md:block" />

                {/* Center Node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center order-1 md:order-2 hidden sm:flex">
                  <div className="w-3 h-3 bg-slate-200 rounded-full ring-4 ring-white group-hover:bg-purple-500 transition-colors duration-300" />
                </div>

                {/* Content */}
                <div className="w-full md:w-[45%] order-2 md:order-3">
                  <div className="glass-card p-6 border-cyan-primary-200/50 hover:border-purple-400/50 relative overflow-hidden group-hover:-translate-y-1 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                      <span className="text-purple-600">Q3 2026</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300"/>
                      Protocol Expansion
                    </h3>
                    <ul className="space-y-2.5 mt-4">
                      {[
                        'Partial real on-chain execution',
                        'Cross-market liquidity routing',
                        'API access for external devs',
                        'Institutional-grade analytics',
                        'Ecosystem partnerships'
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <Rocket className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}