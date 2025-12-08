'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';

const faqs = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'What is KalshChain?',
        a: 'KalshChain is a decentralized prediction market platform built on Solana blockchain. It allows users to trade on the outcome of future events using an automated market maker (AMM) system. Markets cover topics like cryptocurrency prices, politics, sports, technology, and more.'
      },
      {
        q: 'How do I start trading?',
        a: 'To start trading: 1) Install a Solana wallet like Phantom, 2) Connect your wallet to KalshChain, 3) Browse markets on the Explore page, 4) Click on a market to view details, 5) Enter the number of shares you want to buy and click Buy YES or Buy NO. Make sure you have SOL in your wallet for transaction fees.'
      },
      {
        q: 'Do I need cryptocurrency to use KalshChain?',
        a: 'Yes, you need SOL (Solana native token) in your wallet to pay for blockchain transaction fees. You also need funds to buy shares in prediction markets. Transaction fees on Solana are very low, typically less than $0.001 per transaction.'
      },
      {
        q: 'Is KalshChain safe to use?',
        a: 'KalshChain is non-custodial, meaning you always control your funds through your wallet. We never have access to your private keys. Our smart contracts undergo regular security audits, and we follow industry best practices for security. However, always do your own research and never invest more than you can afford to lose.'
      }
    ]
  },
  {
    category: 'Trading & Markets',
    questions: [
      {
        q: 'How do prediction markets work?',
        a: 'Prediction markets have two outcomes: YES and NO. Each outcome has a price representing the market probability. If you think an event will happen, buy YES shares. If you think it won\'t, buy NO shares. When the market resolves, winning shares become worth $1 each, while losing shares become worthless.'
      },
      {
        q: 'What determines the price of shares?',
        a: 'Prices are determined by supply and demand through an automated market maker (AMM). The AMM uses a constant product formula (x * y = k) to automatically adjust prices based on trading activity. Large buys increase the price, while large sells decrease it. This creates a self-balancing system.'
      },
      {
        q: 'Can I sell my shares before the market resolves?',
        a: 'Yes! You can sell your shares at any time before the market resolves. The AMM provides instant liquidity, so you don\'t need to find a buyer. Simply click Sell on the trading panel and your shares will be sold at the current market price minus any fees.'
      },
      {
        q: 'What are trading fees?',
        a: 'KalshChain charges a 2% fee on each trade. This fee is split between liquidity providers (who supply the market liquidity) and the platform treasury. Additionally, you pay small Solana blockchain fees (typically $0.001 or less) for each transaction.'
      },
      {
        q: 'What is slippage and price impact?',
        a: 'Price impact (or slippage) occurs when your trade is large enough to move the market price. For example, buying 1000 YES shares might increase the price from 50% to 55%. The AMM shows you the expected price impact before you confirm the trade. Smaller trades have less price impact.'
      },
      {
        q: 'How do markets get resolved?',
        a: 'Markets resolve when the outcome is determined based on real-world events. An oracle verifies the outcome and marks the market as resolved with either YES or NO as the winning outcome. You can then claim your winnings if you held shares of the winning outcome.'
      }
    ]
  },
  {
    category: 'Wallet & Security',
    questions: [
      {
        q: 'Which wallets are supported?',
        a: 'KalshChain supports all Solana-compatible wallets including Phantom, Solflare, Ledger, and others. We recommend Phantom for beginners due to its user-friendly interface. For large amounts, consider using a hardware wallet like Ledger for extra security.'
      },
      {
        q: 'How do I keep my wallet secure?',
        a: 'Never share your seed phrase with anyone. Write it down on paper and store it securely offline. Never enter your seed phrase on suspicious websites. Always verify transaction details before signing. Use a hardware wallet for large amounts. Enable additional security features in your wallet app.'
      },
      {
        q: 'What if I lose my seed phrase?',
        a: 'If you lose your seed phrase, you permanently lose access to your wallet and funds. There is no recovery method. This is why it\'s critical to write down your seed phrase when creating a wallet and store it in a secure location. Consider making multiple physical copies stored in different secure locations.'
      },
      {
        q: 'Can KalshChain access my funds?',
        a: 'No. KalshChain is non-custodial, which means we never have access to your private keys or funds. All trades are executed through smart contracts on Solana blockchain. Your wallet signs transactions, and only you can authorize transfers of your funds.'
      },
      {
        q: 'What should I do if I see suspicious activity?',
        a: 'If you notice unauthorized transactions or suspicious activity: 1) Immediately disconnect your wallet from all websites, 2) Transfer funds to a new wallet with a new seed phrase, 3) Report the incident to security@kalshchain.com, 4) Never enter your seed phrase on any website claiming to help you recover funds.'
      }
    ]
  },
  {
    category: 'Technical Questions',
    questions: [
      {
        q: 'What is an AMM (Automated Market Maker)?',
        a: 'An AMM is a mathematical algorithm that automatically provides liquidity and determines prices based on supply and demand. Instead of matching buyers with sellers (like traditional exchanges), the AMM uses a liquidity pool and adjusts prices according to a formula. This enables instant trades without requiring counterparties.'
      },
      {
        q: 'How does the constant product formula work?',
        a: 'The formula is: x * y = k, where x = YES shares in pool, y = NO shares in pool, and k is a constant. When you buy YES shares, you add to the YES reserve and remove from NO reserve. The product (k) stays constant, which automatically adjusts the price based on the new ratio of reserves.'
      },
      {
        q: 'What are liquidity pools?',
        a: 'Liquidity pools contain YES and NO shares that traders can buy from or sell to. Pool providers deposit equal value of both outcomes and receive LP tokens representing their share. They earn a portion of trading fees proportional to their pool ownership. Pools enable instant trading without requiring matched orders.'
      },
      {
        q: 'Can I provide liquidity to earn fees?',
        a: 'Currently, liquidity provision is managed by the protocol to ensure market stability. We plan to open liquidity provision to users in a future update, allowing anyone to earn trading fees by providing liquidity to markets.'
      },
      {
        q: 'What blockchain does KalshChain use?',
        a: 'KalshChain is built on Solana blockchain, chosen for its high throughput (65,000 TPS), low fees ($0.001 per transaction), and fast finality (sub-second). This enables smooth trading experiences without the high costs associated with Ethereum or other blockchains.'
      },
      {
        q: 'Are smart contracts audited?',
        a: 'Yes, all KalshChain smart contracts undergo third-party security audits before deployment. Audits include static analysis, manual code review, fuzzing, and economic analysis. We also run a bug bounty program encouraging security researchers to report vulnerabilities.'
      }
    ]
  },
  {
    category: 'Account & Payments',
    questions: [
      {
        q: 'Do I need to create an account?',
        a: 'No traditional account is required. Your Solana wallet address serves as your identity on KalshChain. Simply connect your wallet to start trading. All your positions and transaction history are associated with your wallet address.'
      },
      {
        q: 'How do I withdraw my winnings?',
        a: 'Winnings are automatically credited to your wallet when you claim them after a market resolves. Click on your positions page, find resolved markets where you won, and click Claim to receive payouts. Winning shares are redeemed at $1 per share directly to your connected wallet.'
      },
      {
        q: 'Are there any deposit or withdrawal fees?',
        a: 'There are no deposit or withdrawal fees on KalshChain. You only pay: 1) Trading fees (2% per trade), and 2) Solana blockchain fees (typically $0.001 or less per transaction). Your funds move directly between your wallet and smart contracts with no intermediary.'
      },
      {
        q: 'What happens if I don\'t claim my winnings?',
        a: 'Your winnings remain claimable indefinitely. There is no expiration on claiming resolved market payouts. You can claim them whenever you want by visiting the Positions page and clicking Claim on won positions. Your winnings are held securely in the smart contract until you claim them.'
      }
    ]
  },
  {
    category: 'Platform & Features',
    questions: [
      {
        q: 'Can I create my own prediction markets?',
        a: 'Yes! Click the Create button in the navigation menu, connect your wallet, fill in market details (title, description, category, expiration date), and set initial liquidity. You need to sign a transaction to deploy the market on-chain. Your created markets appear in the Explore page for all users to trade.'
      },
      {
        q: 'What types of markets are available?',
        a: 'KalshChain hosts markets across multiple categories: Cryptocurrency (price predictions, ETF approvals), Politics (elections, policy changes), Economy (inflation, stock markets), Technology (AI milestones, product launches), Sports (championships, records), and Culture (entertainment, social trends).'
      },
      {
        q: 'How are market outcomes verified?',
        a: 'Market outcomes are verified by oracles that fetch real-world data. For objective events (like Bitcoin price), automated oracles check price feeds. For subjective events, trusted oracles review evidence and determine outcomes. The resolution process is transparent and recorded on-chain.'
      },
      {
        q: 'Can market resolutions be disputed?',
        a: 'Currently, oracle resolutions are final. We are developing a dispute resolution mechanism for future releases where market participants can challenge incorrect resolutions through a governance vote. Stay tuned for updates on this feature.'
      },
      {
        q: 'Is there a mobile app?',
        a: 'KalshChain is a responsive web application that works on mobile browsers. Install a Solana wallet app (like Phantom) on your mobile device and access kalshchain.com through the wallet\'s built-in browser. A dedicated mobile app is planned for future development.'
      }
    ]
  }
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq =>
        faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
      <p className="text-xl text-slate-400 mb-8">
        Find answers to common questions about using KalshChain prediction markets.
      </p>

      {/* Search */}
      <div className="not-prose mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* FAQ Categories */}
      {filteredFaqs.map((category, catIndex) => (
        <section key={catIndex} className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6">{category.category}</h2>
          
          <div className="not-prose space-y-3">
            {category.questions.map((faq, qIndex) => {
              const id = `${catIndex}-${qIndex}`;
              const isOpen = openItems.includes(id);
              
              return (
                <Card key={qIndex} className="border-slate-700">
                  <button
                    onClick={() => toggleItem(id)}
                    className="w-full p-5 text-left flex items-start justify-between gap-4 hover:bg-slate-800/30 transition-colors"
                  >
                    <span className="font-semibold text-white flex-1">{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
                    )}
                  </button>
                  
                  {isOpen && (
                    <div className="px-5 pb-5 pt-0">
                      <div className="pt-4 border-t border-slate-800">
                        <p className="text-slate-300 leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </section>
      ))}

      {filteredFaqs.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-slate-400 mb-4">No FAQs found matching "{searchTerm}"</p>
          <button
            onClick={() => setSearchTerm('')}
            className="text-indigo-400 hover:text-indigo-300"
          >
            Clear search
          </button>
        </Card>
      )}

      {/* Still Have Questions */}
      <section className="mt-12">
        <Card className="p-8 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/20 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">Still have questions?</h3>
          <p className="text-slate-300 mb-6">
            Can't find the answer you're looking for? Check out our other resources or contact support.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="/docs" className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
              View Documentation
            </a>
            <a href="/docs/troubleshooting" className="px-6 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-600 transition-colors">
              Troubleshooting Guide
            </a>
            <a href="/docs/glossary" className="px-6 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-600 transition-colors">
              Technical Glossary
            </a>
          </div>
        </Card>
      </section>
    </div>
  );
}
