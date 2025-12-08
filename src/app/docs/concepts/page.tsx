'use client';

import { CodeBlock } from '@/components/docs/CodeBlock';
import { Card } from '@/components/ui/card';
import { TrendingUp, Droplets, Target, Zap, DollarSign, BarChart3 } from 'lucide-react';

export default function ConceptsPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold text-white mb-4">Core Concepts</h1>
      <p className="text-xl text-slate-400 mb-8">
        Master the fundamental concepts powering KalshChain prediction markets.
      </p>

      {/* Prediction Markets */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">
          <Target className="inline h-6 w-6 mr-2 text-indigo-400" />
          What are Prediction Markets?
        </h2>
        
        <p className="text-slate-300 mb-4">
          Prediction markets are exchange-traded markets where participants trade on the outcome of future events. Each market has two possible outcomes: YES or NO.
        </p>

        <div className="not-prose mb-6">
          <Card className="p-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
            <h4 className="font-semibold text-white mb-3">Example Market</h4>
            <p className="text-slate-300 mb-2">
              "Will Bitcoin reach $150K before December 31, 2026?"
            </p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                <div className="text-sm text-emerald-400 mb-1">YES Outcome</div>
                <div className="text-2xl font-bold text-emerald-400">65%</div>
                <div className="text-xs text-slate-400 mt-1">Current probability</div>
              </div>
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30">
                <div className="text-sm text-rose-400 mb-1">NO Outcome</div>
                <div className="text-2xl font-bold text-rose-400">35%</div>
                <div className="text-xs text-slate-400 mt-1">Current probability</div>
              </div>
            </div>
          </Card>
        </div>

        <h3 className="text-xl font-semibold text-white mb-3">How Trading Works</h3>
        <p className="text-slate-300 mb-4">
          Traders buy shares representing their belief in either outcome. If you think Bitcoin will reach $150K, you buy YES shares at the current market price (e.g., 65 cents per share). If the event happens, your shares become worth $1 each, giving you a profit of 35 cents per share.
        </p>

        <CodeBlock
          language="typescript"
          filename="trading-example.ts"
          code={`// Buy YES shares when you believe in the outcome
const buyYesShares = async (quantity: number) => {
  const currentYesPrice = 0.65; // 65% probability
  const cost = quantity * currentYesPrice;
  
  // If market resolves YES: profit = quantity * (1 - currentYesPrice)
  // If market resolves NO: loss = cost
  
  return executeTrade({
    outcome: 'YES',
    side: 'BUY',
    quantity,
    maxPrice: currentYesPrice
  });
};

// Buy NO shares when you disagree
const buyNoShares = async (quantity: number) => {
  const currentNoPrice = 0.35; // 35% probability
  const cost = quantity * currentNoPrice;
  
  return executeTrade({
    outcome: 'NO',
    side: 'BUY',
    quantity,
    maxPrice: currentNoPrice
  });
};`}
        />
      </section>

      {/* AMM */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">
          <BarChart3 className="inline h-6 w-6 mr-2 text-purple-400" />
          Automated Market Maker (AMM)
        </h2>
        
        <p className="text-slate-300 mb-4">
          KalshChain uses an Automated Market Maker to provide instant liquidity for all markets. The AMM automatically adjusts prices based on supply and demand using a mathematical formula.
        </p>

        <h3 className="text-xl font-semibold text-white mb-3">Constant Product Formula</h3>
        <p className="text-slate-300 mb-4">
          The core principle: <code className="text-indigo-400 bg-slate-800 px-2 py-1 rounded">x * y = k</code>
        </p>
        <ul className="space-y-2 text-slate-300 mb-6">
          <li><strong>x</strong> = YES shares in pool</li>
          <li><strong>y</strong> = NO shares in pool</li>
          <li><strong>k</strong> = constant product (never changes)</li>
        </ul>

        <CodeBlock
          language="typescript"
          filename="amm-formula.ts"
          code={`// AMM Price Calculation
interface Pool {
  yesReserve: number;
  noReserve: number;
  kConstant: number;
}

function getCurrentPrices(pool: Pool) {
  const total = pool.yesReserve + pool.noReserve;
  
  return {
    yesPrice: pool.noReserve / total,  // NO reserve / total
    noPrice: pool.yesReserve / total   // YES reserve / total
  };
}

// Calculate price impact for a trade
function calculateTradeImpact(
  pool: Pool,
  outcome: 'YES' | 'NO',
  quantity: number
): { newPrice: number; cost: number; priceImpact: number } {
  const oldPrice = getCurrentPrices(pool);
  
  if (outcome === 'YES') {
    // Buying YES means adding to YES reserve, removing from NO reserve
    const newYesReserve = pool.yesReserve + quantity;
    const newNoReserve = pool.kConstant / newYesReserve;
    const noTokensReceived = pool.noReserve - newNoReserve;
    
    const avgPrice = noTokensReceived / quantity;
    const newPrice = newNoReserve / (newYesReserve + newNoReserve);
    
    return {
      newPrice,
      cost: noTokensReceived,
      priceImpact: Math.abs(newPrice - oldPrice.yesPrice) / oldPrice.yesPrice
    };
  } else {
    // Similar calculation for NO shares
    const newNoReserve = pool.noReserve + quantity;
    const newYesReserve = pool.kConstant / newNoReserve;
    const yesTokensReceived = pool.yesReserve - newYesReserve;
    
    const avgPrice = yesTokensReceived / quantity;
    const newPrice = newYesReserve / (newYesReserve + newNoReserve);
    
    return {
      newPrice,
      cost: yesTokensReceived,
      priceImpact: Math.abs(newPrice - oldPrice.noPrice) / oldPrice.noPrice
    };
  }
}`}
        />

        <div className="not-prose mt-6">
          <Card className="p-6 bg-yellow-500/5 border-yellow-500/20">
            <h4 className="font-semibold text-yellow-400 mb-2 flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Price Impact
            </h4>
            <p className="text-slate-300 text-sm">
              Large trades move prices more than small trades. This is called "price impact" or "slippage." The AMM formula ensures the pool maintains balance while adjusting prices based on trading activity.
            </p>
          </Card>
        </div>
      </section>

      {/* Liquidity Pools */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">
          <Droplets className="inline h-6 w-6 mr-2 text-cyan-400" />
          Liquidity Pools
        </h2>
        
        <p className="text-slate-300 mb-4">
          Each market has a liquidity pool containing YES and NO shares. These pools enable instant trading without requiring a counterparty.
        </p>

        <h3 className="text-xl font-semibold text-white mb-3">Pool Mechanics</h3>
        <CodeBlock
          language="typescript"
          filename="liquidity-pool.ts"
          code={`interface LiquidityPool {
  marketId: string;
  yesReserve: number;      // Number of YES shares in pool
  noReserve: number;       // Number of NO shares in pool
  kConstant: number;       // yesReserve * noReserve
  tvl: number;             // Total Value Locked
  totalVolume: number;     // Cumulative trading volume
  feeRate: number;         // Trading fee (e.g., 0.02 = 2%)
  feeRewards: number;      // Accumulated fees
}

// Example pool state
const examplePool: LiquidityPool = {
  marketId: '123',
  yesReserve: 5000,        // 5000 YES shares
  noReserve: 5000,         // 5000 NO shares
  kConstant: 25000000,     // 5000 * 5000
  tvl: 10000,              // $10,000 total liquidity
  totalVolume: 45000,      // $45,000 traded so far
  feeRate: 0.02,           // 2% fee on each trade
  feeRewards: 900          // $900 fees collected
};

// Prices: 50% YES, 50% NO (balanced pool)`}
        />

        <h3 className="text-xl font-semibold text-white mb-3 mt-6">Liquidity Provider Rewards</h3>
        <p className="text-slate-300 mb-4">
          Users can add liquidity to pools and earn a share of trading fees. When you provide liquidity, you deposit equal value of YES and NO shares, receiving LP tokens representing your pool share.
        </p>

        <div className="not-prose">
          <table className="w-full border border-slate-700">
            <thead>
              <tr className="bg-slate-800">
                <th className="p-3 text-left text-white border-b border-slate-700">Metric</th>
                <th className="p-3 text-right text-white border-b border-slate-700">Example Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-700">
                <td className="p-3 text-slate-300">Your LP Tokens</td>
                <td className="p-3 text-right text-slate-400">100 tokens (10% of pool)</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="p-3 text-slate-300">Pool Trading Volume (24h)</td>
                <td className="p-3 text-right text-slate-400">$50,000</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="p-3 text-slate-300">Fees Collected (2%)</td>
                <td className="p-3 text-right text-slate-400">$1,000</td>
              </tr>
              <tr>
                <td className="p-3 text-slate-300 font-semibold">Your Earnings (10%)</td>
                <td className="p-3 text-right text-emerald-400 font-semibold">$100</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Market Resolution */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">
          <Target className="inline h-6 w-6 mr-2 text-emerald-400" />
          Market Resolution
        </h2>
        
        <p className="text-slate-300 mb-4">
          Markets resolve when the outcome is determined. Winning shares become worth $1 each, while losing shares become worthless.
        </p>

        <h3 className="text-xl font-semibold text-white mb-3">Resolution Process</h3>
        <CodeBlock
          language="text"
          code={`1. Market expires or event occurs
   ↓
2. Oracle verifies real-world outcome
   ↓
3. Market status set to 'resolved'
   ↓
4. Winning outcome determined (YES or NO)
   ↓
5. Users redeem winning shares for $1 each
   ↓
6. Pool distributes final payouts`}
        />

        <CodeBlock
          language="typescript"
          filename="market-resolution.ts"
          code={`// Market resolution example
async function resolveMarket(marketId: string, outcome: 'YES' | 'NO') {
  // 1. Verify oracle signature
  const oracleVerification = await verifyOracleData(marketId);
  
  // 2. Update market status
  await supabase
    .from('kalshchain_markets')
    .update({
      status: 'resolved',
      winning_outcome: outcome,
      resolved_at: new Date().toISOString()
    })
    .eq('id', marketId);
  
  // 3. Calculate payouts for all positions
  const positions = await getUserPositions(marketId);
  for (const position of positions) {
    if (position.outcome === outcome) {
      // Winning position: shares worth $1 each
      const payout = position.quantity * 1.0;
      await processPayout(position.userId, payout);
    }
    // Losing positions get nothing (shares worthless)
  }
  
  // 4. Distribute LP rewards
  await distributeLiquidityRewards(marketId);
}`}
        />
      </section>

      {/* Trading Fees */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">
          <DollarSign className="inline h-6 w-6 mr-2 text-yellow-400" />
          Trading Fees & Costs
        </h2>
        
        <p className="text-slate-300 mb-4">
          KalshChain charges a small fee on each trade to sustain the platform and reward liquidity providers.
        </p>

        <div className="not-prose mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-5 bg-slate-800/30 border-slate-700">
              <h4 className="font-semibold text-white mb-2">Trading Fee</h4>
              <div className="text-3xl font-bold text-indigo-400 mb-2">2%</div>
              <p className="text-sm text-slate-400">
                Applied to each buy or sell transaction. Goes to liquidity providers and platform treasury.
              </p>
            </Card>
            <Card className="p-5 bg-slate-800/30 border-slate-700">
              <h4 className="font-semibold text-white mb-2">Blockchain Fee</h4>
              <div className="text-3xl font-bold text-purple-400 mb-2">~$0.001</div>
              <p className="text-sm text-slate-400">
                Solana network fees are extremely low, typically under 0.001 SOL per transaction.
              </p>
            </Card>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-white mb-3">Fee Calculation Example</h3>
        <CodeBlock
          language="typescript"
          code={`// Calculate total cost including fees
function calculateTotalCost(
  quantity: number,
  sharePrice: number,
  feeRate: number = 0.02
): { baseCost: number; fee: number; total: number } {
  const baseCost = quantity * sharePrice;
  const fee = baseCost * feeRate;
  const total = baseCost + fee;
  
  return { baseCost, fee, total };
}

// Example: Buy 100 YES shares at 0.65 cents each
const cost = calculateTotalCost(100, 0.65);
// Result: {
//   baseCost: 65,    // 100 * 0.65
//   fee: 1.30,       // 65 * 0.02
//   total: 66.30     // 65 + 1.30
// }`}
        />
      </section>

      {/* Next Steps */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Understanding More</h2>
        <p className="text-slate-300 mb-4">
          Ready to dive deeper into specific topics?
        </p>
        <ul className="space-y-2">
          <li>
            <a href="/docs/trading-engine" className="text-indigo-400 hover:text-indigo-300">
              Trading Engine - Advanced AMM mechanics
            </a>
          </li>
          <li>
            <a href="/docs/smart-contracts" className="text-indigo-400 hover:text-indigo-300">
              Smart Contracts - On-chain implementation details
            </a>
          </li>
          <li>
            <a href="/docs/guides/trading" className="text-indigo-400 hover:text-indigo-300">
              Trading Guide - Step-by-step trading tutorial
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
