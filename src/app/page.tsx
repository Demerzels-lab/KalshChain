'use client';

import { useState } from 'react';
import { useMarkets } from '@/hooks/useMarkets';
import { MarketCard } from '@/components/MarketCard';
import { InteractiveBackground } from '@/components/InteractiveBackground';
import { LoadingScreen } from '@/components/LoadingScreen';
import { useLoading } from '@/contexts/LoadingContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Shield, ArrowRight, Loader2, Globe, Activity, Construction, Layers, CheckCircle2, Timer, Rocket, Twitter, Github, HelpCircle, ChevronDown, ChevronUp, Wallet, BookOpen, DollarSign, BarChart3, Clock, Target, Coins } from 'lucide-react';
import Link from 'next/link';

const categories = ['All', 'Crypto', 'Politics', 'Economy', 'Sports', 'AI & Tech', 'Culture'];

const faqs = [
  {
    question: 'What is a prediction market?',
    answer: 'A prediction market is a platform where you can trade on the outcomes of future events. Prices reflect the collective probability assessment of those events occurring. If you believe an event is more likely than the current price suggests, you can profit by buying shares.'
  },
  {
    question: 'How do prices work?',
    answer: 'Prices range from 0.01 to 0.99 SOL and represent the probability of an outcome. For example, if YES shares are trading at 0.60 SOL, the market believes theres a 60% chance the event will happen. When the market resolves, winning shares pay 1 SOL and losing shares pay 0 SOL.'
  },
  {
    question: 'What wallet do I need?',
    answer: 'Currently, we support Phantom wallet, which is the most popular Solana wallet. You can install it as a browser extension from phantom.app. Make sure you have some SOL for transaction fees.'
  },
  {
    question: 'What are the fees?',
    answer: 'We charge a 2% fee on each trade. This fee is used to reward liquidity providers and maintain the platform. There are also minimal Solana network fees (usually less than 0.01 SOL per transaction).'
  },
  {
    question: 'How are markets resolved?',
    answer: 'Markets are resolved based on publicly verifiable outcomes. For most markets, we use official sources like government announcements, financial data providers, or sports results. The resolution criteria is specified in each market description.'
  },
  {
    question: 'Can I create my own market?',
    answer: 'Yes! Connect your wallet and navigate to "Create Market". You can specify the question, category, expiration date, and initial liquidity. Your market will be immediately tradeable once created.'
  },
  {
    question: 'What is KalshChain?',
    answer: 'KalshChain is a decentralized prediction market platform built on the Solana blockchain. It allows users to trade on the outcome of future events using an Automated Market Maker (AMM) model.'
  },
  {
    question: 'How are market prices determined?',
    answer: 'Prices are determined by a Constant Product Market Maker (CPMM) formula (x * y = k), which balances the reserves of YES and NO shares in the liquidity pool. When one side is bought, its price increases automatically.'
  },
  {
    question: 'Is KalshChain custodial or non-custodial?',
    answer: 'KalshChain is non-custodial. Your funds are held entirely in your personal Solana wallet. Smart contracts manage the trade execution and settlement, but they never have direct control over your assets.'
  },
  {
    question: 'What is the trading fee?',
    answer: 'A small trading fee (currently 2%) is applied to every trade. This fee is automatically added to the market\'s liquidity pool and distributed to Liquidity Providers (LPs).'
  }
];

const howItWorksSteps = [
  {
    number: 1,
    title: 'Connect Your Wallet',
    description: 'Connect your Phantom wallet to access the platform. Your wallet serves as your identity and holds your funds.',
    icon: Wallet,
    details: [
      'Install Phantom wallet browser extension',
      'Click "Select Wallet" in the navigation bar',
      'Approve the connection request',
      'Your wallet address will be displayed when connected'
    ]
  },
  {
    number: 2,
    title: 'Explore Markets',
    description: 'Browse through various prediction markets across different categories including crypto, politics, economics, and more.',
    icon: TrendingUp,
    details: [
      'Use filters to find markets by category',
      'Sort by volume, expiration, or probability',
      'View market details including liquidity and volume',
      'Check the current YES/NO probabilities'
    ]
  },
  {
    number: 3,
    title: 'Place Your Trade',
    description: 'Buy YES or NO shares based on your prediction. The price reflects the market probability of that outcome.',
    icon: DollarSign,
    details: [
      'Select YES if you believe the event will happen',
      'Select NO if you believe it will not happen',
      'Enter the number of shares you want to buy',
      'Review the price impact and confirm your trade'
    ]
  },
  {
    number: 4,
    title: 'Wait for Resolution',
    description: 'Markets resolve at their expiration date. Winning shares pay out 1 SOL, losing shares pay 0 SOL.',
    icon: Clock,
    details: [
      'Monitor your positions in the Positions tab',
      'Track unrealized profit/loss in real-time',
      'Markets resolve based on real-world outcomes',
      'Winnings are automatically credited to your wallet'
    ]
  }
];

const platformFeatures = [
  {
    icon: Shield,
    title: 'Non-Custodial',
    description: 'Your funds remain in your control. We never hold your assets.'
  },
  {
    icon: Zap,
    title: 'Instant Settlement',
    description: 'Trades settle instantly on-chain with no waiting period.'
  },
  {
    icon: BarChart3,
    title: 'AMM Powered',
    description: 'Automated Market Maker ensures deep liquidity for all trades.'
  },
  {
    icon: Activity,
    title: 'Community Markets',
    description: 'Create your own markets and earn fees as a liquidity provider.'
  }
];

export default function HomePage() {
  const { markets, loading } = useMarkets();
  const { isLoading, setIsLoading } = useLoading();
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [expandedStep, setExpandedStep] = useState<number | null>(1);

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
                Decentralized Kalshi <br />
                <span className="bg-gradient-to-r from-cyan-primary-600 via-cyan-primary-500 to-teal-500 bg-clip-text text-transparent">
                  Prediction Markets
                </span>
              </h1>
              
              <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
                on the future with blockchain transparency. From crypto to politics, 
                economics to sports all in one platform.
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

              <div className="flex items-center gap-4 pt-2">
                <Link href="https://x.com/kalshchain" target="_blank" rel="noopener noreferrer" 
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors">
                  <Twitter className="h-4 w-4" />
                  <span className="text-sm font-medium">Twitter</span>
                </Link>
                <Link href="https://github.com/Demerzels-lab/KalshChain" target="_blank" rel="noopener noreferrer" 
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors">
                  <Github className="h-4 w-4" />
                  <span className="text-sm font-medium">GitHub</span>
                </Link>
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
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Active Markets</h2>
              <p className="text-slate-500">Real-time prediction pools open for trading</p>
            </div>
            <Link href="/explore" className="hidden sm:flex items-center gap-2 text-cyan-primary-600 font-semibold hover:text-cyan-primary-700 transition-colors">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex gap-2 overflow-x-auto pb-6 scrollbar-hide mb-6"
          >
            {categories.map((cat, index) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-cyan-primary-300'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {loading ? (
              <div className="flex items-center justify-center h-64 glass-card rounded-2xl">
                <Loader2 className="h-8 w-8 animate-spin text-cyan-primary-500" />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(activeCategory === 'All' ? markets : filteredMarkets).slice(0, 6).map((market, index) => (
                  <motion.div
                    key={market.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  >
                    <MarketCard market={market} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 text-center sm:hidden"
          >
            <Link href="/explore">
              <Button variant="outline" className="w-full">View All Markets</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- HOW IT WORKS SECTION --- */}
      <section className="py-32 relative bg-gradient-to-b from-white to-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-primary-500/10 border border-cyan-primary-500/20 text-cyan-primary-600 text-xs font-mono font-bold uppercase tracking-widest mb-4">
              <HelpCircle className="h-4 w-4" />
              How It Works
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Get Started in Minutes</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Learn how to trade on decentralized prediction markets. From connecting your wallet to making your first trade.
            </p>
          </motion.div>

          {/* Step by Step Guide */}
          <div className="max-w-4xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center mb-12"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Step-by-Step Guide</h3>
              <p className="text-slate-600">Follow these simple steps to start trading</p>
            </motion.div>

            <div className="space-y-4">
              {howItWorksSteps.map((step, index) => {
                const Icon = step.icon;
                const isExpanded = expandedStep === step.number;

                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    className="border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedStep(isExpanded ? null : step.number)}
                      className="w-full text-left p-6 flex items-center gap-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-cyan-primary-600 flex items-center justify-center text-white font-bold text-lg">
                        {step.number}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="h-5 w-5 text-cyan-primary-600" />
                          <h4 className="font-semibold text-slate-900">{step.title}</h4>
                        </div>
                        <p className="text-sm text-slate-600">{step.description}</p>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-slate-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0" />
                      )}
                    </button>

                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6"
                      >
                        <div className="ml-16 pl-4 border-l-2 border-cyan-primary-300">
                          <ul className="space-y-3">
                            {step.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <span className="text-slate-700 text-sm leading-relaxed">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Platform Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Platform Features</h3>
              <p className="text-slate-600">Built for security, speed, and transparency</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {platformFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="glass-card p-6 text-center"
                  >
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-cyan-primary-100 text-cyan-primary-600 mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h4>
                    <p className="text-sm text-slate-600">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Trading Flow Diagram */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Trading Flow</h3>
              <p className="text-slate-600">Understand how trades work from start to finish</p>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-cyan-primary-200 -translate-y-1/2" />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { icon: Target, title: 'Select Market', desc: 'Choose a prediction market' },
                  { icon: Coins, title: 'Buy Shares', desc: 'YES or NO at current price' },
                  { icon: BarChart3, title: 'Monitor Position', desc: 'Track P&L in real-time' },
                  { icon: DollarSign, title: 'Collect Payout', desc: 'Winners receive 1 SOL/share' },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="relative text-center">
                      <div className="relative z-10 mx-auto h-16 w-16 rounded-full bg-cyan-primary-100 border-2 border-cyan-primary-500 flex items-center justify-center mb-4">
                        <Icon className="h-7 w-7 text-cyan-primary-600" />
                      </div>
                      <h4 className="font-semibold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-600">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
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

      {/* --- FAQ SECTION --- */}
      <section className="py-32 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-primary-500/10 border border-cyan-primary-500/20 text-cyan-primary-600 text-xs font-mono font-bold uppercase tracking-widest mb-4">
              <HelpCircle className="h-4 w-4" />
              FAQ
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Find answers to common questions about prediction markets, trading, and the KalshChain platform.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isExpanded = expandedFaq === idx;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-slate-900 text-left">{faq.question}</span>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-slate-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-slate-500 flex-shrink-0" />
                    )}
                  </button>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 p-8 bg-cyan-primary-50 border border-cyan-primary-200 rounded-2xl text-center"
          >
            <h3 className="text-xl font-semibold text-cyan-primary-900 mb-3">Still have questions?</h3>
            <p className="text-cyan-primary-700 mb-6 max-w-md mx-auto">
              Can't find what you're looking for? Check out our comprehensive documentation or reach out to the community.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/docs">
                <Button className="bg-cyan-primary-600 hover:bg-cyan-primary-700 text-white">
                  View Documentation
                </Button>
              </Link>
            </div>
          </motion.div>
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
    </div>
  );
}