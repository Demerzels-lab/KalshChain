// demerzels-lab/kalshchain/KalshChain-237051255d46360ee0eab8d0278534895dc525cf/src/app/docs/architecture/page.tsx
import { CodeBlock } from '@/components/docs/CodeBlock';
import { Card } from '@/components/ui/card';
import { Cpu, Shield, Database, Globe, Code, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ArchitecturePage() {
  return (
    <div className="prose max-w-none">
      {/* Inverted text color and cyan accent */}
      <h1 className="text-4xl font-bold text-slate-900 mb-4 flex items-center gap-3">
        <Cpu className="h-8 w-8 text-cyan-primary-600" />
        System Architecture
      </h1>
      <p className="text-lg text-slate-600 mb-8">
        KalshChain is built on a modern, decentralized three-layer architecture.
      </p>

      {/* High-Level Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">High-Level Architecture</h2>
        <p className="text-slate-700 mb-6">
          The platform integrates the high-speed Solana blockchain for core logic with performant web technologies for a smooth user experience.
        </p>
        
        <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Card 1: Blockchain Layer (Purple accent) */}
          <Card className="p-6 transition-all hover:shadow-purple-500/10 hover:border-purple-400">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
                <Shield className="h-5 w-5" />
              </div>
              <h4 className="font-semibold text-slate-900">Blockchain Layer</h4>
            </div>
            <p className="text-sm text-slate-600">
              Solana smart contracts handle market creation, trading execution, and settlement with cryptographic security.
            </p>
          </Card>

          {/* Card 2: Backend Services (Cyan-Primary accent) */}
          <Card className="p-6 transition-all hover:shadow-cyan-primary-500/10 hover:border-cyan-primary-400">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-lg bg-cyan-primary-500/10 text-cyan-primary-600 flex items-center justify-center">
                <Database className="h-5 w-5" />
              </div>
              <h4 className="font-semibold text-slate-900">Backend Services</h4>
            </div>
            <p className="text-sm text-slate-600">
              Supabase database, edge functions, and REST API provide fast data access and business logic processing.
            </p>
          </Card>

          {/* Card 3: Frontend Layer (Emerald accent) */}
          <Card className="p-6 transition-all hover:shadow-emerald-500/10 hover:border-emerald-400">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <Globe className="h-5 w-5" />
              </div>
              <h4 className="font-semibold text-slate-900">Frontend Layer</h4>
            </div>
            <p className="text-sm text-slate-600">
              Next.js React application with wallet integration delivers responsive user interface and real-time updates.
            </p>
          </Card>
        </div>
      </section>

      {/* Component Details */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Component Details</h2>
        
        <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-8">1. Frontend Application</h3>
        <p className="text-slate-700 mb-4">
          Built with Next.js 14 using App Router for optimal performance and SEO:
        </p>
        <ul className="space-y-2 text-slate-700">
          <li className="flex items-start gap-2">
            <span className="text-cyan-primary-600">•</span>
            <span><strong>Framework:</strong> Next.js 14 with TypeScript for type safety</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-primary-600">•</span>
            <span><strong>Styling:</strong> TailwindCSS with shadcn/ui component library</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-primary-600">•</span>
            <span><strong>State Management:</strong> React Context API and hooks</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-primary-600">•</span>
            <span><strong>Wallet Integration:</strong> Solana Wallet Adapter for Phantom, Solflare, etc.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-primary-600">•</span>
            <span><strong>Data Visualization:</strong> Recharts for market price charts</span>
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-8">2. Backend Services</h3>
        <p className="text-slate-700 mb-4">
          Supabase (PostgreSQL) is used for reliable and scalable data persistence:
        </p>
        <ul className="space-y-2 text-slate-700">
          <li className="flex items-start gap-2">
            <span className="text-cyan-primary-600">•</span>
            <span><strong>Database:</strong> PostgreSQL for market and trade metadata</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-primary-600">•</span>
            <span><strong>Realtime:</strong> Supabase Realtime for instant market data updates</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-primary-600">•</span>
            <span><strong>Authentication:</strong> Secure user authentication tied to Solana public keys</span>
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-8">3. Blockchain Layer</h3>
        <p className="text-slate-700 mb-4">
          Solana smart contracts implement core trading logic with on-chain verification:
        </p>
        <ul className="space-y-2 text-slate-700">
          <li className="flex items-start gap-2">
            <span className="text-cyan-primary-600">•</span>
            <span><strong>Market Program:</strong> Creates and manages prediction markets</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-primary-600">•</span>
            <span><strong>AMM Program:</strong> Executes trades using constant product formula</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-primary-600">•</span>
            <span><strong>Settlement Program:</strong> Resolves markets and distributes payouts</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-primary-600">•</span>
            <span><strong>Oracle Integration:</strong> Fetches real-world data for market resolution</span>
          </li>
        </ul>
      </section>

      {/* Scalability */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Scalability Design</h2>
        <p className="text-slate-700 mb-4">
          KalshChain leverages Solana's high throughput and its off-chain services to ensure stability and low latency:
        </p>
        <ul className="space-y-3 text-slate-700">
          <li className="flex items-start gap-2">
            <Code className="h-5 w-5 text-cyan-primary-600 flex-shrink-0 mt-1" />
            <div>
              <strong>Database Optimization:</strong> PostgreSQL with indexes on frequently queried fields, read replicas for heavy traffic
            </div>
          </li>
          <li className="flex items-start gap-2">
            <Code className="h-5 w-5 text-cyan-primary-600 flex-shrink-0 mt-1" />
            <div>
              <strong>Off-Chain Caching:</strong> Market metadata is fetched primarily from Supabase, reducing the load on the Solana RPC layer.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <Code className="h-5 w-5 text-cyan-primary-600 flex-shrink-0 mt-1" />
            <div>
              <strong>Solana Efficiency:</strong> Transaction batching and optimized instruction sets keep fees low and execution fast.
            </div>
          </li>
        </ul>
      </section>

      {/* Next Steps */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Next Steps</h2>
        <p className="text-slate-700 mb-4">
          Now that you understand the architecture, explore specific components:
        </p>
        <ul className="space-y-2">
          <li>
            <Link href="/docs/smart-contracts" className='text-cyan-primary-600 hover:text-cyan-primary-700 flex items-center'>
              <ArrowRight className='h-4 w-4 mr-2' /> Smart Contracts - Dive into on-chain programs
            </Link>
          </li>
          <li>
            <Link href="/docs/api" className='text-cyan-primary-600 hover:text-cyan-primary-700 flex items-center'>
              <ArrowRight className='h-4 w-4 mr-2' /> API Reference - Build with our REST API
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}