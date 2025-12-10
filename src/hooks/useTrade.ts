'use client';

import { useState, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { supabase } from '@/lib/supabase';
import { calculateAMMQuote } from '@/lib/amm';
import { generateTxHash } from '@/lib/utils';
import { LiquidityPool, AMMQuote } from '@/types';

export function useTrade(marketId: string, pool: LiquidityPool | null) {
  const { publicKey, signMessage } = useWallet();
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState<AMMQuote | null>(null);

  const getQuote = useCallback((outcome: 'YES' | 'NO', side: 'BUY' | 'SELL', quantity: number) => {
    if (!pool || quantity <= 0) {
      setQuote(null);
      return null;
    }
    const q = calculateAMMQuote(pool, outcome, side, quantity);
    setQuote(q);
    return q;
  }, [pool]);

  const executeTrade = useCallback(async (
    outcome: 'YES' | 'NO',
    side: 'BUY' | 'SELL',
    quantity: number
  ) => {
    if (!publicKey || !pool || !signMessage) {
      throw new Error('Wallet tidak terhubung');
    }

    if (!supabase) {
      throw new Error('Database connection not available');
    }

    setLoading(true);
    try {
      const currentQuote = calculateAMMQuote(pool, outcome, side, quantity);
      
      // Sign message for mock blockchain verification
      const message = new TextEncoder().encode(
        `KalshChain Trade: ${side} ${quantity} ${outcome} @ ${currentQuote.price.toFixed(4)}`
      );
      await signMessage(message);

      const txHash = generateTxHash();
      const walletAddress = publicKey.toBase58();

      // Insert trade
      const { error: tradeError } = await supabase
        .from('kalshchain_trades')
        .insert({
          user_id: walletAddress,
          market_id: marketId,
          outcome,
          side,
          quantity,
          price: currentQuote.price,
          total_cost: currentQuote.total,
          fee: currentQuote.fee,
          tx_hash: txHash,
          status: 'confirmed'
        });

      if (tradeError) throw tradeError;

      // Update liquidity pool
      const newYesReserve = outcome === 'YES'
        ? (side === 'BUY' ? pool.yes_reserve - quantity : pool.yes_reserve + quantity)
        : pool.yes_reserve;
      const newNoReserve = outcome === 'NO'
        ? (side === 'BUY' ? pool.no_reserve - quantity : pool.no_reserve + quantity)
        : pool.no_reserve;

      await supabase
        .from('liquidity_pools')
        .update({
          yes_reserve: newYesReserve,
          no_reserve: newNoReserve,
          total_volume: pool.total_volume + currentQuote.total,
          fee_rewards: pool.fee_rewards + currentQuote.fee
        })
        .eq('market_id', marketId);

      // Update market prices
      await supabase
        .from('kalshchain_markets')
        .update({
          yes_price: currentQuote.newYesPrice,
          no_price: currentQuote.newNoPrice,
          total_volume: pool.total_volume + currentQuote.total
        })
        .eq('id', marketId);

      // Upsert user position
      const { data: existingPos } = await supabase
        .from('user_positions')
        .select('*')
        .eq('user_id', walletAddress)
        .eq('market_id', marketId)
        .eq('outcome', outcome)
        .single();

      if (existingPos) {
        const newQty = side === 'BUY' 
          ? existingPos.quantity + quantity 
          : existingPos.quantity - quantity;
        
        await supabase
          .from('user_positions')
          .update({ quantity: newQty, updated_at: new Date().toISOString() })
          .eq('id', existingPos.id);
      } else if (side === 'BUY') {
        await supabase
          .from('user_positions')
          .insert({
            user_id: walletAddress,
            market_id: marketId,
            outcome,
            quantity,
            avg_price: currentQuote.price
          });
      }

      return { txHash, quote: currentQuote };
    } finally {
      setLoading(false);
    }
  }, [publicKey, pool, signMessage, marketId]);

  return { quote, getQuote, executeTrade, loading };
}
