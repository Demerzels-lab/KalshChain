'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { formatCurrency, formatPercent, shortenAddress } from '@/lib/utils';
import { Lock, Loader2, TrendingUp, TrendingDown, Wallet, ExternalLink } from 'lucide-react';

interface Position {
  id: string;
  market_id: string;
  outcome: 'YES' | 'NO';
  quantity: number;
  avg_price: number;
  unrealized_pnl: number;
  market?: {
    title: string;
    yes_price: number;
    no_price: number;
    category: string;
  };
}

export default function PositionsPage() {
  const { publicKey, connected } = useWallet();
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalValue, setTotalValue] = useState(0);
  const [totalPnl, setTotalPnl] = useState(0);

  useEffect(() => {
    if (!publicKey) {
      setLoading(false);
      return;
    }

    async function fetchPositions() {
      const { data, error } = await supabase
        .from('user_positions')
        .select('*, market:kalshchain_markets(title, yes_price, no_price, category)')
        .eq('user_id', publicKey?.toBase58())
        .gt('quantity', 0);

      if (!error && data) {
        setPositions(data);
        
        let value = 0;
        let pnl = 0;
        data.forEach(pos => {
          const currentPrice = pos.outcome === 'YES' 
            ? Number(pos.market?.yes_price || 0)
            : Number(pos.market?.no_price || 0);
          const posValue = pos.quantity * currentPrice;
          value += posValue;
          pnl += pos.quantity * (currentPrice - pos.avg_price);
        });
        setTotalValue(value);
        setTotalPnl(pnl);
      }
      setLoading(false);
    }

    fetchPositions();
  }, [publicKey]);

  if (!connected) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Card className="p-8 text-center">
          <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center">
            <Lock className="h-8 w-8 text-slate-500" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Connect Wallet</h2>
          <p className="text-slate-400 mb-6">View your trading positions by connecting your wallet</p>
          <WalletMultiButton className="!bg-indigo-600 hover:!bg-indigo-700 !rounded-lg !mx-auto" />
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">My Positions</h1>
        <p className="text-slate-400">
          Wallet: <span className="text-indigo-400 font-mono">{shortenAddress(publicKey?.toBase58() || '', 6)}</span>
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
              <Wallet className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <div className="text-sm text-slate-400">Total Positions</div>
              <div className="text-xl font-bold text-white">{positions.length}</div>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-sm text-slate-400">Portfolio Value</div>
              <div className="text-xl font-bold text-white">{formatCurrency(totalValue)}</div>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
              totalPnl >= 0 ? 'bg-emerald-500/20' : 'bg-rose-500/20'
            }`}>
              {totalPnl >= 0 
                ? <TrendingUp className="h-5 w-5 text-emerald-400" />
                : <TrendingDown className="h-5 w-5 text-rose-400" />
              }
            </div>
            <div>
              <div className="text-sm text-slate-400">Unrealized PnL</div>
              <div className={`text-xl font-bold ${totalPnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {totalPnl >= 0 ? '+' : ''}{formatCurrency(totalPnl)}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Positions Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
        </div>
      ) : positions.length === 0 ? (
        <Card className="p-12 text-center">
          <Wallet className="h-12 w-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Positions Yet</h3>
          <p className="text-slate-400 mb-6">Start trading to build your portfolio</p>
          <Link href="/explore">
            <button className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
              Explore Markets
            </button>
          </Link>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left p-4 text-sm font-medium text-slate-400">Market</th>
                  <th className="text-center p-4 text-sm font-medium text-slate-400">Outcome</th>
                  <th className="text-right p-4 text-sm font-medium text-slate-400">Quantity</th>
                  <th className="text-right p-4 text-sm font-medium text-slate-400">Avg Price</th>
                  <th className="text-right p-4 text-sm font-medium text-slate-400">Current</th>
                  <th className="text-right p-4 text-sm font-medium text-slate-400">PnL</th>
                  <th className="text-right p-4 text-sm font-medium text-slate-400"></th>
                </tr>
              </thead>
              <tbody>
                {positions.map((pos) => {
                  const currentPrice = pos.outcome === 'YES' 
                    ? Number(pos.market?.yes_price || 0)
                    : Number(pos.market?.no_price || 0);
                  const pnl = pos.quantity * (currentPrice - pos.avg_price);
                  
                  return (
                    <tr key={pos.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                      <td className="p-4">
                        <div className="max-w-xs truncate text-white font-medium">
                          {pos.market?.title}
                        </div>
                        <div className="text-xs text-slate-500">{pos.market?.category}</div>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          pos.outcome === 'YES' 
                            ? 'bg-emerald-500/20 text-emerald-400' 
                            : 'bg-rose-500/20 text-rose-400'
                        }`}>
                          {pos.outcome}
                        </span>
                      </td>
                      <td className="p-4 text-right text-white">{pos.quantity.toFixed(2)}</td>
                      <td className="p-4 text-right text-slate-400">{formatPercent(pos.avg_price)}</td>
                      <td className="p-4 text-right text-white">{formatPercent(currentPrice)}</td>
                      <td className={`p-4 text-right font-medium ${pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {pnl >= 0 ? '+' : ''}{formatCurrency(pnl)}
                      </td>
                      <td className="p-4 text-right">
                        <Link href={`/markets/${pos.market_id}`}>
                          <button className="p-2 text-slate-400 hover:text-white">
                            <ExternalLink className="h-4 w-4" />
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
