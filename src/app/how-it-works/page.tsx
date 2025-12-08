'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Wallet, TrendingUp, ArrowRight, CheckCircle2, Zap, Shield, 
  Users, ChevronDown, ChevronUp, BookOpen, HelpCircle,
  DollarSign, BarChart3, Clock, Target, Coins
} from 'lucide-react';

const steps = [
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
    description: 'Markets resolve at their expiration date. Winning shares pay out $1, losing shares pay $0.',
    icon: Clock,
    details: [
      'Monitor your positions in the Positions tab',
      'Track unrealized profit/loss in real-time',
      'Markets resolve based on real-world outcomes',
      'Winnings are automatically credited to your wallet'
    ]
  }
];

const features = [
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
    icon: Users,
    title: 'Community Markets',
    description: 'Create your own markets and earn fees as a liquidity provider.'
  }
];

const faqs = [
  {
    question: 'What is a prediction market?',
    answer: 'A prediction market is a platform where you can trade on the outcomes of future events. Prices reflect the collective probability assessment of those events occurring. If you believe an event is more likely than the current price suggests, you can profit by buying shares.'
  },
  {
    question: 'How do prices work?',
    answer: 'Prices range from $0.01 to $0.99 and represent the probability of an outcome. For example, if YES shares are trading at $0.60, the market believes theres a 60% chance the event will happen. When the market resolves, winning shares pay $1 and losing shares pay $0.'
  },
  {
    question: 'What wallet do I need?',
    answer: 'Currently, we support Phantom wallet, which is the most popular Solana wallet. You can install it as a browser extension from phantom.app. Make sure you have some SOL for transaction fees.'
  },
  {
    question: 'What are the fees?',
    answer: 'We charge a 2% fee on each trade. This fee is used to reward liquidity providers and maintain the platform. There are also minimal Solana network fees (usually less than $0.01 per transaction).'
  },
  {
    question: 'How are markets resolved?',
    answer: 'Markets are resolved based on publicly verifiable outcomes. For most markets, we use official sources like government announcements, financial data providers, or sports results. The resolution criteria is specified in each market description.'
  },
  {
    question: 'Can I create my own market?',
    answer: 'Yes! Connect your wallet and navigate to "Create Market". You can specify the question, category, expiration date, and initial liquidity. Your market will be immediately tradeable once created.'
  }
];

export default function HowItWorksPage() {
  const [expandedStep, setExpandedStep] = useState<number | null>(1);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-950/50 to-slate-950 border-b border-slate-800">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm mb-6">
              <HelpCircle className="h-4 w-4" />
              Learn the Basics
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              How KalshChain Works
            </h1>
            <p className="text-lg text-slate-400 mb-8">
              Learn how to trade on decentralized prediction markets in minutes. From connecting your wallet to making your first trade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/explore">
                <Button size="lg">
                  Start Trading Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
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

      {/* Step by Step */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Step-by-Step Guide</h2>
          <p className="text-slate-400">Follow these simple steps to start trading on prediction markets</p>
        </div>

        <div className="space-y-4">
          {steps.map((step) => {
            const Icon = step.icon;
            const isExpanded = expandedStep === step.number;
            
            return (
              <Card key={step.number} className="overflow-hidden">
                <button
                  onClick={() => setExpandedStep(isExpanded ? null : step.number)}
                  className="w-full text-left"
                >
                  <CardHeader className="flex flex-row items-center gap-4 p-6">
                    <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-indigo-400" />
                        {step.title}
                      </CardTitle>
                      <p className="text-sm text-slate-400 mt-1">{step.description}</p>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-slate-400" />
                    )}
                  </CardHeader>
                </button>
                
                {isExpanded && (
                  <CardContent className="px-6 pb-6 pt-0">
                    <div className="ml-16 pl-4 border-l-2 border-indigo-500/30">
                      <ul className="space-y-3">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-300">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-slate-800 bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Platform Features</h2>
            <p className="text-slate-400">Built for security, speed, and transparency</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="p-6 text-center">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-indigo-500/10 text-indigo-400 mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-400">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trading Flow Diagram */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Trading Flow</h2>
          <p className="text-slate-400">Understand how trades work from start to finish</p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Target, title: 'Select Market', desc: 'Choose a prediction market' },
              { icon: Coins, title: 'Buy Shares', desc: 'YES or NO at current price' },
              { icon: BarChart3, title: 'Monitor Position', desc: 'Track P&L in real-time' },
              { icon: DollarSign, title: 'Collect Payout', desc: 'Winners receive $1/share' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="relative text-center">
                  <div className="relative z-10 mx-auto h-16 w-16 rounded-full bg-slate-900 border-2 border-indigo-500 flex items-center justify-center mb-4">
                    <Icon className="h-7 w-7 text-indigo-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-slate-800 bg-slate-900/30">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-400">Common questions about prediction markets and KalshChain</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isExpanded = expandedFaq === idx;
              
              return (
                <Card key={idx}>
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4"
                  >
                    <span className="font-medium text-white">{faq.question}</span>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-slate-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0" />
                    )}
                  </button>
                  {isExpanded && (
                    <div className="px-5 pb-5">
                      <p className="text-slate-400 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start?</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Connect your wallet and explore prediction markets across crypto, politics, economics, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/explore">
                <Button size="lg">
                  Explore Markets
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/create">
                <Button variant="outline" size="lg">
                  Create a Market
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
