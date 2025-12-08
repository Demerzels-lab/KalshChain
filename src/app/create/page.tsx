'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { Lock, Loader2, CheckCircle2, AlertCircle, PlusCircle } from 'lucide-react';

const categories = ['Crypto', 'Politics', 'Economy', 'Sports', 'AI & Tech', 'Culture'];

export default function CreateMarketPage() {
  const router = useRouter();
  const { publicKey, connected, signMessage } = useWallet();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Crypto');
  const [expirationDate, setExpirationDate] = useState('');
  const [initialLiquidity, setInitialLiquidity] = useState('1000');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!publicKey || !signMessage) return;

    setLoading(true);
    setError(null);

    try {
      // Validate
      if (!title.trim()) throw new Error('Title is required');
      if (!expirationDate) throw new Error('Expiration date is required');

      const expDate = new Date(expirationDate);
      if (expDate <= new Date()) throw new Error('Expiration date must be in the future');

      // Sign message
      const message = new TextEncoder().encode(
        `KalshChain: Create Market "${title}" by ${publicKey.toBase58()}`
      );
      await signMessage(message);

      const walletAddress = publicKey.toBase58();
      const liquidity = parseFloat(initialLiquidity) || 1000;

      // Create market
      const { data: market, error: marketError } = await supabase
        .from('kalshchain_markets')
        .insert({
          title: title.trim(),
          description: description.trim() || null,
          category,
          market_type: 'on-chain',
          expiration_date: expDate.toISOString(),
          status: 'active',
          yes_price: 0.5,
          no_price: 0.5,
          total_volume: 0,
          creator_wallet: walletAddress,
          is_kalshi: false
        })
        .select()
        .single();

      if (marketError) throw marketError;

      // Create liquidity pool
      const halfLiquidity = liquidity / 2;
      await supabase
        .from('liquidity_pools')
        .insert({
          market_id: market.id,
          yes_reserve: halfLiquidity,
          no_reserve: halfLiquidity,
          k_constant: halfLiquidity * halfLiquidity,
          tvl: liquidity,
          total_volume: 0,
          fee_rate: 0.02,
          fee_rewards: 0
        });

      setSuccess(true);
      setTimeout(() => router.push(`/markets/${market.id}`), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create market');
    } finally {
      setLoading(false);
    }
  };

  if (!connected) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Card className="p-8 text-center">
          <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center">
            <Lock className="h-8 w-8 text-slate-500" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Connect Wallet</h2>
          <p className="text-slate-400 mb-6">
            You need a Phantom wallet to create a prediction market
          </p>
          <WalletMultiButton className="!bg-indigo-600 hover:!bg-indigo-700 !rounded-lg !mx-auto" />
        </Card>
      </div>
    );
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Card className="p-8 text-center">
          <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-emerald-500" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Market Created Successfully!</h2>
          <p className="text-slate-400">Redirecting to market page...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Create New Market</h1>
        <p className="text-slate-400">Create your own on-chain prediction market</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5 text-indigo-400" />
            Market Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Market Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Example: Will Bitcoin reach $100K before 2026?"
                className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain the market resolution criteria..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Expiration Date *
                </label>
                <input
                  type="datetime-local"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Initial Liquidity (USD)
              </label>
              <input
                type="number"
                value={initialLiquidity}
                onChange={(e) => setInitialLiquidity(e.target.value)}
                min="100"
                step="100"
                className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <p className="text-xs text-slate-500 mt-1">
                Initial liquidity will be split equally between YES and NO pools
              </p>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating Market...
                </>
              ) : (
                'Create Market'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
