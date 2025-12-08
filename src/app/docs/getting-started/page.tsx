'use client';

import { CodeBlock } from '@/components/docs/CodeBlock';
import { Card } from '@/components/ui/card';
import { Rocket, Wallet, Search, TrendingUp, Shield, CheckCircle2 } from 'lucide-react';

export default function GettingStartedPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold text-white mb-4">Getting Started</h1>
      <p className="text-xl text-slate-400 mb-8">
        Panduan lengkap untuk memulai trading di KalshChain prediction market platform. Ikuti step-by-step guide ini untuk membuat trade pertama Anda.
      </p>

      {/* Quick Start Checklist */}
      <div className="not-prose mb-12">
        <Card className="p-6 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border-indigo-500/30">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Rocket className="h-6 w-6 text-indigo-400" />
            Quick Start Checklist
          </h3>
          <div className="space-y-3">
            {[
              'Install Phantom wallet browser extension',
              'Get some SOL untuk trading (minimum 0.1 SOL recommended)',
              'Connect wallet ke KalshChain',
              'Browse available prediction markets',
              'Make your first trade',
              'Monitor positions dalam dashboard'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Step 1: Setup Wallet */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Wallet className="h-6 w-6 text-indigo-400" />
          Step 1: Setup Phantom Wallet
        </h2>

        <p className="text-slate-300 mb-4">
          Phantom adalah crypto wallet yang popular untuk Solana ecosystem. Anda memerlukan wallet ini untuk authenticate dan sign transactions di KalshChain.
        </p>

        <div className="not-prose mb-6">
          <Card className="p-6 bg-slate-800/30 border-slate-700">
            <h4 className="text-lg font-semibold text-white mb-3">Installation Steps</h4>
            <ol className="space-y-3 text-slate-300">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white text-sm flex items-center justify-center font-semibold">1</span>
                <div>
                  <p className="font-medium text-white mb-1">Download Phantom</p>
                  <p className="text-sm">Visit <a href="https://phantom.app" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">phantom.app</a> dan download browser extension untuk Chrome, Firefox, atau Brave.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white text-sm flex items-center justify-center font-semibold">2</span>
                <div>
                  <p className="font-medium text-white mb-1">Create Wallet</p>
                  <p className="text-sm">Klik extension icon, pilih &quot;Create New Wallet&quot;, dan ikuti setup wizard.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white text-sm flex items-center justify-center font-semibold">3</span>
                <div>
                  <p className="font-medium text-white mb-1">Backup Recovery Phrase</p>
                  <p className="text-sm">Write down your 12-word recovery phrase dan simpan di tempat yang aman. Jangan pernah share phrase ini dengan siapapun!</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white text-sm flex items-center justify-center font-semibold">4</span>
                <div>
                  <p className="font-medium text-white mb-1">Fund Your Wallet</p>
                  <p className="text-sm">Transfer SOL ke wallet Anda dari exchange (Binance, Coinbase, dll). Minimum 0.1 SOL recommended untuk start trading.</p>
                </div>
              </li>
            </ol>
          </Card>
        </div>

        <div className="not-prose mb-6">
          <Card className="p-4 bg-yellow-900/20 border-yellow-600/30">
            <div className="flex gap-3">
              <Shield className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-yellow-300 font-semibold mb-1">Security Warning</p>
                <p className="text-yellow-200/80 text-sm">
                  Never share your recovery phrase atau private key dengan siapapun. KalshChain team tidak akan pernah meminta informasi ini. Phishing scams adalah common - selalu verify URL adalah https://h4cmrpggrs7x.space.minimax.io
                </p>
              </div>
            </div>
          </Card>
        </div>

        <h4 className="text-lg font-semibold text-white mb-3">Connecting to KalshChain</h4>
        <p className="text-slate-300 mb-4">
          Setelah wallet setup, connect ke KalshChain platform:
        </p>

        <CodeBlock
          language="typescript"
          code={`// Wallet connection flow
// 1. Click "Connect Wallet" button di homepage
// 2. Phantom popup akan muncul asking for permission
// 3. Click "Connect" untuk authorize KalshChain
// 4. Your wallet address akan ditampilkan di navigation bar

// Example wallet connection code
const connectWallet = async () => {
  if ('phantom' in window) {
    const provider = window.phantom?.solana;
    
    if (provider?.isPhantom) {
      try {
        const response = await provider.connect();
        const publicKey = response.publicKey.toString();
        console.log('Connected:', publicKey);
        return publicKey;
      } catch (error) {
        console.error('Connection failed:', error);
      }
    }
  } else {
    alert('Please install Phantom wallet!');
  }
};`}
        />
      </section>

      {/* Step 2: Explore Markets */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Search className="h-6 w-6 text-indigo-400" />
          Step 2: Explore Prediction Markets
        </h2>

        <p className="text-slate-300 mb-4">
          KalshChain menawarkan berbagai prediction markets di kategori berbeda. Setiap market adalah binary (YES/NO) question tentang future events.
        </p>

        <div className="not-prose mb-6">
          <Card className="p-6 bg-slate-800/30 border-slate-700">
            <h4 className="text-lg font-semibold text-white mb-4">Market Categories</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-700/30 rounded-lg">
                <h5 className="font-semibold text-indigo-400 mb-2">🏛️ Politics</h5>
                <p className="text-sm text-slate-300">Elections, policy decisions, political events</p>
              </div>
              <div className="p-4 bg-slate-700/30 rounded-lg">
                <h5 className="font-semibold text-indigo-400 mb-2">💰 Economics</h5>
                <p className="text-sm text-slate-300">Market indices, inflation, GDP predictions</p>
              </div>
              <div className="p-4 bg-slate-700/30 rounded-lg">
                <h5 className="font-semibold text-indigo-400 mb-2">🏈 Sports</h5>
                <p className="text-sm text-slate-300">Championship winners, player achievements</p>
              </div>
              <div className="p-4 bg-slate-700/30 rounded-lg">
                <h5 className="font-semibold text-indigo-400 mb-2">🔬 Science & Tech</h5>
                <p className="text-sm text-slate-300">Product launches, scientific breakthroughs</p>
              </div>
              <div className="p-4 bg-slate-700/30 rounded-lg">
                <h5 className="font-semibold text-indigo-400 mb-2">🎬 Entertainment</h5>
                <p className="text-sm text-slate-300">Awards, box office, streaming numbers</p>
              </div>
              <div className="p-4 bg-slate-700/30 rounded-lg">
                <h5 className="font-semibold text-indigo-400 mb-2">⛓️ Crypto</h5>
                <p className="text-sm text-slate-300">Price predictions, adoption milestones</p>
              </div>
            </div>
          </Card>
        </div>

        <h4 className="text-lg font-semibold text-white mb-3">Understanding Market Cards</h4>
        <p className="text-slate-300 mb-4">
          Setiap market card menampilkan informasi penting:
        </p>

        <div className="not-prose mb-6">
          <Card className="p-6 bg-slate-800/30 border-slate-700">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded bg-green-500/20 text-green-400 flex items-center justify-center font-bold">
                  YES
                </div>
                <div>
                  <p className="font-semibold text-white">YES Price (e.g., 65%)</p>
                  <p className="text-sm text-slate-400">Current probability market yang event akan terjadi. Harga antara 0-100%.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded bg-red-500/20 text-red-400 flex items-center justify-center font-bold">
                  NO
                </div>
                <div>
                  <p className="font-semibold text-white">NO Price (e.g., 35%)</p>
                  <p className="text-sm text-slate-400">Probability bahwa event tidak akan terjadi. Always equals (100% - YES price).</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  📊
                </div>
                <div>
                  <p className="font-semibold text-white">Volume & Liquidity</p>
                  <p className="text-sm text-slate-400">Total trading volume dan available liquidity. Higher values indicate more active market.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  📅
                </div>
                <div>
                  <p className="font-semibold text-white">Close Date</p>
                  <p className="text-sm text-slate-400">Deadline untuk trading. Market closes ketika event occurs atau deadline reached.</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <h4 className="text-lg font-semibold text-white mb-3">Filtering & Sorting</h4>
        <p className="text-slate-300 mb-4">
          Gunakan filters dan sorting options untuk find markets yang relevan:
        </p>

        <CodeBlock
          language="typescript"
          code={`// Available filters
const filters = {
  category: ['All', 'Politics', 'Economics', 'Sports', 'Crypto', 'Entertainment'],
  status: ['Active', 'Closed', 'Resolved'],
  sortBy: ['Volume', 'Liquidity', 'Close Date', 'Recently Added']
};

// Example: Filter active crypto markets sorted by volume
const filteredMarkets = markets
  .filter(m => m.category === 'Crypto' && m.status === 'active')
  .sort((a, b) => b.volume - a.volume);`}
        />
      </section>

      {/* Step 3: Make First Trade */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-indigo-400" />
          Step 3: Make Your First Trade
        </h2>

        <p className="text-slate-300 mb-4">
          Trading di prediction market berbeda dari traditional stock trading. Anda membeli shares yang represent outcome, bukan company stocks.
        </p>

        <div className="not-prose mb-6">
          <Card className="p-6 bg-slate-800/30 border-slate-700">
            <h4 className="text-lg font-semibold text-white mb-4">Trading Process</h4>
            <ol className="space-y-4">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white text-sm flex items-center justify-center font-semibold">1</span>
                <div>
                  <p className="font-medium text-white mb-1">Select a Market</p>
                  <p className="text-sm text-slate-300">Click pada market card yang Anda minati untuk see detailed information.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white text-sm flex items-center justify-center font-semibold">2</span>
                <div>
                  <p className="font-medium text-white mb-1">Analyze Market Data</p>
                  <p className="text-sm text-slate-300">Review price chart, trading volume, dan market description. Do your research!</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white text-sm flex items-center justify-center font-semibold">3</span>
                <div>
                  <p className="font-medium text-white mb-1">Choose Outcome</p>
                  <p className="text-sm text-slate-300">Decide apakah Anda believe event akan terjadi (buy YES) atau tidak (buy NO).</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white text-sm flex items-center justify-center font-semibold">4</span>
                <div>
                  <p className="font-medium text-white mb-1">Enter Amount</p>
                  <p className="text-sm text-slate-300">Specify berapa banyak shares yang ingin dibeli. Platform akan calculate total cost.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white text-sm flex items-center justify-center font-semibold">5</span>
                <div>
                  <p className="font-medium text-white mb-1">Review & Confirm</p>
                  <p className="text-sm text-slate-300">Check summary (price, amount, total cost, fees) sebelum confirm.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white text-sm flex items-center justify-center font-semibold">6</span>
                <div>
                  <p className="font-medium text-white mb-1">Sign Transaction</p>
                  <p className="text-sm text-slate-300">Phantom wallet akan popup asking untuk approve transaction. Click &quot;Approve&quot;.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white text-sm flex items-center justify-center font-semibold">7</span>
                <div>
                  <p className="font-medium text-white mb-1">Confirmation</p>
                  <p className="text-sm text-slate-300">Transaction akan diproses di blockchain (biasanya 1-2 detik). Anda akan menerima confirmation.</p>
                </div>
              </li>
            </ol>
          </Card>
        </div>

        <h4 className="text-lg font-semibold text-white mb-3">Understanding Pricing</h4>
        <p className="text-slate-300 mb-4">
          Prediction market prices work differently dari traditional markets:
        </p>

        <CodeBlock
          language="typescript"
          code={`// Price calculation example
const market = {
  question: "Will Bitcoin reach $100K by end of 2025?",
  yesPrice: 0.65,  // 65% probability
  noPrice: 0.35    // 35% probability (always 1 - yesPrice)
};

// If you buy 100 YES shares at 65%:
const shares = 100;
const pricePerShare = 0.65;
const totalCost = shares * pricePerShare; // 65 SOL

// Maximum profit if YES wins:
const maxProfit = shares * 1.0 - totalCost; // 100 - 65 = 35 SOL

// Maximum loss if NO wins:
const maxLoss = totalCost; // 65 SOL (lose entire investment)

// Breakeven: Need price to stay above purchase price
// ROI if wins: (maxProfit / totalCost) * 100 = 53.8%`}
        />

        <div className="not-prose mt-6">
          <Card className="p-4 bg-blue-900/20 border-blue-600/30">
            <div className="flex gap-3">
              <Shield className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-300 font-semibold mb-1">Risk Management Tip</p>
                <p className="text-blue-200/80 text-sm">
                  Start dengan small trades untuk learn platform mechanics. Never invest lebih dari yang Anda mampu untuk lose. Diversify across multiple markets untuk reduce risk.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Step 4: Monitor Positions */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">
          Step 4: Monitor Your Positions
        </h2>

        <p className="text-slate-300 mb-4">
          After trading, track your positions di Positions page:
        </p>

        <div className="not-prose mb-6">
          <Card className="p-6 bg-slate-800/30 border-slate-700">
            <h4 className="text-lg font-semibold text-white mb-4">Position Dashboard Features</h4>
            <div className="space-y-4">
              <div className="p-4 bg-slate-700/30 rounded-lg">
                <h5 className="font-semibold text-white mb-2">📊 Portfolio Overview</h5>
                <p className="text-sm text-slate-300">Total value, profit/loss, dan performance metrics.</p>
              </div>
              <div className="p-4 bg-slate-700/30 rounded-lg">
                <h5 className="font-semibold text-white mb-2">📈 Active Positions</h5>
                <p className="text-sm text-slate-300">List semua open positions dengan current value dan P&L.</p>
              </div>
              <div className="p-4 bg-slate-700/30 rounded-lg">
                <h5 className="font-semibold text-white mb-2">🔔 Price Alerts</h5>
                <p className="text-sm text-slate-300">Set notifications ketika market prices hit target levels.</p>
              </div>
              <div className="p-4 bg-slate-700/30 rounded-lg">
                <h5 className="font-semibold text-white mb-2">💸 Exit Positions</h5>
                <p className="text-sm text-slate-300">Sell shares sebelum market closes untuk lock in profits atau cut losses.</p>
              </div>
            </div>
          </Card>
        </div>

        <h4 className="text-lg font-semibold text-white mb-3">Selling Shares</h4>
        <p className="text-slate-300 mb-4">
          Anda dapat exit position kapan saja sebelum market closes:
        </p>

        <CodeBlock
          language="typescript"
          code={`// Selling shares example
const position = {
  marketId: 'btc-100k-2025',
  outcome: 'YES',
  shares: 100,
  purchasePrice: 0.65,
  currentPrice: 0.75
};

// Calculate profit if selling now
const costBasis = position.shares * position.purchasePrice; // 65 SOL
const currentValue = position.shares * position.currentPrice; // 75 SOL
const profit = currentValue - costBasis; // +10 SOL
const profitPercent = (profit / costBasis) * 100; // +15.4%

// Sell process:
// 1. Click "Sell" button di position card
// 2. Enter amount to sell (partial atau full position)
// 3. Review current price dan expected proceeds
// 4. Confirm transaction di Phantom wallet
// 5. Receive SOL dalam wallet Anda`}
        />
      </section>

      {/* Step 5: Market Resolution */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">
          Step 5: Market Resolution & Payouts
        </h2>

        <p className="text-slate-300 mb-4">
          Setelah event occurs atau deadline reached, market akan di-resolve oleh oracle:
        </p>

        <div className="not-prose mb-6">
          <Card className="p-6 bg-slate-800/30 border-slate-700">
            <h4 className="text-lg font-semibold text-white mb-4">Resolution Process</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center font-bold">
                  WIN
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">If You Win</p>
                  <p className="text-sm text-slate-300">
                    Shares Anda akan worth 1.0 SOL each. Navigate ke Positions page dan click &quot;Claim Winnings&quot; untuk redeem.
                  </p>
                  <CodeBlock
                    language="typescript"
                    code={`// Winning payout calculation
const winningShares = 100;
const payout = winningShares * 1.0; // 100 SOL
const invested = 100 * 0.65; // 65 SOL
const profit = payout - invested; // 35 SOL`}
                  />
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center font-bold">
                  LOSS
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">If You Lose</p>
                  <p className="text-sm text-slate-300">
                    Losing shares become worthless (0 value). Loss adalah limited ke amount invested.
                  </p>
                  <CodeBlock
                    language="typescript"
                    code={`// Losing scenario
const losingShares = 100;
const finalValue = losingShares * 0.0; // 0 SOL
const invested = 100 * 0.65; // 65 SOL
const loss = invested - finalValue; // -65 SOL (max loss)`}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Shield className="h-6 w-6 text-indigo-400" />
          Best Practices & Tips
        </h2>

        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6 bg-slate-800/30 border-slate-700">
            <h4 className="font-semibold text-green-400 mb-3">✅ DO</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• Start dengan small amounts untuk learn</li>
              <li>• Research markets thoroughly sebelum trading</li>
              <li>• Diversify across multiple markets</li>
              <li>• Set stop-losses untuk limit downside</li>
              <li>• Keep track of market close dates</li>
              <li>• Monitor positions regularly</li>
              <li>• Secure your wallet dan recovery phrase</li>
            </ul>
          </Card>

          <Card className="p-6 bg-slate-800/30 border-slate-700">
            <h4 className="font-semibold text-red-400 mb-3">❌ DON&apos;T</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• Invest lebih dari yang Anda mampu lose</li>
              <li>• Trade based solely on emotions</li>
              <li>• Ignore trading fees dan slippage</li>
              <li>• Share wallet private keys</li>
              <li>• Fall for FOMO (Fear Of Missing Out)</li>
              <li>• Neglect risk management</li>
              <li>• Trust unverified market sources</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Next Steps */}
      <section className="not-prose">
        <Card className="p-6 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border-indigo-500/30">
          <h3 className="text-xl font-bold text-white mb-3">Ready to Start Trading?</h3>
          <p className="text-slate-300 mb-4">
            Sekarang Anda memiliki foundational knowledge untuk start trading di KalshChain. Explore documentation lain untuk deep dive into specific topics.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/explore"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Explore Markets
            </a>
            <a
              href="/docs/concepts"
              className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
            >
              Learn Concepts
            </a>
            <a
              href="/docs/security"
              className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
            >
              Security Guide
            </a>
          </div>
        </Card>
      </section>
    </div>
  );
}
