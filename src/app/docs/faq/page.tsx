'use client';

import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'What is a prediction market?',
    answer: 'A prediction market is a platform where you can trade on the outcomes of future events. Prices reflect the collective probability assessment of those events occurring. If you believe an event is more likely than the current price suggests, you can profit by buying shares.'
  },
  {
    question: 'How do prices work?',
    answer: 'Prices range from $0.01 to $0.99 and represent the probability of an outcome. For example, if YES shares are trading at $0.60, the market believes theres a 60% chance the event will happen. When the market resolves, winning shares pay $1 and losing shares pay $0.'
  },
  {
    question: 'What wallet do I need?',
    answer: 'Currently, we support Phantom wallet, which is the most popular Solana wallet. You can install it as a browser extension from phantom.app. Make sure you have some SOL for transaction fees.'
  },
  {
    question: 'What are the fees?',
    answer: 'We charge a 2% fee on each trade. This fee is used to reward liquidity providers and maintain the platform. There are also minimal Solana network fees (usually less than $0.01 per transaction).'
  },
  {
    question: 'How are markets resolved?',
    answer: 'Markets are resolved based on publicly verifiable outcomes. For most markets, we use official sources like government announcements, financial data providers, or sports results. The resolution criteria is specified in each market description.'
  },
  {
    question: 'Can I create my own market?',
    answer: 'Yes! Connect your wallet and navigate to "Create Market". You can specify the question, category, expiration date, and initial liquidity. Your market will be immediately tradeable once created.'
  },
  {
    question: 'What is KalshChain?',
    answer: 'KalshChain is a decentralized prediction market platform built on the Solana blockchain. It allows users to trade on the outcome of future events using an Automated Market Maker (AMM) model.'
  },
  {
    question: 'How are market prices determined?',
    answer: 'Prices are determined by a Constant Product Market Maker (CPMM) formula (x * y = k), which balances the reserves of YES and NO shares in the liquidity pool. When one side is bought, its price increases automatically.'
  },
  {
    question: 'Is KalshChain custodial or non-custodial?',
    answer: 'KalshChain is non-custodial. Your funds are held entirely in your personal Solana wallet. Smart contracts manage the trade execution and settlement, but they never have direct control over your assets.'
  },
  {
    question: 'What is the trading fee?',
    answer: 'A small trading fee (currently 2%) is applied to every trade. This fee is automatically added to the market\'s liquidity pool and distributed to Liquidity Providers (LPs).'
  }
];

export default function FAQPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4 flex items-center gap-3">
          <HelpCircle className="h-8 w-8 text-cyan-primary-600" />
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-slate-600">
          Find answers to common questions about prediction markets, trading, and the KalshChain platform.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isExpanded = expandedFaq === idx;

          return (
            <div key={idx} className="border border-gray-200 rounded-lg bg-white">
              <button
                onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-slate-900 text-left">{faq.question}</span>
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-slate-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-500 flex-shrink-0" />
                )}
              </button>
              {isExpanded && (
                <div className="px-6 pb-6">
                  <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-12 p-6 bg-cyan-primary-50 border border-cyan-primary-200 rounded-lg">
        <h3 className="text-lg font-semibold text-cyan-primary-900 mb-2">Still have questions?</h3>
        <p className="text-cyan-primary-700 mb-4">
          Can't find what you're looking for? Check out our comprehensive documentation or reach out to the community.
        </p>
        <div className="flex gap-3">
          <a
            href="/docs"
            className="px-4 py-2 bg-cyan-primary-600 text-white rounded-lg hover:bg-cyan-primary-700 transition-colors text-sm font-medium"
          >
            View Documentation
          </a>
          <a
            href="/how-it-works"
            className="px-4 py-2 border border-cyan-primary-300 text-cyan-primary-700 rounded-lg hover:bg-cyan-primary-50 transition-colors text-sm font-medium"
          >
            How It Works
          </a>
        </div>
      </div>
    </div>
  );
}