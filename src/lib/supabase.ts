import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Only throw error if we're in browser and env vars are missing
// During build time on Vercel, env vars might not be available
if (typeof window !== 'undefined' && (!supabaseUrl || !supabaseAnonKey)) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
}

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export async function getMarkets() {
  if (!supabase) throw new Error('Supabase client not initialized');
  const { data, error } = await supabase
    .from('kalshchain_markets')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function getMarketById(id: string) {
  if (!supabase) throw new Error('Supabase client not initialized');
  const { data, error } = await supabase
    .from('kalshchain_markets')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function getLiquidityPool(marketId: string) {
  if (!supabase) throw new Error('Supabase client not initialized');
  const { data, error } = await supabase
    .from('liquidity_pools')
    .select('*')
    .eq('market_id', marketId)
    .single();
  
  if (error) return null;
  return data;
}

export async function getUserPositions(walletAddress: string) {
  if (!supabase) throw new Error('Supabase client not initialized');
  const { data, error } = await supabase
    .from('user_positions')
    .select('*, market:kalshchain_markets(*)')
    .eq('user_id', walletAddress);
  
  if (error) throw error;
  return data;
}

export async function getTradeHistory(walletAddress: string) {
  if (!supabase) throw new Error('Supabase client not initialized');
  const { data, error } = await supabase
    .from('kalshchain_trades')
    .select('*, market:kalshchain_markets(*)')
    .eq('user_id', walletAddress)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}
