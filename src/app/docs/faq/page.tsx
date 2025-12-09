// demerzels-lab/kalshchain/KalshChain-237051255d46360ee0eab8d0278534895dc525cf/src/app/docs/faq/page.tsx
import { HelpCircle } from 'lucide-react';

const faqItems = [
  {
    question: 'What is KalshChain?',
    answer: 'KalshChain is a decentralized prediction market platform built on the Solana blockchain. It allows users to trade on the outcome of future events using an Automated Market Maker (AMM) model.',
  },
  {
    question: 'How are market prices determined?',
    answer: 'Prices are determined by a Constant Product Market Maker (CPMM) formula (x * y = k), which balances the reserves of YES and NO shares in the liquidity pool. When one side is bought, its price increases automatically.',
  },
  {
    question: 'Is KalshChain custodial or non-custodial?',
    answer: 'KalshChain is non-custodial. Your funds are held entirely in your personal Solana wallet. Smart contracts manage the trade execution and settlement, but they never have direct control over your assets.',
  },
  {
    question: 'What is the trading fee?',
    answer: 'A small trading fee (currently 2%) is applied to every trade. This fee is automatically added to the market\'s liquidity pool and distributed to Liquidity Providers (LPs).',
  },
  {
    question: 'How are markets resolved?',
    answer: 'Markets are resolved after their expiration date using a decentralized oracle service to confirm the final outcome. Once resolved, the winning shares (which settle at $1.00) can be claimed by their holders.',
  },
];

export default function FAQPage() {
  return (
    <div className="prose max-w-none">
      {/* Inverted text color and cyan accent */}
      <h1 className="text-4xl font-bold text-slate-900 mb-4 flex items-center gap-3">
        <HelpCircle className="h-8 w-8 text-cyan-primary-600" />
        Frequently Asked Questions (FAQ)
      </h1>
      <p className="text-lg text-slate-600 mb-8">
        Quick answers to common questions about KalshChain's mechanics and platform.
      </p>

      <div className="space-y-6">
        {faqItems.map((item, index) => (
          <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
            {/* Inverted question color */}
            <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.question}</h3>
            {/* Inverted answer color */}
            <p className="text-slate-700">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}