// demerzels-lab/kalshchain/KalshChain-237051255d46360ee0eab8d0278534895dc525cf/src/app/docs/security/page.tsx
import { Card } from '@/components/ui/card';
import { Shield, Lock, Code, Server, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SecurityPage() {
  return (
    <div className="prose max-w-none">
      {/* Inverted text color and cyan accent */}
      <h1 className="text-4xl font-bold text-slate-900 mb-4 flex items-center gap-3">
        <Shield className="h-8 w-8 text-cyan-primary-600" />
        Security Model
      </h1>
      <p className="text-lg text-slate-600 mb-8">
        KalshChain prioritizes user security and fund safety through decentralization and rigorous practices.
      </p>

      {/* Core Security Principles */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Core Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose">
          {/* Card 1: Non-Custodial (Cyan-primary accent) */}
          <Link href="/docs/wallet-integration">
            <Card className="h-full p-5 transition-all hover:shadow-cyan-primary-500/10 hover:border-cyan-primary-400">
              <div className="flex items-center gap-3 mb-2">
                <Lock className="h-5 w-5 text-cyan-primary-600" />
                <h4 className="font-semibold text-slate-900">Non-Custodial</h4>
              </div>
              <p className="text-sm text-slate-600">
                We never hold your funds. All assets remain in your personal Solana wallet, controlled only by you.
              </p>
            </Card>
          </Link>

          {/* Card 2: On-Chain Logic (Cyan-primary accent) */}
          <Link href="/docs/smart-contracts">
            <Card className="h-full p-5 transition-all hover:shadow-cyan-primary-500/10 hover:border-cyan-primary-400">
              <div className="flex items-center gap-3 mb-2">
                <Code className="h-5 w-5 text-cyan-primary-600" />
                <h4 className="font-semibold text-slate-900">On-Chain Logic</h4>
              </div>
              <p className="text-sm text-slate-600">
                Market creation, trading, and settlement are governed by public, audited smart contracts.
              </p>
            </Card>
          </Link>

          {/* Card 3: Transparent Data (Cyan-primary accent) */}
          <Link href="/docs/api">
            <Card className="h-full p-5 transition-all hover:shadow-cyan-primary-500/10 hover:border-cyan-primary-400">
              <div className="flex items-center gap-3 mb-2">
                <Server className="h-5 w-5 text-cyan-primary-600" />
                <h4 className="font-semibold text-slate-900">Transparent Data</h4>
              </div>
              <p className="text-sm text-slate-600">
                All trade data is recorded on the Solana ledger, ensuring verifiable market activity.
              </p>
            </Card>
          </Link>
        </div>
      </section>

      {/* Smart Contract Audit (Placeholder) */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Smart Contract Audit</h2>
        <p className="text-slate-700 mb-4">
          The KalshChain smart contracts have been submitted for formal audit by [Auditor Name] to ensure resistance against common exploits like re-entrancy, overflow, and logic errors.
        </p>
        {/* Updated card styling for light theme success/alert */}
        <Card className="p-5 bg-emerald-500/10 border-emerald-500/30">
          <h3 className="font-semibold text-emerald-700">Audit Status: In Progress</h3>
          <p className="text-sm text-emerald-600 mt-1">
            The full audit report will be published here upon completion.
          </p>
        </Card>
      </section>

      {/* Best Practices for Users */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Best Practices for Users</h2>
        <ul className='text-slate-700 space-y-2 list-disc list-inside'>
          <li>
            <strong>Verify URLs:</strong> Always check that you are on the correct <code className="text-cyan-primary-600 font-mono">kalshchain.com</code> domain.
          </li>
          <li>
            <strong>Use Hardware Wallets:</strong> For maximum security, use a Ledger or Trezor device to sign transactions.
          </li>
          <li>
            <strong>Review Transactions:</strong> Carefully inspect the details (amount, recipient) of every transaction in your wallet before signing.
          </li>
        </ul>
      </section>

      {/* Next Steps */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Next Steps</h2>
        <ul className='space-y-2'>
          <li>
            {/* Cyan-primary link color */}
            <Link href="/docs/smart-contracts" className='text-cyan-primary-600 hover:text-cyan-primary-700 flex items-center'>
              <ArrowRight className='h-4 w-4 mr-2' /> Smart Contracts - See the code that secures your funds
            </Link>
          </li>
          <li>
            {/* Cyan-primary link color */}
            <Link href="/docs/faq" className='text-cyan-primary-600 hover:text-cyan-primary-700 flex items-center'>
              <ArrowRight className='h-4 w-4 mr-2' /> FAQ - Address your security concerns
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}