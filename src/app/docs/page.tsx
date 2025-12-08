'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { CodeBlock } from '@/components/docs/CodeBlock';
import { 
  BookOpen, Zap, Code, TrendingUp, Shield, 
  ArrowRight, CheckCircle, Wallet
} from 'lucide-react';

export default function DocsIndexPage() {
  return (
    <div className="prose prose-invert max-w-none">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          KalshChain Documentation
        </h1>
        <p className="text-xl text-slate-400">
          Welcome to the complete documentation for KalshChain - a decentralized prediction market platform built on Solana blockchain.
        </p>
      </div>

      {/* Quick Start Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 not-prose">
        <Link href="/docs/getting-started">
          <Card className="p-6 hover:border-indigo-500/50 transition-all h-full group cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                  Quick Start Guide
                </h3>
                <p className="text-sm text-slate-400 mb-3">
                  Get started with KalshChain in under 5 minutes. Connect your wallet and make your first trade.
                </p>
                <div className="text-sm text-indigo-400 flex items-center gap-1">
                  Start trading <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/docs/api">
          <Card className="p-6 hover:border-indigo-500/50 transition-all h-full group cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center flex-shrink-0">
                <Code className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                  API Reference
                </h3>
                <p className="text-sm text-slate-400 mb-3">
                  Complete REST and WebSocket API documentation for building applications on KalshChain.
                </p>
                <div className="text-sm text-indigo-400 flex items-center gap-1">
                  View API docs <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </Card>
        </Link>
      </div>

      {/* Platform Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">
          Platform Overview
        </h2>
        <p className="text-slate-300 mb-6">
          KalshChain is a decentralized prediction market platform that enables users to trade on the outcome of future events. Built on Solana blockchain, it combines the power of decentralization with the speed and low costs of Solana.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose">
          <Card className="p-5 bg-slate-800/30 border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 rounded bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <Shield className="h-5 w-5" />
              </div>
              <h4 className="font-semibold text-white">Decentralized</h4>
            </div>
            <p className="text-sm text-slate-400">
              Non-custodial trading with smart contracts on Solana blockchain.
            </p>
          </Card>

          <Card className="p-5 bg-slate-800/30 border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 rounded bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h4 className="font-semibold text-white">AMM Trading</h4>
            </div>
            <p className="text-sm text-slate-400">
              Automated market maker ensures instant liquidity and fair pricing.
            </p>
          </Card>

          <Card className="p-5 bg-slate-800/30 border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 rounded bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Wallet className="h-5 w-5" />
              </div>
              <h4 className="font-semibold text-white">Self-Custody</h4>
            </div>
            <p className="text-sm text-slate-400">
              Your keys, your funds. Connect any Solana wallet like Phantom.
            </p>
          </Card>
        </div>
      </section>

      {/* Core Concepts */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">
          Core Concepts
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-400" />
              Prediction Markets
            </h3>
            <p className="text-slate-300 mb-3">
              Prediction markets allow users to trade on the outcome of future events. Each market has two outcomes: YES and NO. Users can buy shares representing their belief in either outcome.
            </p>
            <p className="text-slate-400 text-sm">
              Example: "Will Bitcoin reach $150K before 2027?" - You can buy YES shares if you think it will, or NO shares if you think it won't.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-400" />
              Automated Market Maker (AMM)
            </h3>
            <p className="text-slate-300 mb-3">
              KalshChain uses an Automated Market Maker to provide instant liquidity. The AMM automatically adjusts prices based on supply and demand using a constant product formula.
            </p>
            <CodeBlock
              language="javascript"
              code={`// AMM Formula: x * y = k
// where x = YES reserves, y = NO reserves, k = constant

const calculatePrice = (reserves, k) => {
  const yesPrice = reserves.no / (reserves.yes + reserves.no);
  const noPrice = reserves.yes / (reserves.yes + reserves.no);
  return { yesPrice, noPrice };
};`}
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-400" />
              Liquidity Pools
            </h3>
            <p className="text-slate-300 mb-3">
              Each market has a liquidity pool containing YES and NO shares. Traders can buy from or sell to this pool. Liquidity providers earn fees from all trades.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Guides */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">
          Popular Guides
        </h2>
        
        <div className="grid gap-4 not-prose">
          {[
            {
              title: 'Connect Your Wallet',
              description: 'Learn how to connect Phantom wallet to KalshChain',
              href: '/docs/guides/wallet',
              icon: Wallet,
              time: '2 min read'
            },
            {
              title: 'Make Your First Trade',
              description: 'Step-by-step guide to buying and selling shares',
              href: '/docs/guides/trading',
              icon: TrendingUp,
              time: '5 min read'
            },
            {
              title: 'Create a Market',
              description: 'Launch your own prediction market on KalshChain',
              href: '/docs/guides/create-market',
              icon: Zap,
              time: '10 min read'
            },
            {
              title: 'API Integration',
              description: 'Build applications using KalshChain REST API',
              href: '/docs/api',
              icon: Code,
              time: '15 min read'
            }
          ].map((guide) => {
            const Icon = guide.icon;
            return (
              <Link key={guide.href} href={guide.href}>
                <Card className="p-5 hover:border-indigo-500/50 transition-all group cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1 group-hover:text-indigo-400 transition-colors">
                        {guide.title}
                      </h4>
                      <p className="text-sm text-slate-400 mb-2">
                        {guide.description}
                      </p>
                      <span className="text-xs text-slate-500">{guide.time}</span>
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Getting Help */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">
          Getting Help
        </h2>
        <p className="text-slate-300 mb-4">
          Can't find what you're looking for? Here are some resources:
        </p>
        <ul className="space-y-2">
          <li className="flex items-center gap-2 text-slate-300">
            <BookOpen className="h-4 w-4 text-indigo-400" />
            Check our <Link href="/docs/faq" className="text-indigo-400 hover:text-indigo-300">FAQ section</Link>
          </li>
          <li className="flex items-center gap-2 text-slate-300">
            <BookOpen className="h-4 w-4 text-indigo-400" />
            Browse <Link href="/docs/troubleshooting" className="text-indigo-400 hover:text-indigo-300">Troubleshooting guides</Link>
          </li>
          <li className="flex items-center gap-2 text-slate-300">
            <BookOpen className="h-4 w-4 text-indigo-400" />
            Search the <Link href="/docs/glossary" className="text-indigo-400 hover:text-indigo-300">Glossary</Link> for technical terms
          </li>
        </ul>
      </section>
    </div>
  );
}
