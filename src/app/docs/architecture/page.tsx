'use client';

import { CodeBlock } from '@/components/docs/CodeBlock';
import { Card } from '@/components/ui/card';
import { Cpu, Database, Zap, Shield, Globe, Code } from 'lucide-react';

export default function ArchitecturePage() {
  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold text-white mb-4">System Architecture</h1>
      <p className="text-xl text-slate-400 mb-8">
        Deep dive into KalshChain's technical architecture and system design principles.
      </p>

      {/* High-Level Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">
          <Cpu className="inline h-6 w-6 mr-2 text-indigo-400" />
          High-Level Architecture
        </h2>
        
        <p className="text-slate-300 mb-6">
          KalshChain is built on a three-tier architecture combining blockchain, backend services, and frontend applications:
        </p>

        <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 bg-slate-800/30 border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Shield className="h-5 w-5" />
              </div>
              <h4 className="font-semibold text-white">Blockchain Layer</h4>
            </div>
            <p className="text-sm text-slate-400">
              Solana smart contracts handle market creation, trading execution, and settlement with cryptographic security.
            </p>
          </Card>

          <Card className="p-6 bg-slate-800/30 border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <Database className="h-5 w-5" />
              </div>
              <h4 className="font-semibold text-white">Backend Services</h4>
            </div>
            <p className="text-sm text-slate-400">
              Supabase database, edge functions, and REST API provide fast data access and business logic processing.
            </p>
          </Card>

          <Card className="p-6 bg-slate-800/30 border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Globe className="h-5 w-5" />
              </div>
              <h4 className="font-semibold text-white">Frontend Layer</h4>
            </div>
            <p className="text-sm text-slate-400">
              Next.js React application with wallet integration delivers responsive user interface and real-time updates.
            </p>
          </Card>
        </div>

        <CodeBlock
          language="text"
          code={`┌─────────────────────────────────────────────────────────────┐
│                      Frontend Layer                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Next.js App │  │ Wallet Plugin│  │  WebSocket   │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
└─────────┼──────────────────┼──────────────────┼─────────────┘
          │                  │                  │
┌─────────┼──────────────────┼──────────────────┼─────────────┐
│         │     Backend Services Layer          │             │
│  ┌──────▼───────┐  ┌──────▼───────┐  ┌──────▼───────┐      │
│  │  REST API    │  │ Edge Functions│  │  Real-time   │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │             │
│  ┌──────▼──────────────────▼──────────────────▼───────┐    │
│  │            Supabase Database (PostgreSQL)           │    │
│  └─────────────────────────────────────────────────────┘    │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                    Blockchain Layer                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │Solana Program│  │  AMM Engine  │  │   Oracles    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘`}
        />
      </section>

      {/* Component Details */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Component Details</h2>
        
        <h3 className="text-xl font-semibold text-white mb-3 mt-8">1. Frontend Application</h3>
        <p className="text-slate-300 mb-4">
          Built with Next.js 14 using App Router for optimal performance and SEO:
        </p>
        <ul className="space-y-2 text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-indigo-400">•</span>
            <span><strong>Framework:</strong> Next.js 14 with TypeScript for type safety</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-400">•</span>
            <span><strong>Styling:</strong> TailwindCSS with shadcn/ui component library</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-400">•</span>
            <span><strong>State Management:</strong> React Context API and hooks</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-400">•</span>
            <span><strong>Wallet Integration:</strong> Solana Wallet Adapter for Phantom, Solflare, etc.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-400">•</span>
            <span><strong>Data Visualization:</strong> Recharts for market price charts</span>
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-white mb-3 mt-8">2. Backend Services</h3>
        <p className="text-slate-300 mb-4">
          Supabase provides managed PostgreSQL database and serverless functions:
        </p>
        <CodeBlock
          language="typescript"
          filename="supabase-architecture.ts"
          code={`// Database Schema
export interface Market {
  id: string;
  title: string;
  category: string;
  yes_price: number;
  no_price: number;
  total_volume: number;
  liquidity: number;
  expiration_date: string;
  status: 'active' | 'resolved' | 'cancelled';
  is_kalshi: boolean;
}

export interface LiquidityPool {
  id: string;
  market_id: string;
  yes_reserve: number;
  no_reserve: number;
  k_constant: number;
  tvl: number;
  fee_rate: number;
}

export interface Trade {
  id: string;
  market_id: string;
  user_id: string;
  outcome: 'YES' | 'NO';
  side: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  total_cost: number;
  fee: number;
  tx_hash: string;
  status: 'pending' | 'confirmed' | 'failed';
}`}
        />

        <h3 className="text-xl font-semibold text-white mb-3 mt-8">3. Blockchain Layer</h3>
        <p className="text-slate-300 mb-4">
          Solana smart contracts implement core trading logic with on-chain verification:
        </p>
        <ul className="space-y-2 text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-indigo-400">•</span>
            <span><strong>Market Program:</strong> Creates and manages prediction markets</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-400">•</span>
            <span><strong>AMM Program:</strong> Executes trades using constant product formula</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-400">•</span>
            <span><strong>Settlement Program:</strong> Resolves markets and distributes payouts</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-400">•</span>
            <span><strong>Oracle Integration:</strong> Fetches real-world data for market resolution</span>
          </li>
        </ul>
      </section>

      {/* Data Flow */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">
          <Zap className="inline h-6 w-6 mr-2 text-yellow-400" />
          Data Flow
        </h2>
        
        <h3 className="text-xl font-semibold text-white mb-3">Trade Execution Flow</h3>
        <p className="text-slate-300 mb-4">
          Understanding how a trade moves through the system:
        </p>

        <CodeBlock
          language="text"
          code={`1. User initiates trade
   ├─> Frontend validates input
   └─> Wallet signs transaction

2. Transaction submitted to blockchain
   ├─> Solana program validates
   ├─> AMM calculates price impact
   └─> On-chain execution

3. Backend synchronization
   ├─> Listen for blockchain events
   ├─> Update database state
   └─> Recalculate pool reserves

4. Frontend updates
   ├─> Real-time price updates
   ├─> Position updates
   └─> Transaction history`}
        />

        <h3 className="text-xl font-semibold text-white mb-3 mt-8">Market Creation Flow</h3>
        <CodeBlock
          language="typescript"
          filename="market-creation-flow.ts"
          code={`// Step-by-step market creation process
async function createMarket(data: MarketInput) {
  // 1. Frontend validation
  validateMarketData(data);
  
  // 2. Wallet signature
  const signature = await wallet.signMessage(data);
  
  // 3. Deploy on-chain program account
  const programAccount = await deployMarketProgram({
    title: data.title,
    expirationDate: data.expirationDate,
    initialLiquidity: data.initialLiquidity
  });
  
  // 4. Create database record
  const market = await supabase
    .from('kalshchain_markets')
    .insert({
      id: programAccount.publicKey.toString(),
      ...data,
      status: 'active'
    })
    .select()
    .single();
  
  // 5. Initialize liquidity pool
  const pool = await createLiquidityPool({
    marketId: market.id,
    yesReserve: data.initialLiquidity / 2,
    noReserve: data.initialLiquidity / 2
  });
  
  return { market, pool };
}`}
        />
      </section>

      {/* Security Architecture */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">
          <Shield className="inline h-6 w-6 mr-2 text-emerald-400" />
          Security Architecture
        </h2>
        
        <p className="text-slate-300 mb-6">
          Multi-layered security approach protects user funds and data:
        </p>

        <div className="not-prose">
          <table className="w-full border border-slate-700">
            <thead>
              <tr className="bg-slate-800">
                <th className="p-3 text-left text-white border-b border-slate-700">Layer</th>
                <th className="p-3 text-left text-white border-b border-slate-700">Security Measures</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-700">
                <td className="p-3 text-slate-300">Frontend</td>
                <td className="p-3 text-slate-400">Input validation, XSS protection, HTTPS only</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="p-3 text-slate-300">Backend</td>
                <td className="p-3 text-slate-400">API rate limiting, CORS policies, SQL injection prevention</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="p-3 text-slate-300">Blockchain</td>
                <td className="p-3 text-slate-400">Smart contract audits, multi-sig admin, program upgrades</td>
              </tr>
              <tr>
                <td className="p-3 text-slate-300">Wallet</td>
                <td className="p-3 text-slate-400">Non-custodial design, transaction signing, seed phrase security</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Scalability */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Scalability Design</h2>
        
        <p className="text-slate-300 mb-4">
          KalshChain is designed to scale horizontally and vertically:
        </p>

        <ul className="space-y-3 text-slate-300">
          <li className="flex items-start gap-2">
            <Code className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-1" />
            <div>
              <strong>Database Optimization:</strong> PostgreSQL with indexes on frequently queried fields, read replicas for heavy traffic
            </div>
          </li>
          <li className="flex items-start gap-2">
            <Zap className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <strong>Edge Functions:</strong> Serverless compute scales automatically with demand
            </div>
          </li>
          <li className="flex items-start gap-2">
            <Globe className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-1" />
            <div>
              <strong>CDN Distribution:</strong> Static assets served via global CDN for fast loading
            </div>
          </li>
          <li className="flex items-start gap-2">
            <Shield className="h-5 w-5 text-purple-400 flex-shrink-0 mt-1" />
            <div>
              <strong>Blockchain Performance:</strong> Solana handles 65,000 TPS with sub-second finality
            </div>
          </li>
        </ul>
      </section>

      {/* Next Steps */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Next Steps</h2>
        <p className="text-slate-300 mb-4">
          Now that you understand the architecture, explore specific components:
        </p>
        <ul className="space-y-2">
          <li>
            <a href="/docs/smart-contracts" className="text-indigo-400 hover:text-indigo-300">
              Smart Contracts - Dive into on-chain programs
            </a>
          </li>
          <li>
            <a href="/docs/api" className="text-indigo-400 hover:text-indigo-300">
              API Reference - Build with our REST API
            </a>
          </li>
          <li>
            <a href="/docs/security" className="text-indigo-400 hover:text-indigo-300">
              Security - Learn about our security practices
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
