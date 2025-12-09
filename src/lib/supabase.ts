import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getMarkets() {
  const { data, error } = await supabase
    .from('kalshchain_markets')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function getMarketById(id: string) {
  const { data, error } = await supabase
    .from('kalshchain_markets')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function getLiquidityPool(marketId: string) {
  const { data, error } = await supabase
    .from('liquidity_pools')
    .select('*')
    .eq('market_id', marketId)
    .single();
  
  if (error) return null;
  return data;
}

export async function getUserPositions(walletAddress: string) {
  const { data, error } = await supabase
    .from('user_positions')
    .select('*, market:kalshchain_markets(*)')
    .eq('user_id', walletAddress);
  
  if (error) throw error;
  return data;
}

export async function getTradeHistory(walletAddress: string) {
  const { data, error } = await supabase
    .from('kalshchain_trades')
    .select('*, market:kalshchain_markets(*)')
    .eq('user_id', walletAddress)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}
