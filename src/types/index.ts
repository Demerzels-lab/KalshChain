export interface Market {
  id: string;
  title: string;
  description: string | null;
  category: string;
  market_type: 'on-chain' | 'kalshi';
  expiration_date: string;
  status: 'active' | 'resolved' | 'pending';
  yes_price: number;
  no_price: number;
  total_volume: number;
  resolution: string | null;
  resolved_at: string | null;
  creator_wallet: string | null;
  is_kalshi: boolean;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface LiquidityPool {
  id: string;
  market_id: string;
  yes_reserve: number;
  no_reserve: number;
  k_constant: number;
  tvl: number;
  total_volume: number;
  fee_rate: number;
  fee_rewards: number;
  created_at: string;
  updated_at: string;
}

export interface Trade {
  id: string;
  user_id: string;
  market_id: string;
  outcome: 'YES' | 'NO';
  side: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  total_cost: number;
  fee: number;
  tx_hash: string | null;
  status: 'pending' | 'confirmed' | 'failed';
  created_at: string;
}

export interface UserPosition {
  id: string;
  user_id: string;
  market_id: string;
  outcome: 'YES' | 'NO';
  quantity: number;
  avg_price: number;
  unrealized_pnl: number;
  realized_pnl: number;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  wallet_address: string;
  display_name: string | null;
  balance: number;
  created_at: string;
  updated_at: string;
}

export interface TradeParams {
  marketId: string;
  outcome: 'YES' | 'NO';
  side: 'BUY' | 'SELL';
  quantity: number;
  walletAddress: string;
}

export interface AMMQuote {
  price: number;
  cost: number;
  fee: number;
  total: number;
  priceImpact: number;
  newYesPrice: number;
  newNoPrice: number;
}
