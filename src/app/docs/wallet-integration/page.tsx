// demerzels-lab/kalshchain/KalshChain-237051255d46360ee0eab8d0278534895dc525cf/src/app/docs/wallet-integration/page.tsx
import { CodeBlock } from '@/components/docs/CodeBlock';
import { Card } from '@/components/ui/card';
import { Wallet, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function WalletIntegrationPage() {
  return (
    <div className="prose max-w-none">
      {/* Inverted text color and cyan accent */}
      <h1 className="text-4xl font-bold text-slate-900 mb-4 flex items-center gap-3">
        <Wallet className="h-8 w-8 text-cyan-primary-600" />
        Wallet Integration
      </h1>
      <p className="text-lg text-slate-600 mb-8">
        Guide to integrating Solana wallets for interacting with KalshChain's smart contracts.
      </p>

      {/* Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
        <p className="text-slate-700 mb-4">
          KalshChain supports all Solana wallets compatible with the <code className="text-cyan-primary-600 font-mono">@solana/wallet-adapter-react</code> standard, including Phantom, Solflare, Backpack, and others.
        </p>

        {/* Updated card styling for light theme and cyan accent */}
        <Card className="p-6 transition-all hover:shadow-cyan-primary-500/10 hover:border-cyan-primary-400">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">Supported Wallets</h3>
          <ul className="grid grid-cols-2 gap-3 text-slate-700 list-none p-0 m-0">
            <li className="flex items-center gap-2">
              <span className="text-cyan-primary-600">✓</span> Phantom
            </li>
            <li className="flex items-center gap-2">
              <span className="text-cyan-primary-600">✓</span> Solflare
            </li>
            <li className="flex items-center gap-2">
              <span className="text-cyan-primary-600">✓</span> Backpack
            </li>
            <li className="flex items-center gap-2">
              <span className="text-cyan-primary-600">✓</span> Glow
            </li>
            <li className="flex items-center gap-2">
              <span className="text-cyan-primary-600">✓</span> Slope
            </li>
            <li className="flex items-center gap-2">
              <span className="text-cyan-primary-600">✓</span> Ledger
            </li>
          </ul>
        </Card>
      </section>

      {/* Installation */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Installation</h2>
        <p className="text-slate-700 mb-4">
          Install the necessary dependencies for the wallet adapter components:
        </p>
        <CodeBlock
          language="bash"
          code={`pnpm install @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-base`}
        />
      </section>

      {/* Wallet Connection */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Wallet Connection</h2>
        <p className="text-slate-700 mb-4">
          The main connection is handled by wrapping the app in a <code className="text-cyan-primary-600 font-mono">WalletProvider</code> (see <code className="text-cyan-primary-600 font-mono">src/providers/WalletProvider.tsx</code>).
        </p>
        <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Connect Button Component</h3>
        <CodeBlock language="typescript" code={`'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export function WalletConnectButton() {
  // Uses the global button styles set by the light theme refactor
  return (
    <WalletMultiButton className="!bg-cyan-primary-600 hover:!bg-cyan-primary-700 !rounded-lg" />
  );
}

// Custom connect button example
export function CustomWalletButton() {
  const { wallet, connect, disconnect, connecting, connected } = useWallet();
  
  const handleClick = () => {
    if (connected) {
      disconnect();
    } else if (wallet) {
      connect();
    }
  };
  
  return (
    <button
      onClick={handleClick}
      disabled={connecting}
      // Cyan-primary button styling
      className="px-6 py-3 bg-cyan-primary-600 hover:bg-cyan-primary-700 
                 rounded-lg font-semibold text-white transition-colors
                 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {connecting && 'Connecting...'}
      {connected && 'Disconnect'}
      {!connecting && !connected && 'Connect Wallet'}
    </button>
  );
}`} />
      </section>

      {/* Transaction Signing */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Transaction Signing</h2>
        <p className="text-slate-700">
          To execute trades, you use the <code className="text-cyan-primary-600 font-mono">signTransaction</code> function from the <code className="text-cyan-primary-600 font-mono">useWallet</code> hook.
        </p>
      </section>

      {/* Next Steps */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Next Steps</h2>
        <ul className='space-y-2'>
          <li>
            <Link href="/docs/security" className='text-cyan-primary-600 hover:text-cyan-primary-700 flex items-center'>
              <ArrowRight className='h-4 w-4 mr-2' /> Security - Learn how your assets are protected
            </Link>
          </li>
          <li>
            <Link href="/docs/faq" className='text-cyan-primary-600 hover:text-cyan-primary-700 flex items-center'>
              <ArrowRight className='h-4 w-4 mr-2' /> FAQ - Find answers to common questions
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}