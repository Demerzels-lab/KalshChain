# KalshChain - Platform Prediction Market Terdesentralisasi

Platform prediction market terdesentralisasi dengan integrasi Solana wallet, menggabungkan gaya Kalshi dan Polymarket.

## Fitur Utama

- **Real Solana Wallet Integration**: Phantom wallet support via Solana Wallet Adapter
- **70+ Markets**: 25 On-Chain markets + 45 Kalshi 2026 markets
- **Mock AMM Trading Engine**: Constant product curve dengan liquidity pools
- **Wallet Connection Gating**: "Connect Wallet to Trade" pada semua trading panel
- **Multi-Category Markets**: Crypto, Politics, Economy, Sports, AI & Tech, Culture
- **Responsive Design**: Dark theme dengan modern trading-focused UI

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, TailwindCSS
- **UI Components**: Custom shadcn/ui-style components
- **Charts**: Recharts
- **Wallet**: Solana Wallet Adapter + Phantom
- **Backend**: Supabase (PostgreSQL)
- **State Management**: React Hooks + Context

## Halaman

- `/` - Homepage dengan market overview
- `/explore` - Eksplorasi semua markets dengan filter
- `/markets/[id]` - Detail market dengan trading panel
- `/create` - Buat market baru (memerlukan wallet)
- `/positions` - Lihat posisi trading
- `/wallet` - Riwayat transaksi

## Cara Menjalankan

### Prerequisites

- Node.js 18+
- npm
- Phantom Wallet extension (untuk trading)

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

4. Jalankan development server:
   ```bash
   npm run dev
   ```

5. Buka http://localhost:3000

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

Platform menggunakan mock AMM (Automated Market Maker) dengan:
- **Constant Product Formula**: x * y = k
- **Fee Rate**: 2% per transaksi
- **Slippage Calculation**: Berdasarkan ukuran trade vs liquidity
- **Mock Blockchain Transactions**: Signature verification via Phantom

## Kategori Market

1. **Crypto**: Bitcoin, Ethereum, Solana, DeFi
2. **Politics**: Pemilu, kebijakan, geopolitik
3. **Economy**: Makroekonomi, saham, mata uang
4. **Sports**: Sepakbola, F1, NBA, tennis
5. **AI & Tech**: OpenAI, Tesla, SpaceX, quantum
6. **Culture**: Musik, film, streaming, entertainment

## License

MIT
