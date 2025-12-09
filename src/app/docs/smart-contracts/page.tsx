// demerzels-lab/kalshchain/KalshChain-237051255d46360ee0eab8d0278534895dc525cf/src/app/docs/smart-contracts/page.tsx
import { CodeBlock } from '@/components/docs/CodeBlock';
import { Card } from '@/components/ui/card';
import { FileText, Cpu, CheckCircle } from 'lucide-react';

export default function SmartContractsPage() {
  return (
    <div className="prose max-w-none">
      {/* Inverted text color and cyan accent */}
      <h1 className="text-4xl font-bold text-slate-900 mb-4 flex items-center gap-3">
        <FileText className="h-8 w-8 text-cyan-primary-600" />
        Smart Contracts
      </h1>
      <p className="text-lg text-slate-600 mb-8">
        The core logic of KalshChain is secured by three primary Solana programs (smart contracts).
      </p>

      {/* Program Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Program Overview</h2>
        <p className="text-slate-700 mb-6">
          Each program handles a distinct, critical function to ensure security and modularity.
        </p>
        <div className="grid gap-4 not-prose mb-6">
          {/* Card 1: Market Program */}
          <Card className="p-5 transition-all hover:shadow-cyan-primary-500/10 hover:border-cyan-primary-400">
            <h4 className="font-semibold text-slate-900 mb-2">Market Program</h4>
            <p className="text-sm text-slate-600">
              Handles market creation, resolution, and lifecycle management. It defines the event, expiry, and outcome.
            </p>
            <code className="text-xs text-cyan-primary-600 mt-2 block font-mono">Address: KaLsH...MkT1</code>
          </Card>

          {/* Card 2: AMM Program */}
          <Card className="p-5 transition-all hover:shadow-cyan-primary-500/10 hover:border-cyan-primary-400">
            <h4 className="font-semibold text-slate-900 mb-2">AMM Program</h4>
            <p className="text-sm text-slate-600">
              Automated Market Maker for liquidity pools and trade execution, implementing the CPMM formula.
            </p>
            <code className="text-xs text-cyan-primary-600 mt-2 block font-mono">Address: KaLsH...AMM2</code>
          </Card>

          {/* Card 3: Position Program */}
          <Card className="p-5 transition-all hover:shadow-cyan-primary-500/10 hover:border-cyan-primary-400">
            <h4 className="font-semibold text-slate-900 mb-2">Position Program</h4>
            <p className="text-sm text-slate-600">
              Manages user positions, claims, and profit/loss calculations post-settlement.
            </p>
            <code className="text-xs text-cyan-primary-600 mt-2 block font-mono">Address: KaLsH...POS3</code>
          </Card>
        </div>
      </section>

      {/* Account Structure */}
      <section id="architecture" className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Account Structure</h2>
        <p className="text-slate-700 mb-6">
          The following structure defines the data accounts used by the programs:
        </p>
        <CodeBlock
          language="rust"
          filename="MarketAccount.rs"
          code={`#[account]
pub struct MarketAccount {
    pub creator: Pubkey,
    pub token_mint: Pubkey,
    pub yes_vault: Pubkey,
    pub no_vault: Pubkey,
    pub title: String,
    pub expiration_date: i64,
    pub is_resolved: bool,
    pub winning_outcome: u8, // 1 for YES, 0 for NO
}`}
        />
      </section>

      {/* AMM Implementation */}
      <section id="amm" className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">AMM Implementation</h2>

        <p className="text-slate-700 mb-6">
          KalshChain uses a Constant Product Market Maker (CPMM) with the formula <code className="text-cyan-primary-600 font-mono">x * y = k</code> where:
        </p>

        <ul className="space-y-2 text-slate-700 mb-6 list-disc list-inside">
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span className="text-slate-700"><code className="text-cyan-primary-600 font-mono">x</code> = YES share reserves</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span className="text-slate-700"><code className="text-cyan-primary-600 font-mono">y</code> = NO share reserves</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span className="text-slate-700"><code className="text-cyan-primary-600 font-mono">k</code> = constant product (derived from initial liquidity)</span>
          </li>
        </ul>
      </section>
    </div>
  );
}