'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { formatCurrency, shortenAddress } from '@/lib/utils';
import { Lock, Loader2, History, CheckCircle2, Clock, XCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Trade {
  id: string;
  market_id: string;
  outcome: 'YES' | 'NO';
  side: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  total_cost: number;
  fee: number;
  tx_hash: string;
  status: string;
  created_at: string;
  market?: {
    title: string;
    category: string;
  };
}

export default function WalletPage() {
  const { publicKey, connected } = useWallet();
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!publicKey) {
      setLoading(false);
      return;
    }

    async function fetchTrades() {
      const { data, error } = await supabase
        .from('kalshchain_trades')
        .select('*, market:kalshchain_markets(title, category)')
        .eq('user_id', publicKey?.toBase58())
        .order('created_at', { ascending: false })
        .limit(50);

      if (!error && data) {
        setTrades(data);
      }
      setLoading(false);
    }

    fetchTrades();
  }, [publicKey]);

  if (!connected) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Card className="p-8 text-center">
          <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center">
            <Lock className="h-8 w-8 text-slate-500" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Connect Wallet</h2>
          <p className="text-slate-400 mb-6">View your transaction history by connecting your wallet</p>
          <WalletMultiButton className="!bg-indigo-600 hover:!bg-indigo-700 !rounded-lg !mx-auto" />
        </Card>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle2 className="h-4 w-4 text-emerald-400" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-400" />;
      default:
        return <XCircle className="h-4 w-4 text-rose-400" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Transaction History</h1>
        <p className="text-slate-400">
          Wallet: <span className="text-indigo-400 font-mono">{shortenAddress(publicKey?.toBase58() || '', 6)}</span>
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
              <History className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <div className="text-sm text-slate-400">Total Trades</div>
              <div className="text-xl font-bold text-white">{trades.length}</div>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <ArrowUpRight className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-sm text-slate-400">Total Buy</div>
              <div className="text-xl font-bold text-white">
                {formatCurrency(trades.filter(t => t.side === 'BUY').reduce((sum, t) => sum + Number(t.total_cost), 0))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-rose-500/20 flex items-center justify-center">
              <ArrowDownRight className="h-5 w-5 text-rose-400" />
            </div>
            <div>
              <div className="text-sm text-slate-400">Total Sell</div>
              <div className="text-xl font-bold text-white">
                {formatCurrency(trades.filter(t => t.side === 'SELL').reduce((sum, t) => sum + Number(t.total_cost), 0))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Trades Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
        </div>
      ) : trades.length === 0 ? (
        <Card className="p-12 text-center">
          <History className="h-12 w-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Transactions Yet</h3>
          <p className="text-slate-400 mb-6">Start trading to see your transaction history</p>
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
                  <th className="text-left p-4 text-sm font-medium text-slate-400">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-slate-400">Market</th>
                  <th className="text-center p-4 text-sm font-medium text-slate-400">Side</th>
                  <th className="text-center p-4 text-sm font-medium text-slate-400">Outcome</th>
                  <th className="text-right p-4 text-sm font-medium text-slate-400">Qty</th>
                  <th className="text-right p-4 text-sm font-medium text-slate-400">Price</th>
                  <th className="text-right p-4 text-sm font-medium text-slate-400">Total</th>
                  <th className="text-right p-4 text-sm font-medium text-slate-400">TX</th>
                </tr>
              </thead>
              <tbody>
                {trades.map((trade) => (
                  <tr key={trade.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(trade.status)}
                        <span className="text-xs text-slate-400">
                          {new Date(trade.created_at).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Link href={`/markets/${trade.market_id}`} className="hover:text-indigo-400">
                        <div className="max-w-xs truncate text-white font-medium">
                          {trade.market?.title}
                        </div>
                      </Link>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        trade.side === 'BUY' 
                          ? 'bg-emerald-500/20 text-emerald-400' 
                          : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {trade.side === 'BUY' ? 'BUY' : 'SELL'}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        trade.outcome === 'YES' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                      }`}>
                        {trade.outcome}
                      </span>
                    </td>
                    <td className="p-4 text-right text-white">{Number(trade.quantity).toFixed(2)}</td>
                    <td className="p-4 text-right text-slate-400">{(Number(trade.price) * 100).toFixed(1)}c</td>
                    <td className="p-4 text-right text-white font-medium">{formatCurrency(Number(trade.total_cost))}</td>
                    <td className="p-4 text-right">
                      <span className="text-xs text-slate-500 font-mono">
                        {trade.tx_hash?.slice(0, 8)}...
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
