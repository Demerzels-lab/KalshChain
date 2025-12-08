'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTrade } from '@/hooks/useTrade';
import { LiquidityPool, Market } from '@/types';
import { formatCurrency, formatPercent } from '@/lib/utils';
import { Loader2, AlertCircle, CheckCircle2, Lock } from 'lucide-react';

interface TradingPanelProps {
  market: Market;
  pool: LiquidityPool | null;
  onTradeComplete?: () => void;
}

export function TradingPanel({ market, pool, onTradeComplete }: TradingPanelProps) {
  const { connected } = useWallet();
  const { quote, getQuote, executeTrade, loading } = useTrade(market.id, pool);
  
  const [outcome, setOutcome] = useState<'YES' | 'NO'>('YES');
  const [side, setSide] = useState<'BUY' | 'SELL'>('BUY');
  const [quantity, setQuantity] = useState<string>('10');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const qty = parseFloat(quantity);
    if (!isNaN(qty) && qty > 0) {
      getQuote(outcome, side, qty);
    }
  }, [outcome, side, quantity, getQuote]);

  const handleTrade = async () => {
    setError(null);
    setSuccess(null);
    
    try {
      const qty = parseFloat(quantity);
      if (isNaN(qty) || qty <= 0) {
        setError('Enter a valid amount');
        return;
      }

      const result = await executeTrade(outcome, side, qty);
      setSuccess(`Transaction successful! TX: ${result.txHash.slice(0, 16)}...`);
      onTradeComplete?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transaction failed');
    }
  };

  if (!connected) {
    return (
      <Card className="border-slate-700">
        <CardContent className="p-8 text-center">
          <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center">
            <Lock className="h-8 w-8 text-slate-500" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Connect Wallet to Trade</h3>
          <p className="text-sm text-slate-400 mb-6">
            You need a Phantom wallet to trade on this market
          </p>
          <WalletMultiButton className="!bg-indigo-600 hover:!bg-indigo-700 !rounded-lg !mx-auto" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-slate-700">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <span>Trading Panel</span>
          <div className="flex gap-2">
            <Button
              variant={side === 'BUY' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSide('BUY')}
            >
              Buy
            </Button>
            <Button
              variant={side === 'SELL' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSide('SELL')}
            >
              Sell
            </Button>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setOutcome('YES')}
            className={`p-4 rounded-xl border-2 transition-all ${
              outcome === 'YES'
                ? 'border-emerald-500 bg-emerald-500/10'
                : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
            }`}
          >
            <div className="text-2xl font-bold text-emerald-400 mb-1">
              {formatPercent(market.yes_price)}
            </div>
            <div className="text-sm text-slate-400">YES</div>
          </button>
          <button
            onClick={() => setOutcome('NO')}
            className={`p-4 rounded-xl border-2 transition-all ${
              outcome === 'NO'
                ? 'border-rose-500 bg-rose-500/10'
                : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
            }`}
          >
            <div className="text-2xl font-bold text-rose-400 mb-1">
              {formatPercent(market.no_price)}
            </div>
            <div className="text-sm text-slate-400">NO</div>
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Number of Shares
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white text-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="0"
            min="0"
          />
          <div className="flex gap-2 mt-2">
            {[10, 25, 50, 100].map((val) => (
              <button
                key={val}
                onClick={() => setQuantity(val.toString())}
                className="flex-1 py-1.5 text-sm rounded-md bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
              >
                {val}
              </button>
            ))}
          </div>
        </div>

        {quote && (
          <div className="p-4 rounded-lg bg-slate-800/50 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Estimated Price</span>
              <span className="text-white font-medium">{formatCurrency(quote.price)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Total Cost</span>
              <span className="text-white font-medium">{formatCurrency(quote.cost)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Fee (2%)</span>
              <span className="text-slate-400">{formatCurrency(quote.fee)}</span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t border-slate-700">
              <span className="text-slate-300 font-medium">Total</span>
              <span className="text-indigo-400 font-semibold">{formatCurrency(quote.total)}</span>
            </div>
            {quote.priceImpact > 0.01 && (
              <div className="flex items-center gap-2 text-amber-400 text-xs mt-2">
                <AlertCircle className="h-4 w-4" />
                Price Impact: {(quote.priceImpact * 100).toFixed(2)}%
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm">
            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
            {success}
          </div>
        )}

        <Button
          variant={outcome === 'YES' ? 'yes' : 'no'}
          size="lg"
          className="w-full"
          onClick={handleTrade}
          disabled={loading || !pool}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            `${side === 'BUY' ? 'Buy' : 'Sell'} ${outcome} Shares`
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
