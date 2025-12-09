// demerzels-lab/kalshchain/KalshChain-237051255d46360ee0eab8d0278534895dc525cf/src/app/docs/glossary/page.tsx
import { Clock } from 'lucide-react';

const glossaryItems = [
  {
    term: 'AMM',
    definition: 'Automated Market Maker. A protocol that manages liquidity and pricing using an algorithm (CPMM) instead of a traditional order book.',
  },
  {
    term: 'CPMM',
    definition: 'Constant Product Market Maker (x * y = k). The specific AMM formula used by KalshChain to price prediction market shares.',
  },
  {
    term: 'Liquidity Provider (LP)',
    definition: 'A user who deposits funds (base currency) into a market\'s liquidity pool, earning trading fees in return for providing trade execution capacity.',
  },
  {
    term: 'Oracle',
    definition: 'A decentralized data source used to verify and confirm the outcome of a market event, allowing the smart contract to settle the market.',
  },
  {
    term: 'Price Slippage (Price Impact)',
    definition: 'The difference between the expected price of a trade and the executed price, typically occurring in large trades that significantly alter the liquidity pool\'s reserves.',
  },
  {
    term: 'Share',
    definition: 'A token representing one side of a prediction market outcome (YES or NO). Shares are priced between 0.00 and 1.00 SOL and settle at 1.00 SOL if they represent the winning outcome.',
  },
  {
    term: 'USDC',
    definition: 'USD Coin. The stablecoin used as the base currency for all trading and liquidity provision on the KalshChain platform.',
  },
];

export default function GlossaryPage() {
  return (
    <div className="prose max-w-none">
      {/* Inverted text color and cyan accent */}
      <h1 className="text-4xl font-bold text-slate-900 mb-4 flex items-center gap-3">
        <Clock className="h-8 w-8 text-cyan-primary-600" />
        Glossary of Terms
      </h1>
      <p className="text-lg text-slate-600 mb-8">
        Definitions for key terms and concepts used across the KalshChain platform and documentation.
      </p>

      <dl className="space-y-6">
        {glossaryItems.map((item, index) => (
          <div key={index}>
            {/* Inverted term color */}
            <dt className="text-xl font-semibold text-slate-900 mb-1">{item.term}</dt>
            {/* Inverted definition color */}
            <dd className="text-slate-700">{item.definition}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}