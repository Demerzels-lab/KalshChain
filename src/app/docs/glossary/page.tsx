'use client';

import { useState } from 'react';
import { CodeBlock } from '@/components/docs/CodeBlock';
import { Card } from '@/components/ui/card';
import { BookOpen, Search } from 'lucide-react';

interface Term {
  term: string;
  definition: string;
  category: string;
  example?: string;
  seeAlso?: string[];
}

const glossaryTerms: Term[] = [
  // A
  {
    term: 'AMM (Automated Market Maker)',
    definition: 'Sistem perdagangan otomatis yang menggunakan formula matematika untuk menentukan harga aset berdasarkan rasio likuiditas. KalshChain menggunakan AMM untuk memungkinkan trading tanpa order book tradisional.',
    category: 'Trading',
    example: `// AMM Price Calculation
const calculatePrice = (yesShares: number, totalLiquidity: number) => {
  return yesShares / totalLiquidity;
};

// Example: Market dengan 600 YES shares dari 1000 total
const price = calculatePrice(600, 1000); // 0.60 atau 60%`,
    seeAlso: ['Liquidity Pool', 'Price Discovery', 'Slippage']
  },
  {
    term: 'API (Application Programming Interface)',
    definition: 'Antarmuka pemrograman yang memungkinkan aplikasi berkomunikasi dengan backend KalshChain. Digunakan untuk fetch data market, submit transaksi, dan integrasi wallet.',
    category: 'Technical',
    example: `// Fetch market data via API
const response = await fetch('/api/markets');
const markets = await response.json();

// Create new market
const newMarket = await fetch('/api/markets', {
  method: 'POST',
  body: JSON.stringify({ title, description })
});`,
    seeAlso: ['REST API', 'Edge Functions', 'Supabase']
  },
  {
    term: 'Ask Price',
    definition: 'Harga terendah yang diminta oleh penjual untuk menjual share. Dalam prediction market, ini adalah harga di mana Anda dapat membeli outcome tertentu.',
    category: 'Trading',
    seeAlso: ['Bid Price', 'Spread', 'Market Order']
  },

  // B
  {
    term: 'Bid Price',
    definition: 'Harga tertinggi yang ditawarkan oleh pembeli untuk membeli share. Perbedaan antara bid dan ask price disebut spread.',
    category: 'Trading',
    seeAlso: ['Ask Price', 'Spread', 'Liquidity']
  },
  {
    term: 'Binary Market',
    definition: 'Prediction market dengan hanya dua kemungkinan outcome: YES atau NO. KalshChain mengkhususkan diri pada binary markets untuk kesederhanaan dan likuiditas yang lebih baik.',
    category: 'Market Types',
    example: `// Binary market structure
interface BinaryMarket {
  id: string;
  question: string;
  outcomes: ['YES', 'NO'];
  yesPrice: number;  // 0.00 - 1.00
  noPrice: number;   // Always (1 - yesPrice)
  volume: number;
  liquidity: number;
}`,
    seeAlso: ['Prediction Market', 'Outcome', 'Resolution']
  },
  {
    term: 'Blockchain',
    definition: 'Teknologi distributed ledger yang menyimpan data dalam blok-blok yang terhubung secara kriptografis. KalshChain menggunakan Solana blockchain untuk keamanan dan transparansi.',
    category: 'Blockchain',
    seeAlso: ['Solana', 'Smart Contract', 'Transaction']
  },

  // C
  {
    term: 'Collateral',
    definition: 'Aset yang didepositkan untuk menjamin posisi trading. Dalam KalshChain, collateral adalah SOL yang di-lock saat membeli shares.',
    category: 'Trading',
    example: `// Collateral requirement untuk membeli shares
const buyShares = async (amount: number, price: number) => {
  const collateralRequired = amount * price;
  // Lock SOL sebagai collateral
  await lockCollateral(collateralRequired);
};`,
    seeAlso: ['Margin', 'Position', 'Settlement']
  },
  {
    term: 'Consensus Mechanism',
    definition: 'Protokol yang digunakan blockchain untuk mencapai kesepakatan tentang state network. Solana menggunakan Proof of History (PoH) dan Proof of Stake (PoS).',
    category: 'Blockchain',
    seeAlso: ['Proof of History', 'Proof of Stake', 'Validator']
  },
  {
    term: 'Contract Address',
    definition: 'Alamat unik dari smart contract yang di-deploy di blockchain. Digunakan untuk berinteraksi dengan contract melalui transactions.',
    category: 'Blockchain',
    example: `// Example contract interaction
const marketContract = new PublicKey(
  '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU'
);`,
    seeAlso: ['Smart Contract', 'Public Key', 'Transaction']
  },

  // D
  {
    term: 'Decentralized',
    definition: 'Sistem yang tidak dikontrol oleh satu entitas tunggal. KalshChain adalah prediction market yang terdesentralisasi, berjalan di Solana blockchain.',
    category: 'Blockchain',
    seeAlso: ['Blockchain', 'Smart Contract', 'Trustless']
  },
  {
    term: 'DeFi (Decentralized Finance)',
    definition: 'Ekosistem finansial yang dibangun di atas blockchain, tanpa intermediary tradisional. Prediction markets adalah bagian dari DeFi.',
    category: 'Blockchain',
    seeAlso: ['Decentralized', 'Smart Contract', 'AMM']
  },

  // E
  {
    term: 'Edge Function',
    definition: 'Serverless function yang berjalan di edge (dekat dengan user) untuk latensi rendah. KalshChain menggunakan Supabase Edge Functions untuk business logic.',
    category: 'Technical',
    example: `// Edge function untuk process trade
Deno.serve(async (req) => {
  const { marketId, outcome, amount } = await req.json();
  
  // Validate dan execute trade
  const result = await executeTrade(marketId, outcome, amount);
  
  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' }
  });
});`,
    seeAlso: ['Serverless', 'API', 'Supabase']
  },
  {
    term: 'Event Market',
    definition: 'Prediction market yang berbasis pada kejadian dunia nyata tertentu (politik, olahraga, ekonomi). Resolusi berdasarkan outcome event tersebut.',
    category: 'Market Types',
    seeAlso: ['Binary Market', 'Resolution', 'Oracle']
  },

  // G
  {
    term: 'Gas Fee',
    definition: 'Biaya yang dibayarkan untuk eksekusi transaksi di blockchain. Di Solana, gas fee sangat rendah (≈$0.00025 per transaksi).',
    category: 'Blockchain',
    example: `// Transaction dengan gas fee
const transaction = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey: sender,
    toPubkey: recipient,
    lamports: amount
  })
);

// Gas fee automatically calculated
const signature = await sendAndConfirmTransaction(
  connection,
  transaction,
  [senderKeypair]
);`,
    seeAlso: ['Transaction', 'Lamport', 'Solana']
  },

  // I
  {
    term: 'Impermanent Loss',
    definition: 'Potensi kerugian yang dialami liquidity provider akibat perubahan harga aset dalam pool dibandingkan holding aset tersebut.',
    category: 'Trading',
    seeAlso: ['Liquidity Pool', 'AMM', 'Liquidity Provider']
  },

  // L
  {
    term: 'Lamport',
    definition: 'Unit terkecil dari SOL (cryptocurrency Solana). 1 SOL = 1,000,000,000 lamports. Dinamai sesuai Leslie Lamport, pioneer distributed systems.',
    category: 'Blockchain',
    example: `// Convert SOL to lamports
const solAmount = 1.5;
const lamports = solAmount * 1_000_000_000; // 1,500,000,000

// Convert lamports to SOL
const sol = lamports / 1_000_000_000;`,
    seeAlso: ['SOL', 'Solana', 'Transaction']
  },
  {
    term: 'Liquidity',
    definition: 'Kemudahan untuk membeli atau menjual aset tanpa menyebabkan perubahan harga signifikan. Market dengan liquidity tinggi memiliki spread sempit dan volume besar.',
    category: 'Trading',
    seeAlso: ['Liquidity Pool', 'Volume', 'Spread']
  },
  {
    term: 'Liquidity Pool',
    definition: 'Kumpulan dana yang di-lock dalam smart contract untuk memfasilitasi trading. Dalam KalshChain, pool berisi shares YES dan NO untuk setiap market.',
    category: 'Trading',
    example: `// Liquidity pool structure
interface LiquidityPool {
  marketId: string;
  yesShares: number;
  noShares: number;
  totalLiquidity: number;
  lpTokens: number;
}

// Add liquidity
const addLiquidity = async (amount: number) => {
  const yesAmount = amount / 2;
  const noAmount = amount / 2;
  return { yesShares: yesAmount, noShares: noAmount };
};`,
    seeAlso: ['AMM', 'Liquidity', 'Liquidity Provider']
  },
  {
    term: 'Liquidity Provider (LP)',
    definition: 'User yang menyediakan dana ke liquidity pool dan menerima LP tokens sebagai bukti kepemilikan. LP mendapatkan bagian dari trading fees.',
    category: 'Trading',
    seeAlso: ['Liquidity Pool', 'LP Token', 'Trading Fee']
  },
  {
    term: 'Long Position',
    definition: 'Posisi trading dimana trader membeli share dengan ekspektasi harga akan naik. Dalam prediction market, ini berarti betting bahwa outcome akan terjadi.',
    category: 'Trading',
    seeAlso: ['Short Position', 'Position', 'Outcome']
  },
  {
    term: 'LP Token',
    definition: 'Token yang diberikan kepada liquidity provider sebagai bukti kontribusi mereka ke pool. Dapat di-redeem untuk share dari pool plus accumulated fees.',
    category: 'Trading',
    seeAlso: ['Liquidity Provider', 'Liquidity Pool', 'Token']
  },

  // M
  {
    term: 'Market Maker',
    definition: 'Entitas yang menyediakan liquidity dengan simultaneously posting bid dan ask orders. Di KalshChain, AMM bertindak sebagai automated market maker.',
    category: 'Trading',
    seeAlso: ['AMM', 'Liquidity', 'Bid Price']
  },
  {
    term: 'Market Order',
    definition: 'Order untuk membeli atau menjual share pada harga pasar saat ini. Dieksekusi segera dengan best available price.',
    category: 'Trading',
    seeAlso: ['Limit Order', 'Ask Price', 'Bid Price']
  },
  {
    term: 'Market Resolution',
    definition: 'Proses menentukan outcome akhir dari prediction market. Setelah resolution, winning shares dapat di-redeem untuk nilai penuh.',
    category: 'Market Types',
    example: `// Market resolution process
const resolveMarket = async (
  marketId: string, 
  outcome: 'YES' | 'NO'
) => {
  // Update market status
  await updateMarket(marketId, { 
    status: 'resolved',
    winningOutcome: outcome,
    resolvedAt: new Date()
  });
  
  // Enable redemptions
  await enableRedemptions(marketId);
};`,
    seeAlso: ['Oracle', 'Settlement', 'Outcome']
  },

  // N
  {
    term: 'Network',
    definition: 'Infrastruktur blockchain tempat smart contracts di-deploy. KalshChain beroperasi di Solana network (mainnet untuk production, devnet untuk testing).',
    category: 'Blockchain',
    seeAlso: ['Solana', 'Mainnet', 'Devnet']
  },
  {
    term: 'Non-Custodial',
    definition: 'Model dimana user mempertahankan kontrol penuh atas private keys dan assets mereka. KalshChain adalah non-custodial platform.',
    category: 'Blockchain',
    seeAlso: ['Self-Custody', 'Private Key', 'Wallet']
  },

  // O
  {
    term: 'Oracle',
    definition: 'Sumber data eksternal yang menyediakan informasi dunia nyata ke smart contract. Digunakan untuk verify outcome dan trigger market resolution.',
    category: 'Blockchain',
    seeAlso: ['Market Resolution', 'Smart Contract', 'Event Market']
  },
  {
    term: 'Order Book',
    definition: 'Daftar semua buy dan sell orders untuk aset tertentu. KalshChain menggunakan AMM daripada order book tradisional untuk efisiensi.',
    category: 'Trading',
    seeAlso: ['AMM', 'Bid Price', 'Ask Price']
  },
  {
    term: 'Outcome',
    definition: 'Hasil akhir dari prediction market. Dalam binary market, outcome adalah YES atau NO.',
    category: 'Market Types',
    seeAlso: ['Binary Market', 'Resolution', 'Settlement']
  },

  // P
  {
    term: 'Phantom Wallet',
    definition: 'Popular crypto wallet untuk Solana ecosystem. KalshChain terintegrasi dengan Phantom untuk user authentication dan transaction signing.',
    category: 'Blockchain',
    example: `// Connect Phantom wallet
const connectWallet = async () => {
  if ('phantom' in window) {
    const provider = window.phantom?.solana;
    if (provider?.isPhantom) {
      const response = await provider.connect();
      return response.publicKey.toString();
    }
  }
  throw new Error('Phantom wallet not found');
};`,
    seeAlso: ['Wallet', 'Solana', 'Public Key']
  },
  {
    term: 'Position',
    definition: 'Holdings saat ini dari trader dalam market tertentu. Position dapat long (membeli) atau short (menjual) outcome tertentu.',
    category: 'Trading',
    seeAlso: ['Long Position', 'Short Position', 'Portfolio']
  },
  {
    term: 'Prediction Market',
    definition: 'Platform trading dimana user membeli dan menjual shares berdasarkan prediksi tentang outcome event masa depan. Harga share mencerminkan probabilitas yang dipercaya crowd.',
    category: 'Market Types',
    seeAlso: ['Binary Market', 'Event Market', 'Outcome']
  },
  {
    term: 'Price Discovery',
    definition: 'Proses dimana pasar menentukan harga fair untuk aset melalui interaksi supply dan demand. Prediction markets sangat efektif untuk price discovery probabilitas.',
    category: 'Trading',
    seeAlso: ['AMM', 'Liquidity', 'Market Maker']
  },
  {
    term: 'Private Key',
    definition: 'Kode rahasia kriptografis yang memberikan akses ke wallet dan kemampuan untuk sign transactions. Harus dijaga kerahasiaannya.',
    category: 'Blockchain',
    seeAlso: ['Public Key', 'Wallet', 'Signature']
  },
  {
    term: 'Proof of History (PoH)',
    definition: 'Consensus mechanism unik Solana yang membuat cryptographic timestamp untuk setiap transaction, memungkinkan throughput tinggi.',
    category: 'Blockchain',
    seeAlso: ['Solana', 'Consensus Mechanism', 'Validator']
  },
  {
    term: 'Proof of Stake (PoS)',
    definition: 'Consensus mechanism dimana validators stake tokens untuk berpartisipasi dalam validasi blocks. Solana mengkombinasikan PoS dengan PoH.',
    category: 'Blockchain',
    seeAlso: ['Proof of History', 'Validator', 'Staking']
  },
  {
    term: 'Public Key',
    definition: 'Alamat wallet yang dapat dibagikan untuk receive funds. Derived dari private key melalui kriptografi asimetris.',
    category: 'Blockchain',
    example: `// Generate keypair
import { Keypair } from '@solana/web3.js';

const keypair = Keypair.generate();
const publicKey = keypair.publicKey.toBase58();
const privateKey = keypair.secretKey;

console.log('Public Key:', publicKey);
// Example: 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU`,
    seeAlso: ['Private Key', 'Wallet', 'Address']
  },

  // R
  {
    term: 'Resolution',
    definition: 'Lihat Market Resolution.',
    category: 'Market Types',
    seeAlso: ['Market Resolution', 'Oracle', 'Settlement']
  },
  {
    term: 'REST API',
    definition: 'Architectural style untuk API yang menggunakan HTTP methods (GET, POST, PUT, DELETE) untuk komunikasi client-server.',
    category: 'Technical',
    seeAlso: ['API', 'Edge Functions', 'Supabase']
  },
  {
    term: 'RPC (Remote Procedure Call)',
    definition: 'Protocol yang memungkinkan program execute function di server remote. Solana RPC digunakan untuk komunikasi dengan blockchain.',
    category: 'Blockchain',
    example: `// Connect to Solana RPC
import { Connection } from '@solana/web3.js';

const connection = new Connection(
  'https://api.mainnet-beta.solana.com',
  'confirmed'
);

// Get account balance
const balance = await connection.getBalance(publicKey);`,
    seeAlso: ['Solana', 'Transaction', 'Network']
  },

  // S
  {
    term: 'Settlement',
    definition: 'Proses final payment setelah market resolved. Winners dapat redeem shares mereka untuk payout, losers kehilangan investment.',
    category: 'Trading',
    example: `// Settlement process
const settlePosition = async (
  marketId: string,
  userId: string
) => {
  const position = await getPosition(marketId, userId);
  const market = await getMarket(marketId);
  
  if (market.winningOutcome === position.outcome) {
    // Calculate payout: shares * final price (1.00)
    const payout = position.shares * 1.0;
    await transferFunds(userId, payout);
  }
};`,
    seeAlso: ['Resolution', 'Outcome', 'Redemption']
  },
  {
    term: 'Short Position',
    definition: 'Posisi trading dimana trader menjual share dengan ekspektasi harga akan turun. Dalam prediction market, ini berarti betting melawan outcome.',
    category: 'Trading',
    seeAlso: ['Long Position', 'Position', 'Outcome']
  },
  {
    term: 'Signature',
    definition: 'Cryptographic proof bahwa transaction diotorisasi oleh pemilik private key. Diperlukan untuk semua blockchain transactions.',
    category: 'Blockchain',
    seeAlso: ['Private Key', 'Transaction', 'Wallet']
  },
  {
    term: 'Slippage',
    definition: 'Perbedaan antara expected price dan actual execution price dari trade. Terjadi karena perubahan harga saat transaction sedang diproses.',
    category: 'Trading',
    example: `// Slippage protection
const executeTrade = async (
  amount: number,
  maxSlippage: number = 0.01 // 1%
) => {
  const expectedPrice = await getPrice();
  const minAcceptablePrice = expectedPrice * (1 - maxSlippage);
  
  // Execute dengan price limit
  return await trade(amount, minAcceptablePrice);
};`,
    seeAlso: ['AMM', 'Liquidity', 'Price Discovery']
  },
  {
    term: 'Smart Contract',
    definition: 'Self-executing contract dengan terms agreement yang ditulis dalam code. Berjalan di blockchain dan otomatis enforce rules tanpa intermediary.',
    category: 'Blockchain',
    seeAlso: ['Blockchain', 'Solana', 'Contract Address']
  },
  {
    term: 'SOL',
    definition: 'Native cryptocurrency dari Solana blockchain. Digunakan untuk pay transaction fees dan sebagai collateral dalam KalshChain markets.',
    category: 'Blockchain',
    seeAlso: ['Lamport', 'Solana', 'Gas Fee']
  },
  {
    term: 'Solana',
    definition: 'High-performance blockchain platform yang mendukung KalshChain. Terkenal dengan throughput tinggi (65,000 TPS) dan fees rendah.',
    category: 'Blockchain',
    seeAlso: ['Blockchain', 'SOL', 'Proof of History']
  },
  {
    term: 'Spread',
    definition: 'Perbedaan antara bid price (highest buy) dan ask price (lowest sell). Spread sempit menunjukkan liquidity yang baik.',
    category: 'Trading',
    seeAlso: ['Bid Price', 'Ask Price', 'Liquidity']
  },
  {
    term: 'Staking',
    definition: 'Process lock up cryptocurrency untuk mendukung network operations dan earn rewards. Validators di Solana stake SOL untuk participate.',
    category: 'Blockchain',
    seeAlso: ['Proof of Stake', 'Validator', 'SOL']
  },
  {
    term: 'Supabase',
    definition: 'Open-source Firebase alternative yang menyediakan database, authentication, dan edge functions. KalshChain menggunakan Supabase untuk backend.',
    category: 'Technical',
    seeAlso: ['Edge Functions', 'Database', 'API']
  },

  // T
  {
    term: 'Token',
    definition: 'Digital asset yang direpresentasikan di blockchain. Dapat berupa cryptocurrency, shares, atau LP tokens.',
    category: 'Blockchain',
    seeAlso: ['LP Token', 'SOL', 'Smart Contract']
  },
  {
    term: 'TPS (Transactions Per Second)',
    definition: 'Metrik yang mengukur throughput blockchain. Solana dapat handle hingga 65,000 TPS, jauh lebih tinggi dari Ethereum (~15 TPS).',
    category: 'Blockchain',
    seeAlso: ['Solana', 'Transaction', 'Network']
  },
  {
    term: 'Trading Fee',
    definition: 'Biaya yang dikenakan pada setiap trade. Sebagian trading fee didistribusikan ke liquidity providers sebagai incentive.',
    category: 'Trading',
    example: `// Trading fee calculation
const TRADING_FEE = 0.002; // 0.2%

const calculateFee = (tradeAmount: number) => {
  return tradeAmount * TRADING_FEE;
};

// Example: Trade 100 SOL
const fee = calculateFee(100); // 0.2 SOL`,
    seeAlso: ['Liquidity Provider', 'Transaction', 'Fee']
  },
  {
    term: 'Transaction',
    definition: 'Operasi yang mengubah state blockchain. Termasuk transfers, trades, dan smart contract interactions. Memerlukan signature dan gas fee.',
    category: 'Blockchain',
    seeAlso: ['Gas Fee', 'Signature', 'Block']
  },
  {
    term: 'Trustless',
    definition: 'Sistem yang tidak memerlukan trust pada third party. Smart contracts dan blockchain memungkinkan trustless interactions.',
    category: 'Blockchain',
    seeAlso: ['Decentralized', 'Smart Contract', 'Blockchain']
  },

  // V
  {
    term: 'Validator',
    definition: 'Node yang memverifikasi dan validate transactions di blockchain. Validators di Solana stake SOL dan earn rewards.',
    category: 'Blockchain',
    seeAlso: ['Proof of Stake', 'Staking', 'Network']
  },
  {
    term: 'Volume',
    definition: 'Total nilai shares yang di-trade dalam period tertentu. High volume menunjukkan active market dan good liquidity.',
    category: 'Trading',
    seeAlso: ['Liquidity', 'Trading Fee', 'Market']
  },

  // W
  {
    term: 'Wallet',
    definition: 'Software atau hardware yang menyimpan private keys dan memungkinkan user interact dengan blockchain. KalshChain mendukung Phantom wallet.',
    category: 'Blockchain',
    seeAlso: ['Phantom Wallet', 'Private Key', 'Public Key']
  },
  {
    term: 'Web3',
    definition: 'Next generation internet yang dibangun di atas blockchain technology, emphasizing decentralization dan user ownership.',
    category: 'Blockchain',
    seeAlso: ['Blockchain', 'Decentralized', 'DeFi']
  }
];

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(glossaryTerms.map(t => t.category)))];

  // Filter terms
  const filteredTerms = glossaryTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group by first letter
  const groupedTerms = filteredTerms.reduce((acc, term) => {
    const firstLetter = term.term[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(term);
    return acc;
  }, {} as Record<string, Term[]>);

  const letters = Object.keys(groupedTerms).sort();

  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold text-white mb-4">Technical Glossary</h1>
      <p className="text-xl text-slate-400 mb-8">
        Comprehensive reference untuk terminology yang digunakan dalam KalshChain platform, prediction markets, blockchain technology, dan trading concepts.
      </p>

      {/* Search and Filter */}
      <div className="not-prose mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search terms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Alphabetical Navigation */}
      <div className="not-prose mb-8">
        <Card className="p-4 bg-slate-800/30 border-slate-700">
          <div className="flex flex-wrap gap-2 justify-center">
            {letters.map(letter => (
              <a
                key={letter}
                href={`#${letter}`}
                className="w-8 h-8 flex items-center justify-center rounded bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30 transition-colors font-semibold"
              >
                {letter}
              </a>
            ))}
          </div>
        </Card>
      </div>

      {/* Terms by Letter */}
      {letters.map(letter => (
        <section key={letter} id={letter} className="mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
              {letter}
            </div>
            {letter}
          </h2>

          <div className="not-prose space-y-6">
            {groupedTerms[letter].map((term, index) => (
              <Card key={index} className="p-6 bg-slate-800/30 border-slate-700 hover:border-indigo-500/50 transition-colors">
                <div className="mb-3">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-xl font-bold text-white">{term.term}</h3>
                    <span className="px-3 py-1 rounded-full bg-indigo-600/20 text-indigo-300 text-xs font-medium whitespace-nowrap">
                      {term.category}
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {term.definition}
                  </p>
                </div>

                {term.example && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-slate-400 mb-2 flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Example
                    </h4>
                    <CodeBlock code={term.example} language="typescript" />
                  </div>
                )}

                {term.seeAlso && term.seeAlso.length > 0 && (
                  <div className="pt-4 border-t border-slate-700">
                    <p className="text-sm text-slate-400 mb-2">See also:</p>
                    <div className="flex flex-wrap gap-2">
                      {term.seeAlso.map((related, i) => (
                        <button
                          key={i}
                          onClick={() => setSearchQuery(related)}
                          className="px-3 py-1 rounded-md bg-slate-700/50 text-slate-300 text-sm hover:bg-slate-700 transition-colors"
                        >
                          {related}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>
      ))}

      {filteredTerms.length === 0 && (
        <Card className="p-12 bg-slate-800/30 border-slate-700 text-center">
          <p className="text-slate-400 text-lg">
            No terms found matching &quot;{searchQuery}&quot;
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Clear Search
          </button>
        </Card>
      )}

      {/* Additional Resources */}
      <section className="not-prose mt-12">
        <Card className="p-6 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border-indigo-500/30">
          <h3 className="text-xl font-bold text-white mb-3">Need More Help?</h3>
          <p className="text-slate-300 mb-4">
            Jika Anda tidak menemukan term yang Anda cari, check dokumentasi lain kami atau hubungi support team.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/docs/concepts"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Platform Concepts
            </a>
            <a
              href="/docs/architecture"
              className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
            >
              System Architecture
            </a>
            <a
              href="/docs/faq"
              className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
            >
              FAQ
            </a>
          </div>
        </Card>
      </section>
    </div>
  );
}
