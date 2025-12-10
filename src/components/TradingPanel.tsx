'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTrade } from '@/hooks/useTrade';
import { LiquidityPool, Market } from '@/types';
import { formatCurrency, formatPercent } from '@/lib/utils';
import { Loader2, AlertCircle, CheckCircle2, ArrowRightLeft, DollarSign } from 'lucide-react';

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
      setSuccess(`Order Executed: ${result.txHash.slice(0, 12)}...`);
      onTradeComplete?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transaction failed');
    }
  };

  return (
    <Card className="border-slate-200/60 shadow-xl shadow-cyan-primary-500/5 bg-white/80 backdrop-blur-xl">
      <CardHeader className="pb-4 border-b border-slate-100">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-slate-900 tracking-tight">
            <ArrowRightLeft className="h-5 w-5 text-cyan-primary-600" />
            Execution
          </span>
          {/* Status Indicator */}
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-50 border border-slate-200">
            <div className={`w-1.5 h-1.5 rounded-full ${connected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
            <span className="text-[10px] font-mono font-medium text-slate-500 uppercase">
              {connected ? 'Online' : 'Offline'}
            </span>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        
        {/* --- Buy/Sell Segmented Control --- */}
        <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-100/80 border border-slate-200">
          <button
            onClick={() => setSide('BUY')}
            disabled={!connected}
            className={`py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
              side === 'BUY'
                ? 'bg-white text-slate-900 shadow-sm ring-1 ring-black/5'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            BUY
          </button>
          <button
            onClick={() => setSide('SELL')}
            disabled={!connected}
            className={`py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
              side === 'SELL'
                ? 'bg-white text-slate-900 shadow-sm ring-1 ring-black/5'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            SELL
          </button>
        </div>

        {/* --- Outcome Selector (Big Targets) --- */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => connected && setOutcome('YES')}
            disabled={!connected}
            className={`relative p-4 rounded-xl border transition-all duration-200 group overflow-hidden ${
              !connected 
                ? 'border-slate-200 bg-slate-50 opacity-60 cursor-not-allowed'
                : outcome === 'YES'
                ? 'border-cyan-primary-500 bg-cyan-primary-50 shadow-md shadow-cyan-primary-500/10 ring-1 ring-cyan-primary-500'
                : 'border-slate-200 bg-white hover:border-cyan-primary-300'
            }`}
          >
            <div className="relative z-10 flex flex-col items-start">
              <span className={`text-xs font-bold uppercase tracking-wider mb-1 ${outcome === 'YES' ? 'text-cyan-primary-700' : 'text-slate-500'}`}>
                Outcome
              </span>
              <span className={`text-2xl font-black tracking-tight ${outcome === 'YES' ? 'text-cyan-primary-900' : 'text-slate-700'}`}>
                YES
              </span>
              <span className={`text-sm font-mono mt-1 ${outcome === 'YES' ? 'text-cyan-primary-600' : 'text-slate-400'}`}>
                {formatPercent(market.yes_price)}
              </span>
            </div>
            {outcome === 'YES' && <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-cyan-primary-400/20 to-transparent rounded-bl-full -mr-4 -mt-4" />}
          </button>

          <button
            onClick={() => connected && setOutcome('NO')}
            disabled={!connected}
            className={`relative p-4 rounded-xl border transition-all duration-200 group overflow-hidden ${
              !connected 
                ? 'border-slate-200 bg-slate-50 opacity-60 cursor-not-allowed'
                : outcome === 'NO'
                ? 'border-blue-500 bg-blue-50 shadow-md shadow-blue-500/10 ring-1 ring-blue-500'
                : 'border-slate-200 bg-white hover:border-blue-300'
            }`}
          >
            <div className="relative z-10 flex flex-col items-start">
              <span className={`text-xs font-bold uppercase tracking-wider mb-1 ${outcome === 'NO' ? 'text-blue-700' : 'text-slate-500'}`}>
                Outcome
              </span>
              <span className={`text-2xl font-black tracking-tight ${outcome === 'NO' ? 'text-blue-900' : 'text-slate-700'}`}>
                NO
              </span>
              <span className={`text-sm font-mono mt-1 ${outcome === 'NO' ? 'text-blue-600' : 'text-slate-400'}`}>
                {formatPercent(market.no_price)}
              </span>
            </div>
            {outcome === 'NO' && <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-transparent rounded-bl-full -mr-4 -mt-4" />}
          </button>
        </div>

        {/* --- Input Field --- */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
            Quantity (Shares)
          </label>
          <div className="relative">
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full pl-4 pr-12 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-lg focus:outline-none focus:ring-2 focus:ring-cyan-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              placeholder="0"
              min="0"
              disabled={!connected}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          
          {/* Quick Selectors */}
          <div className="flex gap-2 mt-3">
            {[10, 50, 100, 1000].map((val) => (
              <button
                key={val}
                onClick={() => setQuantity(val.toString())}
                disabled={!connected}
                className="flex-1 py-1.5 text-xs font-mono font-medium rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-cyan-primary-600 hover:border-cyan-primary-200 transition-all disabled:opacity-50"
              >
                {val}
              </button>
            ))}
          </div>
        </div>

        {/* --- Order Summary (Receipt Style) --- */}
        {quote && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-cyan-primary-500" />
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Avg. Price</span>
              <span className="text-slate-900 font-mono">{formatCurrency(quote.price)}</span>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Est. Fee</span>
              <span className="text-slate-900 font-mono">{formatCurrency(quote.fee)}</span>
            </div>
            
            <div className="h-px bg-slate-200 w-full my-1" />
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">Total Cost</span>
              <span className="text-lg font-mono font-bold text-cyan-primary-700">
                {formatCurrency(quote.total)}
              </span>
            </div>

            {quote.priceImpact > 0.01 && (
              <div className="flex items-start gap-2 pt-2 text-amber-600 text-xs bg-amber-50 p-2 rounded border border-amber-100">
                <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>High Price Impact: {(quote.priceImpact * 100).toFixed(2)}%</span>
              </div>
            )}
          </div>
        )}

        {/* --- Messages --- */}
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 text-sm font-medium animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 text-sm font-medium animate-in fade-in slide-in-from-top-1">
            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
            {success}
          </div>
        )}

        {/* --- Action Button --- */}
        {!connected ? (
          <WalletMultiButton className="!bg-slate-900 hover:!bg-slate-800 !rounded-xl !w-full !h-12 !font-bold !text-sm !uppercase !tracking-wide shadow-lg shadow-slate-900/20" />
        ) : (
          <Button
            variant={outcome === 'YES' ? 'default' : 'no'} // Uses 'default' (cyan) for Yes, 'no' (rose) for Sell/No logic if needed, or keep generic
            size="lg"
            className={`w-full h-12 text-base font-bold uppercase tracking-wide shadow-lg transition-all ${
                // Dynamic shadow based on outcome color
                outcome === 'YES' ? 'shadow-cyan-primary-500/25 hover:shadow-cyan-primary-500/40' : 'shadow-blue-500/25 hover:shadow-blue-500/40 bg-blue-600 hover:bg-blue-700'
            }`}
            onClick={handleTrade}
            disabled={loading || !pool}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Executing Strategy...</span>
              </div>
            ) : (
              `Confirm ${side} ${outcome}`
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}