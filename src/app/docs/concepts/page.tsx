// demerzels-lab/kalshchain/KalshChain-237051255d46360ee0eab8d0278534895dc525cf/src/app/docs/concepts/page.tsx
import { CodeBlock } from '@/components/docs/CodeBlock';
import { ArrowRight, Info } from 'lucide-react';
import Link from 'next/link';

export default function ConceptsPage() {
  return (
    <div className="prose max-w-none">
      {/* Inverted text color and cyan accent */}
      <h1 className="text-4xl font-bold text-slate-900 mb-4 flex items-center gap-3">
        <Info className="h-8 w-8 text-cyan-primary-600" />
        Core Concepts
      </h1>
      <p className="text-lg text-slate-600 mb-8">
        An introduction to the fundamental ideas powering the KalshChain prediction market.
      </p>

      {/* Prediction Markets */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Prediction Markets</h2>
        <p className="text-slate-700">
          A prediction market is a trading platform where users buy and sell shares corresponding to the outcome of a future event. Shares are priced between 0.00 and 1.00 SOL.
        </p>
        <ul className='text-slate-700 space-y-2 mt-4'>
          <li>
            If you buy a 'YES' share at 0.40 SOL, you are predicting the event has a 40% chance of occurring.
          </li>
          <li>
            If the event occurs (YES), the share settles at 1.00 SOL, giving you a 0.60 SOL profit.
          </li>
          <li>
            If the event does not occur (NO), the share settles at 0.00 SOL, and you lose your 0.40 SOL investment.
          </li>
        </ul>
      </section>

      {/* Automated Market Makers (AMM) */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Automated Market Maker (AMM)</h2>
        <p className="text-slate-700">
          KalshChain uses an AMM model, specifically the **Constant Product Market Maker (CPMM)** formula, to determine the price of shares. This eliminates the need for counterparties and order books.
        </p>

        <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">The Formula: <code className='text-cyan-primary-600'>x * y = k</code></h3>
        <p className="text-slate-700">
          Where:
        </p>
        <ul className='text-slate-700 space-y-2 mt-2 list-disc list-inside'>
          <li><code className='text-cyan-primary-600'>x</code> is the reserve of YES shares.</li>
          <li><code className='text-cyan-primary-600'>y</code> is the reserve of NO shares.</li>
          <li><code className='text-cyan-primary-600'>k</code> is a constant (liquidity measure).</li>
        </ul>
        <div className='mt-6 p-4 rounded-lg bg-cyan-primary-500/10 border border-cyan-primary-500/30 text-cyan-primary-700'>
          <p className='text-sm font-medium'>
            When a user buys YES shares, <code className='text-cyan-primary-600'>x</code> decreases and <code className='text-cyan-primary-600'>y</code> increases, which raises the price of the remaining YES shares.
          </p>
        </div>
      </section>

      {/* Liquidity Pools */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Liquidity Pools</h2>
        <p className="text-slate-700">
          Each prediction market has its own liquidity pool containing YES and NO shares. Users who deposit funds (USDC or equivalent) into the pool become **Liquidity Providers (LPs)**.
        </p>
        <ul className='text-slate-700 space-y-2 mt-4'>
          <li>LPs earn a small fee (e.g., 2%) on every trade executed in the market.</li>
          <li>LPs are exposed to impermanent loss, as they take the opposing side of every trade.</li>
        </ul>
      </section>
      
      {/* Settlement */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Market Resolution & Settlement</h2>
        <p className="text-slate-700">
          Markets are settled after the expiration date using a **decentralized oracle** to determine the final outcome (YES or NO).
        </p>
        <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Settlement Payouts</h3>
        <p className="text-slate-700">
          Holders of the winning outcome receive 1.00 SOL per share, drawn from the liquidity pool. Holders of the losing outcome receive 0.00 SOL.
        </p>
      </section>
      
      {/* Next Steps */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Next Steps</h2>
        <ul className='space-y-2'>
          <li>
            <Link href="/docs/trading-engine" className='text-cyan-primary-600 hover:text-cyan-primary-700 flex items-center'>
              <ArrowRight className='h-4 w-4 mr-2' /> Deep Dive: The Trading Engine
            </Link>
          </li>
          <li>
            <Link href="/docs/architecture" className='text-cyan-primary-600 hover:text-cyan-primary-700 flex items-center'>
              <ArrowRight className='h-4 w-4 mr-2' /> Explore the System Architecture
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}