# KalshChain - Decentralized Prediction Market Platform

Decentralized prediction market platform with Solana wallet integration, combining Kalshi and Polymarket styles.

## Key Features

- **Real Solana Wallet Integration**: Phantom wallet support via Solana Wallet Adapter
- **70+ Markets**: 25 On-Chain markets + 45 Kalshi 2026 markets
- **Mock AMM Trading Engine**: Constant product curve with liquidity pools
- **Wallet Connection Gating**: "Connect Wallet to Trade" on all trading panels
- **Multi-Category Markets**: Crypto, Politics, Economy, Sports, AI & Tech, Culture
- **Responsive Design**: Dark theme with modern trading-focused UI

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, TailwindCSS
- **UI Components**: Custom shadcn/ui-style components
- **Charts**: Recharts
- **Wallet**: Solana Wallet Adapter + Phantom
- **Backend**: Supabase (PostgreSQL)
- **State Management**: React Hooks + Context

## Pages

- `/` - Homepage with market overview
- `/explore` - Explore all markets with filters
- `/markets/[id]` - Market detail with trading panel
- `/create` - Create new market (requires wallet)
- `/positions` - View trading positions
- `/wallet` - Transaction history

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- Phantom Wallet extension (for trading)

### Setup

1. Clone repository
2. Install dependencies:
   ```bash
   cd kalshchain
   npm install
   ```

3. Setup environment variables (`.env.local`):
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run development server:
   ```bash
   npm run dev
   ```

5. Open http://localhost:3000

### Production Build

```bash
npm run build
npm run start
```

## Database Schema

### kalshchain_markets
- id, title, description, category
- market_type (on-chain/kalshi)
- expiration_date, status
- yes_price, no_price
- total_volume, is_kalshi

### liquidity_pools
- market_id, yes_reserve, no_reserve
- k_constant, tvl, total_volume
- fee_rate, fee_rewards

### kalshchain_trades
- user_id, market_id, outcome
- side (BUY/SELL), quantity, price
- total_cost, fee, tx_hash, status

### user_positions
- user_id, market_id, outcome
- quantity, avg_price
- unrealized_pnl, realized_pnl

## Trading Engine

Platform uses mock AMM (Automated Market Maker) with:
- **Constant Product Formula**: x * y = k
- **Fee Rate**: 2% per transaction
- **Slippage Calculation**: Based on trade size vs liquidity
- **Mock Blockchain Transactions**: Signature verification via Phantom

## Market Categories

1. **Crypto**: Bitcoin, Ethereum, Solana, DeFi
2. **Politics**: Elections, policies, geopolitics
3. **Economy**: Macroeconomics, stocks, currencies
4. **Sports**: Soccer, F1, NBA, tennis
5. **AI & Tech**: OpenAI, Tesla, SpaceX, quantum
6. **Culture**: Music, movies, streaming, entertainment

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

The MIT License is a permissive free software license that allows you to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, subject to the following conditions:

- The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
- THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
