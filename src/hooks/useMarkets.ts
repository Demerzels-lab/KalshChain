'use client';

import { useState, useEffect, useCallback } from 'react';
import { Market, LiquidityPool } from '@/types';
import { supabase } from '@/lib/supabase';

export function useMarkets() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMarkets = useCallback(async () => {
    try {
      if (!supabase) {
        throw new Error('Database connection not available');
      }

      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('kalshchain_markets')
        .select('*')
        .order('total_volume', { ascending: false });

      if (fetchError) throw fetchError;
      setMarkets(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memuat data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMarkets();
  }, [fetchMarkets]);

  return { markets, loading, error, refetch: fetchMarkets };
}

export function useMarket(id: string) {
  const [market, setMarket] = useState<Market | null>(null);
  const [pool, setPool] = useState<LiquidityPool | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      if (!supabase) {
        console.error('Database connection not available');
        setLoading(false);
        return;
      }

      try {
        const [marketRes, poolRes] = await Promise.all([
          supabase.from('kalshchain_markets').select('*').eq('id', id).single(),
          supabase.from('liquidity_pools').select('*').eq('market_id', id).single()
        ]);

        if (marketRes.data) setMarket(marketRes.data);
        if (poolRes.data) setPool(poolRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [id]);

  return { market, pool, loading };
}
