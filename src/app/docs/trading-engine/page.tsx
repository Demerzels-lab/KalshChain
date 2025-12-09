// demerzels-lab/kalshchain/KalshChain-237051255d46360ee0eab8d0278534895dc525cf/src/app/docs/trading-engine/page.tsx
import { CodeBlock } from '@/components/docs/CodeBlock';
import { Zap, Code, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function TradingEnginePage() {
  return (
    <div className="prose max-w-none">
      {/* Inverted text color and cyan accent */}
      <h1 className="text-4xl font-bold text-slate-900 mb-4 flex items-center gap-3">
        <Zap className="h-8 w-8 text-cyan-primary-600" />
        Trading Engine (AMM)
      </h1>
      <p className="text-lg text-slate-600 mb-8">
        Details on the constant product formula and how trades are executed on-chain.
      </p>

      {/* Pricing Formula */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Pricing Formula</h2>
        <p className="text-slate-700">
          The instantaneous price <code className='text-cyan-primary-600 font-mono'>P</code> of a share is determined by the ratio of the reserves. For a YES share:
        </p>
        <CodeBlock
          language="math"
          code={`P_{YES} = y / (x + y)`}
        />
        <p className="text-slate-700">
          Where <code className='text-cyan-primary-600 font-mono'>x</code> is the YES reserve and <code className='text-cyan-primary-600 font-mono'>y</code> is the NO reserve. The price of a NO share is always <code className='text-cyan-primary-600 font-mono'>{"1 - P_{YES}"}</code>.
        </p>
      </section>

      {/* Trade Execution */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Trade Execution</h2>
        <p className="text-slate-700">
          When a trade is executed, the smart contract calculates the new reserves needed to maintain the constant <code className='text-cyan-primary-600 font-mono'>k</code>, and the amount of base currency (USDC) required for the transaction.
        </p>
        <CodeBlock
          language="rust"
          filename="AMM_trade_function.rs"
          code={`// Pseudocode for trade execution
fn execute_trade(
    reserve_x: u64,
    reserve_y: u64,
    amount_in: u64
) -> (u64, u64) {
    let k = reserve_x * reserve_y;
    // Calculate shares out, new reserves, fees, and final cost
    // ... complex math involving k ...
    return (shares_out, total_cost);
}`}
        />
        <p className="text-slate-700 mt-4">
          All trades incur a small **trading fee** (currently 2%), which is added back to the liquidity pool, rewarding LPs.
        </p>
      </section>

      {/* Price Impact */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Price Impact</h2>
        <p className="text-slate-700">
          Because the AMM determines price based on reserves, large trades will cause **price slippage** (price impact). The trading panel provides a quote to show the estimated price before execution.
        </p>
        {/* Updated alert box for light theme */}
        <div className='mt-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-700'>
          <p className='text-sm font-medium'>
            <strong>Warning:</strong> Be mindful of price impact, especially on low-liquidity markets. Always check the quoted price before confirming.
          </p>
        </div>
      </section>

      {/* Next Steps */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Next Steps</h2>
        <ul className='space-y-2'>
          <li>
            {/* Cyan-primary link color */}
            <Link href="/docs/api" className='text-cyan-primary-600 hover:text-cyan-primary-700 flex items-center'>
              <ArrowRight className='h-4 w-4 mr-2' /> API Reference - Integrate market data
            </Link>
          </li>
          <li>
            {/* Cyan-primary link color */}
            <Link href="/docs/security" className='text-cyan-primary-600 hover:text-cyan-primary-700 flex items-center'>
              <ArrowRight className='h-4 w-4 mr-2' /> Security - Review the contract model
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}