'use client';

import { CodeBlock } from '@/components/docs/CodeBlock';
import { Card } from '@/components/ui/card';
import { Code, Database, Key, Zap, AlertTriangle } from 'lucide-react';

export default function APIReferencePage() {
  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold text-white mb-4">API Reference</h1>
      <p className="text-xl text-slate-400 mb-8">
        Complete reference documentation untuk KalshChain API. Integrate prediction markets ke dalam aplikasi Anda dengan REST API dan Solana smart contracts.
      </p>

      {/* API Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Code className="h-6 w-6 text-indigo-400" />
          API Overview
        </h2>

        <p className="text-slate-300 mb-6">
          KalshChain menyediakan dua primary interfaces untuk integration:
        </p>

        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="p-6 bg-slate-800/30 border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <Database className="h-6 w-6 text-indigo-400" />
              <h4 className="font-semibold text-white">REST API</h4>
            </div>
            <p className="text-sm text-slate-400 mb-3">
              HTTP endpoints untuk fetch market data, user positions, dan platform analytics.
            </p>
            <div className="text-xs text-slate-500">
              <p>• Read-only access</p>
              <p>• No authentication required untuk public data</p>
              <p>• Rate limit: 100 requests/minute</p>
            </div>
          </Card>

          <Card className="p-6 bg-slate-800/30 border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="h-6 w-6 text-purple-400" />
              <h4 className="font-semibold text-white">Solana Smart Contracts</h4>
            </div>
            <p className="text-sm text-slate-400 mb-3">
              On-chain programs untuk trading, market creation, dan settlement.
            </p>
            <div className="text-xs text-slate-500">
              <p>• Write operations (trades, creates)</p>
              <p>• Requires wallet connection</p>
              <p>• Gas fees apply (≈0.00025 SOL/tx)</p>
            </div>
          </Card>
        </div>

        <div className="not-prose">
          <Card className="p-4 bg-blue-900/20 border-blue-600/30">
            <div className="flex gap-3">
              <Key className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-300 font-semibold mb-1">Base URL</p>
                <code className="text-blue-200/80 text-sm">https://h4cmrpggrs7x.space.minimax.io/api</code>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Authentication */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Authentication</h2>

        <p className="text-slate-300 mb-4">
          Most API endpoints tidak memerlukan authentication. Untuk operations yang modify state (trading, market creation), Anda perlu connect Solana wallet.
        </p>

        <h4 className="text-lg font-semibold text-white mb-3">Wallet Connection</h4>
        
        <CodeBlock
          language="typescript"
          code={`import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey } from '@solana/web3.js';

// Connect wallet
const { publicKey, signTransaction, connected } = useWallet();

// Verify connection
if (connected && publicKey) {
  console.log('Connected wallet:', publicKey.toBase58());
}

// Sign message for authentication proof
const signMessage = async (message: string) => {
  if (!publicKey || !signTransaction) {
    throw new Error('Wallet not connected');
  }
  
  const encodedMessage = new TextEncoder().encode(message);
  const signature = await signTransaction(encodedMessage);
  
  return {
    publicKey: publicKey.toBase58(),
    signature: Buffer.from(signature).toString('base64')
  };
};`}
        />
      </section>

      {/* Markets API */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Markets API</h2>

        {/* GET /api/markets */}
        <div className="not-prose mb-8">
          <Card className="p-6 bg-slate-800/30 border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded bg-green-600/20 text-green-400 text-sm font-mono">GET</span>
              <code className="text-white font-mono">/api/markets</code>
            </div>
            <p className="text-slate-300 text-sm mb-4">Fetch all markets dengan optional filters.</p>
            
            <h5 className="font-semibold text-white mb-2">Query Parameters</h5>
            <div className="bg-slate-900/50 rounded-lg p-4 mb-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-400 border-b border-slate-700">
                    <th className="pb-2">Parameter</th>
                    <th className="pb-2">Type</th>
                    <th className="pb-2">Description</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-800">
                    <td className="py-2"><code>category</code></td>
                    <td>string</td>
                    <td>Filter by category (optional)</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2"><code>status</code></td>
                    <td>string</td>
                    <td>&quot;active&quot;, &quot;closed&quot;, atau &quot;resolved&quot;</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2"><code>limit</code></td>
                    <td>number</td>
                    <td>Results per page (default: 20)</td>
                  </tr>
                  <tr>
                    <td className="py-2"><code>offset</code></td>
                    <td>number</td>
                    <td>Pagination offset (default: 0)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h5 className="font-semibold text-white mb-2">Example Request</h5>
            <CodeBlock
              language="typescript"
              code={`// Fetch active crypto markets
const response = await fetch(
  '/api/markets?category=Crypto&status=active&limit=10'
);
const markets = await response.json();

console.log(markets);
// [
//   {
//     id: "btc-100k-2025",
//     title: "Will Bitcoin reach $100K by end of 2025?",
//     category: "Crypto",
//     yesPrice: 0.65,
//     noPrice: 0.35,
//     volume: 125000,
//     liquidity: 50000,
//     status: "active",
//     closeDate: "2025-12-31T23:59:59Z"
//   },
//   // ...
// ]`}
            />
          </Card>
        </div>

        {/* GET /api/markets/:id */}
        <div className="not-prose mb-8">
          <Card className="p-6 bg-slate-800/30 border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded bg-green-600/20 text-green-400 text-sm font-mono">GET</span>
              <code className="text-white font-mono">/api/markets/:id</code>
            </div>
            <p className="text-slate-300 text-sm mb-4">Fetch detailed information untuk specific market.</p>
            
            <h5 className="font-semibold text-white mb-2">Response Schema</h5>
            <CodeBlock
              language="typescript"
              code={`interface MarketDetail {
  id: string;
  title: string;
  description: string;
  category: string;
  yesPrice: number;        // 0.00 - 1.00
  noPrice: number;         // 1 - yesPrice
  volume: number;          // Total volume traded
  liquidity: number;       // Available liquidity
  status: 'active' | 'closed' | 'resolved';
  closeDate: string;       // ISO 8601 timestamp
  createdAt: string;
  resolvedAt?: string;
  winningOutcome?: 'YES' | 'NO';
  
  // Price history
  priceHistory: {
    timestamp: string;
    yesPrice: number;
    volume: number;
  }[];
  
  // Trading statistics
  stats: {
    traders: number;
    trades: number;
    highPrice: number;
    lowPrice: number;
    avgPrice: number;
  };
}

// Example request
const market = await fetch('/api/markets/btc-100k-2025')
  .then(res => res.json());`}
            />
          </Card>
        </div>

        {/* POST /api/markets */}
        <div className="not-prose mb-8">
          <Card className="p-6 bg-slate-800/30 border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded bg-yellow-600/20 text-yellow-400 text-sm font-mono">POST</span>
              <code className="text-white font-mono">/api/markets</code>
            </div>
            <p className="text-slate-300 text-sm mb-4">Create new prediction market. Requires wallet connection.</p>
            
            <h5 className="font-semibold text-white mb-2">Request Body</h5>
            <CodeBlock
              language="typescript"
              code={`interface CreateMarketRequest {
  title: string;              // Market question
  description: string;        // Detailed description
  category: string;           // Market category
  closeDate: string;          // ISO 8601 timestamp
  initialLiquidity: number;   // SOL to provide as liquidity
  resolutionSource?: string;  // URL or description of oracle
}

// Example: Create market
const createMarket = async () => {
  const response = await fetch('/api/markets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: "Will ETH reach $5K by June 2025?",
      description: "Market resolves YES if Ethereum price reaches $5,000...",
      category: "Crypto",
      closeDate: "2025-06-30T23:59:59Z",
      initialLiquidity: 100, // 100 SOL
      resolutionSource: "CoinGecko API"
    })
  });
  
  const market = await response.json();
  return market.id;
};`}
            />
          </Card>
        </div>
      </section>

      {/* Trading API */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Trading API</h2>

        {/* POST /api/trade */}
        <div className="not-prose mb-8">
          <Card className="p-6 bg-slate-800/30 border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded bg-yellow-600/20 text-yellow-400 text-sm font-mono">POST</span>
              <code className="text-white font-mono">/api/trade</code>
            </div>
            <p className="text-slate-300 text-sm mb-4">Execute trade (buy atau sell shares). Requires wallet signature.</p>
            
            <h5 className="font-semibold text-white mb-2">Request Body</h5>
            <CodeBlock
              language="typescript"
              code={`interface TradeRequest {
  marketId: string;
  outcome: 'YES' | 'NO';
  side: 'BUY' | 'SELL';
  quantity: number;
  maxSlippage?: number;  // Default: 0.01 (1%)
}

// Example: Buy YES shares
const executeTrade = async (marketId: string) => {
  const response = await fetch('/api/trade', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      marketId: marketId,
      outcome: 'YES',
      side: 'BUY',
      quantity: 100,
      maxSlippage: 0.02  // 2% max slippage
    })
  });
  
  const result = await response.json();
  
  // Response
  // {
  //   transactionId: "5zJk3...",
  //   marketId: "btc-100k-2025",
  //   outcome: "YES",
  //   quantity: 100,
  //   avgPrice: 0.6523,
  //   totalCost: 65.23,
  //   fees: 0.13,
  //   timestamp: "2025-12-08T20:00:00Z"
  // }
  
  return result;
};`}
            />
          </Card>
        </div>

        {/* GET /api/quote */}
        <div className="not-prose mb-8">
          <Card className="p-6 bg-slate-800/30 border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded bg-green-600/20 text-green-400 text-sm font-mono">GET</span>
              <code className="text-white font-mono">/api/quote</code>
            </div>
            <p className="text-slate-300 text-sm mb-4">Get price quote untuk trade tanpa executing.</p>
            
            <CodeBlock
              language="typescript"
              code={`// Get quote before trading
const getQuote = async (
  marketId: string,
  outcome: 'YES' | 'NO',
  quantity: number
) => {
  const params = new URLSearchParams({
    marketId,
    outcome,
    quantity: quantity.toString()
  });
  
  const response = await fetch(\`/api/quote?\${params}\`);
  const quote = await response.json();
  
  // {
  //   marketId: "btc-100k-2025",
  //   outcome: "YES",
  //   quantity: 100,
  //   estimatedPrice: 0.6523,
  //   totalCost: 65.23,
  //   fees: 0.13,
  //   priceImpact: 0.003,  // 0.3% price impact
  //   expiresAt: "2025-12-08T20:05:00Z"
  // }
  
  return quote;
};`}
            />
          </Card>
        </div>
      </section>

      {/* Positions API */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Positions API</h2>

        {/* GET /api/positions/:walletAddress */}
        <div className="not-prose mb-8">
          <Card className="p-6 bg-slate-800/30 border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded bg-green-600/20 text-green-400 text-sm font-mono">GET</span>
              <code className="text-white font-mono">/api/positions/:walletAddress</code>
            </div>
            <p className="text-slate-300 text-sm mb-4">Fetch all positions untuk specific wallet.</p>
            
            <CodeBlock
              language="typescript"
              code={`interface Position {
  id: string;
  marketId: string;
  marketTitle: string;
  outcome: 'YES' | 'NO';
  shares: number;
  avgPurchasePrice: number;
  currentPrice: number;
  value: number;
  profitLoss: number;
  profitLossPercent: number;
  status: 'open' | 'closed';
}

// Fetch positions
const getPositions = async (walletAddress: string) => {
  const response = await fetch(\`/api/positions/\${walletAddress}\`);
  const positions = await response.json();
  
  // Calculate portfolio stats
  const totalValue = positions.reduce((sum, p) => sum + p.value, 0);
  const totalPL = positions.reduce((sum, p) => sum + p.profitLoss, 0);
  
  return { positions, totalValue, totalPL };
};`}
            />
          </Card>
        </div>
      </section>

      {/* Analytics API */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Analytics API</h2>

        {/* GET /api/analytics/platform */}
        <div className="not-prose mb-8">
          <Card className="p-6 bg-slate-800/30 border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded bg-green-600/20 text-green-400 text-sm font-mono">GET</span>
              <code className="text-white font-mono">/api/analytics/platform</code>
            </div>
            <p className="text-slate-300 text-sm mb-4">Get platform-wide statistics.</p>
            
            <CodeBlock
              language="typescript"
              code={`interface PlatformAnalytics {
  totalVolume: number;
  totalMarkets: number;
  activeMarkets: number;
  totalTraders: number;
  totalTrades: number;
  totalLiquidity: number;
  
  // Volume over time
  volumeHistory: {
    date: string;
    volume: number;
  }[];
  
  // Top markets by volume
  topMarkets: {
    id: string;
    title: string;
    volume: number;
  }[];
}

// Fetch platform stats
const getPlatformStats = async () => {
  const response = await fetch('/api/analytics/platform');
  return await response.json();
};`}
            />
          </Card>
        </div>
      </section>

      {/* Error Handling */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-yellow-400" />
          Error Handling
        </h2>

        <p className="text-slate-300 mb-4">
          API menggunakan standard HTTP status codes dan mengembalikan error details dalam response body.
        </p>

        <div className="not-prose mb-6">
          <Card className="p-6 bg-slate-800/30 border-slate-700">
            <h4 className="font-semibold text-white mb-4">Error Response Schema</h4>
            <CodeBlock
              language="typescript"
              code={`interface APIError {
  error: {
    code: string;
    message: string;
    details?: any;
  };
  status: number;
}

// HTTP Status Codes
const statusCodes = {
  200: 'OK - Request successful',
  201: 'Created - Resource created successfully',
  400: 'Bad Request - Invalid parameters',
  401: 'Unauthorized - Authentication required',
  403: 'Forbidden - Insufficient permissions',
  404: 'Not Found - Resource does not exist',
  429: 'Too Many Requests - Rate limit exceeded',
  500: 'Internal Server Error - Server error',
  503: 'Service Unavailable - Temporary unavailable'
};`}
            />
          </Card>
        </div>

        <h4 className="text-lg font-semibold text-white mb-3">Error Handling Example</h4>
        
        <CodeBlock
          language="typescript"
          code={`// Robust error handling
const fetchMarket = async (marketId: string) => {
  try {
    const response = await fetch(\`/api/markets/\${marketId}\`);
    
    if (!response.ok) {
      const error = await response.json();
      
      switch (response.status) {
        case 404:
          throw new Error(\`Market \${marketId} not found\`);
        case 429:
          throw new Error('Rate limit exceeded. Please try again later.');
        case 500:
          throw new Error('Server error. Please try again.');
        default:
          throw new Error(error.error.message);
      }
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch market:', error);
    throw error;
  }
};

// Retry logic untuk network errors
const fetchWithRetry = async (
  url: string,
  options: RequestInit,
  retries: number = 3
) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response;
      
      if (response.status >= 500 && i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
        continue;
      }
      
      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
    }
  }
};`}
        />
      </section>

      {/* Rate Limiting */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Rate Limiting</h2>

        <p className="text-slate-300 mb-4">
          API endpoints memiliki rate limits untuk ensure fair usage dan platform stability.
        </p>

        <div className="not-prose mb-6">
          <Card className="p-6 bg-slate-800/30 border-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold text-white mb-2">Public Endpoints</h5>
                <p className="text-sm text-slate-400 mb-2">100 requests per minute per IP</p>
                <code className="text-xs text-slate-500">GET /api/markets, GET /api/markets/:id</code>
              </div>
              <div>
                <h5 className="font-semibold text-white mb-2">Authenticated Endpoints</h5>
                <p className="text-sm text-slate-400 mb-2">50 requests per minute per wallet</p>
                <code className="text-xs text-slate-500">POST /api/trade, POST /api/markets</code>
              </div>
            </div>
          </Card>
        </div>

        <CodeBlock
          language="typescript"
          code={`// Rate limit headers
const response = await fetch('/api/markets');

console.log(response.headers.get('X-RateLimit-Limit'));      // 100
console.log(response.headers.get('X-RateLimit-Remaining'));  // 95
console.log(response.headers.get('X-RateLimit-Reset'));      // 1702073400

// Handle rate limits
if (response.status === 429) {
  const resetTime = response.headers.get('X-RateLimit-Reset');
  const waitTime = parseInt(resetTime) * 1000 - Date.now();
  console.log(\`Rate limited. Retry after \${waitTime}ms\`);
}`}
        />
      </section>

      {/* SDKs & Libraries */}
      <section className="not-prose">
        <Card className="p-6 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border-indigo-500/30">
          <h3 className="text-xl font-bold text-white mb-3">SDKs & Client Libraries</h3>
          <p className="text-slate-300 mb-4">
            Untuk integration yang lebih mudah, consider menggunakan official SDKs kami:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="px-4 py-3 bg-slate-700/30 rounded-lg">
              <p className="font-semibold text-white mb-1">TypeScript/JavaScript</p>
              <code className="text-xs text-slate-400">npm install @kalshchain/sdk</code>
            </div>
            <div className="px-4 py-3 bg-slate-700/30 rounded-lg">
              <p className="font-semibold text-white mb-1">Python</p>
              <code className="text-xs text-slate-400">pip install kalshchain</code>
            </div>
            <div className="px-4 py-3 bg-slate-700/30 rounded-lg">
              <p className="font-semibold text-white mb-1">Rust</p>
              <code className="text-xs text-slate-400">cargo add kalshchain</code>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
