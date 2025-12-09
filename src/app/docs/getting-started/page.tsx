// demerzels-lab/kalshchain/KalshChain-237051255d46360ee0eab8d0278534895dc525cf/src/app/docs/getting-started/page.tsx
import { CodeBlock } from '@/components/docs/CodeBlock';
import { ArrowRight, LayoutGrid, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function GettingStartedPage() {
  return (
    <div className="prose max-w-none">
      {/* Inverted text color and cyan accent */}
      <h1 className="text-4xl font-bold text-slate-900 mb-4 flex items-center gap-3">
        <LayoutGrid className="h-8 w-8 text-cyan-primary-600" />
        Getting Started
      </h1>
      <p className="text-lg text-slate-600 mb-8">
        A quick guide to setting up your environment, running the project locally, and making your first trade.
      </p>

      {/* Setup */}
      <section className="mb-12">
        {/* Inverted text color and cyan accent */}
        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <span className='text-cyan-primary-600'>1.</span> Local Setup
        </h2>
        
        <h3 className="text-xl font-semibold text-slate-900 mb-3">Prerequisites</h3>
        <ul className='text-slate-700 space-y-2'>
          <li>Node.js (v18+)</li>
          <li>pnpm (Recommended package manager)</li>
          <li>Docker (for Supabase emulation)</li>
          <li>A Solana wallet (e.g., Phantom)</li>
        </ul>

        <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Installation</h3>
        <p className="text-slate-700">
          Clone the repository and install dependencies:
        </p>
        <CodeBlock
          language="bash"
          code={`git clone https://github.com/kalshchain/kalshchain.git
cd kalshchain
pnpm install`}
        />

        <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Environment Variables</h3>
        <p className="text-slate-700">
          Create a <code className='text-cyan-primary-600'>.env.local</code> file and populate it with your Supabase credentials:
        </p>
        <CodeBlock
          language="bash"
          code={`NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
# Optional: Solana RPC Endpoint
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com`}
        />
      </section>

      {/* Running */}
      <section className="mb-12">
        {/* Inverted text color and cyan accent */}
        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <span className='text-cyan-primary-600'>2.</span> Run the Project
        </h2>
        <p className="text-slate-700">
          Start the development server and Supabase services.
        </p>

        <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Start Supabase</h3>
        <p className="text-slate-700">
          Using the Supabase CLI (if installed) or Docker:
        </p>
        <CodeBlock
          language="bash"
          code={`# Start all Supabase services locally
supabase start`}
        />
        <p className="text-slate-700 mt-4">
          After starting, update your <code className='text-cyan-primary-600'>.env.local</code> with the local Supabase URLs provided in the terminal output.
        </p>

        <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Run Next.js</h3>
        <CodeBlock
          language="bash"
          code={`pnpm run dev`}
        />
        <p className="text-slate-700 mt-4">
          The application will be accessible at <a href="http://localhost:3000" className='text-cyan-primary-600 hover:text-cyan-primary-700'>http://localhost:3000</a>.
        </p>
      </section>
      
      {/* First Trade */}
      <section className="mb-12">
        {/* Inverted text color and cyan accent */}
        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <span className='text-cyan-primary-600'>3.</span> Make Your First Trade
        </h2>
        <ol className='text-slate-700 space-y-4 list-decimal list-inside'>
          <li className='pl-2'>
            <span className='font-semibold'>Connect Wallet:</span> Click the "Connect Wallet" button and select your Solana wallet (e.g., Phantom).
          </li>
          <li className='pl-2'>
            <span className='font-semibold'>Find a Market:</span> Navigate to the <Link href="/explore" className='text-cyan-primary-600 hover:text-cyan-primary-700'>Explore</Link> page and select any active market.
          </li>
          <li className='pl-2'>
            <span className='font-semibold'>Trade:</span> Use the trading panel to choose 'BUY' or 'SELL', select 'YES' or 'NO' outcome, and enter a quantity.
          </li>
          <li className='pl-2'>
            <span className='font-semibold'>Confirm:</span> Review the trade details and approve the transaction in your wallet.
          </li>
        </ol>
        <div className='mt-8 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 flex items-start gap-3'>
            <CheckCircle className='h-5 w-5 flex-shrink-0 mt-0.5' />
            <p className='text-sm font-medium'>
                Congratulations! You've successfully initiated your first decentralized prediction market trade on KalshChain.
            </p>
        </div>
      </section>

      {/* Next Steps */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">What's Next?</h2>
        <ul className='space-y-2'>
          <li>
            <Link href="/docs/concepts" className='text-cyan-primary-600 hover:text-cyan-primary-700 flex items-center'>
              <ArrowRight className='h-4 w-4 mr-2' /> Understand the Core Concepts
            </Link>
          </li>
          <li>
            <Link href="/docs/architecture" className='text-cyan-primary-600 hover:text-cyan-primary-700 flex items-center'>
              <ArrowRight className='h-4 w-4 mr-2' /> Dive into the System Architecture
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}