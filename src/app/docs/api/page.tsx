// demerzels-lab/kalshchain/KalshChain-237051255d46360ee0eab8d0278534895dc525cf/src/app/docs/api/page.tsx
import { CodeBlock } from '@/components/docs/CodeBlock';
import { ArrowRight, FileText } from 'lucide-react';
import Link from 'next/link';

export default function ApiPage() {
  return (
    <div className="prose max-w-none">
      {/* Inverted text color and cyan accent */}
      <h1 className="text-4xl font-bold text-slate-900 mb-4 flex items-center gap-3">
        <FileText className="h-8 w-8 text-cyan-primary-600" />
        API Reference
      </h1>
      <p className="text-lg text-slate-600 mb-8">
        KalshChain provides a read-only REST API (powered by Supabase) for fast access to market data.
      </p>

      {/* Base URL */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Base URL</h2>
        <p className="text-slate-700">
          All API requests should be made to the following base URL:
        </p>
        <CodeBlock
          language="text"
          code={`https://[YOUR_SUPABASE_URL]/rest/v1`}
        />
        <p className="text-slate-700 mt-4">
          Authentication is required via the <code className='text-cyan-primary-600 font-mono'>apiKey</code> header.
        </p>
      </section>

      {/* Endpoints */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Endpoints</h2>

        <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">GET /kalshchain_markets</h3>
        <p className="text-slate-700">
          Retrieves a list of all prediction markets, including title, reserves, and current prices.
        </p>
        <CodeBlock
          language="bash"
          code={`curl -X GET 'https://[URL]/rest/v1/kalshchain_markets?select=*' \\
  -H 'apikey: YOUR_ANON_KEY' \\
  -H 'Authorization: Bearer YOUR_ANON_KEY'`}
        />

        <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">GET /kalshchain_markets?id=eq.{id}</h3>
        <p className="text-slate-700">
          Retrieves a single market by its unique ID.
        </p>
        <CodeBlock
          language="bash"
          code={`curl -X GET 'https://[URL]/rest/v1/kalshchain_markets?id=eq.1' \\
  -H 'apikey: YOUR_ANON_KEY' \\
  -H 'Authorization: Bearer YOUR_ANON_KEY'`}
        />

        <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">GET /kalshchain_trades</h3>
        <p className="text-slate-700">
          Retrieves the history of all executed trades. Supports filtering by <code className='text-cyan-primary-600 font-mono'>user_id</code> and <code className='text-cyan-primary-600 font-mono'>market_id</code>.
        </p>
        <CodeBlock
          language="bash"
          code={`curl -X GET 'https://[URL]/rest/v1/kalshchain_trades?user_id=eq.[pubkey]' \\
  -H 'apikey: YOUR_ANON_KEY' \\
  -H 'Authorization: Bearer YOUR_ANON_KEY'`}
        />
      </section>

      {/* Realtime API */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Realtime API</h2>
        <p className="text-slate-700">
          The Supabase Realtime API allows you to subscribe to database changes for instant updates on new trades and market price changes.
        </p>
        <CodeBlock
          language="javascript"
          filename="realtime.js"
          code={`// Example of subscribing to new trade insertions
supabase
  .channel('trades')
  .on('postgres_changes', { 
    event: 'INSERT', 
    schema: 'public', 
    table: 'kalshchain_trades' 
  }, payload => {
    console.log('New Trade:', payload.new)
  })
  .subscribe()`}
        />
      </section>

      {/* Next Steps */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Next Steps</h2>
        <ul className='space-y-2'>
          <li>
            <Link href="/docs/wallet-integration" className='text-cyan-primary-600 hover:text-cyan-primary-700 flex items-center'>
              <ArrowRight className='h-4 w-4 mr-2' /> Wallet Integration - Connect to the front-end
            </Link>
          </li>
          <li>
            <Link href="/docs/security" className='text-cyan-primary-600 hover:text-cyan-primary-700 flex items-center'>
              <ArrowRight className='h-4 w-4 mr-2' /> Security - Learn how your data is protected
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}