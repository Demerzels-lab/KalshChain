// Seed script for KalshChain markets
// Run with: npx ts-node scripts/seed.ts

const SUPABASE_URL = 'https://hczrquegpsgehiglprqq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjenJxdWVncHNnZWhpZ2xwcnFxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDY3MDgxOSwiZXhwIjoyMDgwMjQ2ODE5fQ.Z2O-LJN5hRzr1gKczkBV46K-JlCinLZcVhlsjJikd64';

// On-Chain Markets (20-30)
const onChainMarkets = [
  { title: 'Will Bitcoin reach $150K before the end of 2026?', category: 'Crypto', yes_price: 0.35 },
  { title: 'Will Ethereum flip Bitcoin in market cap by 2026?', category: 'Crypto', yes_price: 0.12 },
  { title: 'Will Solana TVL exceed $50B in 2026?', category: 'Crypto', yes_price: 0.42 },
  { title: 'Will a Solana ETF be approved in the US before July 2026?', category: 'Crypto', yes_price: 0.58 },
  { title: 'Will Dogecoin reach $1 in 2026?', category: 'Crypto', yes_price: 0.08 },
  { title: 'Will total crypto market cap reach $10 trillion in 2026?', category: 'Crypto', yes_price: 0.28 },
  { title: 'Will Indonesia have comprehensive crypto regulation in 2026?', category: 'Crypto', yes_price: 0.45 },
  { title: 'Will a stablecoin lose its peg in 2026?', category: 'Crypto', yes_price: 0.22 },
  { title: 'Will AI surpass humans in coding benchmarks in 2026?', category: 'AI & Tech', yes_price: 0.72 },
  { title: 'Will OpenAI release GPT-5 before June 2026?', category: 'AI & Tech', yes_price: 0.65 },
  { title: 'Will Apple release a dedicated AI chip for iPhone in 2026?', category: 'AI & Tech', yes_price: 0.55 },
  { title: 'Will Tesla achieve Full Self-Driving Level 4 in 2026?', category: 'AI & Tech', yes_price: 0.32 },
  { title: 'Will commercial humanoid robots be sold to the public in 2026?', category: 'AI & Tech', yes_price: 0.48 },
  { title: 'Will Neuralink get FDA approval for brain implants in 2026?', category: 'AI & Tech', yes_price: 0.38 },
  { title: 'Will US inflation fall below 2% in 2026?', category: 'Economy', yes_price: 0.42 },
  { title: 'Will the Fed lower interest rates below 3% in 2026?', category: 'Economy', yes_price: 0.55 },
  { title: 'Will Indonesia GDP growth exceed 5.5% in 2026?', category: 'Economy', yes_price: 0.62 },
  { title: 'Will the rupiah strengthen below Rp14,000/USD in 2026?', category: 'Economy', yes_price: 0.28 },
  { title: 'Will oil prices exceed $100/barrel in 2026?', category: 'Economy', yes_price: 0.35 },
  { title: 'Will the S&P 500 reach 7000 in 2026?', category: 'Economy', yes_price: 0.45 },
  { title: 'Will Manchester City win the Premier League 2025/26?', category: 'Sports', yes_price: 0.38 },
  { title: 'Will Indonesia qualify for the 2026 World Cup?', category: 'Sports', yes_price: 0.15 },
  { title: 'Will Lewis Hamilton win the 2026 F1 championship?', category: 'Sports', yes_price: 0.22 },
  { title: 'Will Taylor Swift hold a concert in Indonesia in 2026?', category: 'Culture', yes_price: 0.52 },
  { title: 'Will an Indonesian film win an Oscar in 2026?', category: 'Culture', yes_price: 0.08 },
];

// Kalshi 2026 Markets (40-50)
const kalshiMarkets = [
  { title: 'Will Donald Trump be US President in January 2026?', category: 'Politics', yes_price: 0.88 },
  { title: 'Will Democrats control the House of Representatives in 2026?', category: 'Politics', yes_price: 0.35 },
  { title: 'Will a new major war start in 2026?', category: 'Politics', yes_price: 0.18 },
  { title: 'Will the Russia-Ukraine conflict end in 2026?', category: 'Politics', yes_price: 0.25 },
  { title: 'Will China take military action against Taiwan in 2026?', category: 'Politics', yes_price: 0.08 },
  { title: 'Will the UK rejoin the EU single market in 2026?', category: 'Politics', yes_price: 0.05 },
  { title: 'Will a new country join NATO in 2026?', category: 'Politics', yes_price: 0.42 },
  { title: 'Will Israel-Palestine reach a peace agreement in 2026?', category: 'Politics', yes_price: 0.12 },
  { title: 'Will US GDP growth exceed 3% in 2026?', category: 'Economy', yes_price: 0.38 },
  { title: 'Will US unemployment rate rise above 5% in 2026?', category: 'Economy', yes_price: 0.28 },
  { title: 'Will Bitcoin become legal tender in another G20 country in 2026?', category: 'Crypto', yes_price: 0.15 },
  { title: 'Will a Central Bank Digital Currency (CBDC) launch in the US in 2026?', category: 'Crypto', yes_price: 0.22 },
  { title: 'Will the SEC approve more than 5 new crypto ETFs in 2026?', category: 'Crypto', yes_price: 0.55 },
  { title: 'Will DeFi TVL reach $500B in 2026?', category: 'Crypto', yes_price: 0.32 },
  { title: 'Will a major crypto exchange go bankrupt in 2026?', category: 'Crypto', yes_price: 0.25 },
  { title: 'Will the NFT market recover to 2021 levels in 2026?', category: 'Crypto', yes_price: 0.18 },
  { title: 'Will AGI (Artificial General Intelligence) be achieved in 2026?', category: 'AI & Tech', yes_price: 0.15 },
  { title: 'Will Google release a serious ChatGPT competitor in 2026?', category: 'AI & Tech', yes_price: 0.82 },
  { title: 'Will Meta achieve profitability in Metaverse division in 2026?', category: 'AI & Tech', yes_price: 0.28 },
  { title: 'Will Apple Vision Pro sell more than 10 million units in 2026?', category: 'AI & Tech', yes_price: 0.35 },
  { title: 'Will SpaceX land humans on Mars before 2030?', category: 'AI & Tech', yes_price: 0.22 },
  { title: 'Will quantum computers break standard encryption in 2026?', category: 'AI & Tech', yes_price: 0.08 },
  { title: 'Will a major cybersecurity breach affect over 1 billion people in 2026?', category: 'AI & Tech', yes_price: 0.45 },
  { title: 'Will Twitter/X be sold to a new owner in 2026?', category: 'Culture', yes_price: 0.18 },
  { title: 'Will a movie gross over $3 billion at the box office in 2026?', category: 'Culture', yes_price: 0.25 },
  { title: 'Will K-Pop group BTS reunite for a tour in 2026?', category: 'Culture', yes_price: 0.72 },
  { title: 'Will esports become an Olympic event in 2026?', category: 'Culture', yes_price: 0.15 },
  { title: 'Will a new streaming platform surpass Netflix in subscribers in 2026?', category: 'Culture', yes_price: 0.12 },
  { title: 'Will Argentina defend Copa America 2026?', category: 'Sports', yes_price: 0.35 },
  { title: 'Will LeBron James retire from the NBA in 2026?', category: 'Sports', yes_price: 0.28 },
  { title: 'Will the 2026 World Cup have over 5 billion global viewers?', category: 'Sports', yes_price: 0.65 },
  { title: 'Will Real Madrid win the Champions League 2025/26?', category: 'Sports', yes_price: 0.28 },
  { title: 'Will an athlete break the 100m sprint record in 2026?', category: 'Sports', yes_price: 0.18 },
  { title: 'Will Novak Djokovic win a Grand Slam in 2026?', category: 'Sports', yes_price: 0.42 },
  { title: 'Will the WHO declare a new pandemic in 2026?', category: 'Economy', yes_price: 0.15 },
  { title: 'Will global temperature rise over 1.5C above pre-industrial levels in 2026?', category: 'Economy', yes_price: 0.55 },
  { title: 'Will gold prices reach $3000/oz in 2026?', category: 'Economy', yes_price: 0.48 },
  { title: 'Will US housing prices drop more than 10% in 2026?', category: 'Economy', yes_price: 0.22 },
  { title: 'Will the US federal minimum wage be raised in 2026?', category: 'Economy', yes_price: 0.35 },
  { title: 'Will Japan exit deflation in 2026?', category: 'Economy', yes_price: 0.58 },
  { title: 'Will the Euro reach parity with USD in 2026?', category: 'Economy', yes_price: 0.32 },
  { title: 'Will BRICS launch a common currency in 2026?', category: 'Economy', yes_price: 0.18 },
  { title: 'Will electric vehicles reach 30% global market share in 2026?', category: 'Economy', yes_price: 0.45 },
  { title: 'Will commercial fusion energy be available in 2026?', category: 'AI & Tech', yes_price: 0.08 },
  { title: 'Will Elon Musk remain the richest person in the world at the end of 2026?', category: 'Economy', yes_price: 0.52 },
];

async function seed() {
  console.log('Seeding KalshChain markets...');
  
  // Seed on-chain markets
  for (const market of onChainMarkets) {
    const expDate = new Date();
    expDate.setMonth(expDate.getMonth() + Math.floor(Math.random() * 18) + 6);
    
    const marketData = {
      title: market.title,
      description: `Prediction market for: ${market.title}`,
      category: market.category,
      market_type: 'on-chain',
      expiration_date: expDate.toISOString(),
      status: 'active',
      yes_price: market.yes_price,
      no_price: 1 - market.yes_price,
      total_volume: Math.floor(Math.random() * 500000) + 10000,
      is_kalshi: false,
    };
    
    const res = await fetch(`${SUPABASE_URL}/rest/v1/kalshchain_markets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(marketData)
    });
    
    if (res.ok) {
      const data = await res.json();
      const marketId = data[0]?.id;
      if (marketId) {
        // Create liquidity pool
        const liquidity = Math.floor(Math.random() * 50000) + 5000;
        await fetch(`${SUPABASE_URL}/rest/v1/liquidity_pools`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
          },
          body: JSON.stringify({
            market_id: marketId,
            yes_reserve: liquidity * (1 - market.yes_price),
            no_reserve: liquidity * market.yes_price,
            k_constant: liquidity * liquidity * market.yes_price * (1 - market.yes_price),
            tvl: liquidity,
            total_volume: Math.floor(Math.random() * 100000),
            fee_rate: 0.02,
            fee_rewards: Math.floor(Math.random() * 1000)
          })
        });
      }
      console.log(`Created: ${market.title.slice(0, 50)}...`);
    }
  }
  
  // Seed Kalshi markets
  for (const market of kalshiMarkets) {
    const expDate = new Date();
    expDate.setMonth(expDate.getMonth() + Math.floor(Math.random() * 12) + 12);
    
    const marketData = {
      title: market.title,
      description: `Kalshi 2026 market: ${market.title}`,
      category: market.category,
      market_type: 'kalshi',
      expiration_date: expDate.toISOString(),
      status: 'active',
      yes_price: market.yes_price,
      no_price: 1 - market.yes_price,
      total_volume: Math.floor(Math.random() * 1000000) + 50000,
      is_kalshi: true,
    };
    
    const res = await fetch(`${SUPABASE_URL}/rest/v1/kalshchain_markets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(marketData)
    });
    
    if (res.ok) {
      const data = await res.json();
      const marketId = data[0]?.id;
      if (marketId) {
        const liquidity = Math.floor(Math.random() * 100000) + 10000;
        await fetch(`${SUPABASE_URL}/rest/v1/liquidity_pools`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
          },
          body: JSON.stringify({
            market_id: marketId,
            yes_reserve: liquidity * (1 - market.yes_price),
            no_reserve: liquidity * market.yes_price,
            k_constant: liquidity * liquidity * market.yes_price * (1 - market.yes_price),
            tvl: liquidity,
            total_volume: Math.floor(Math.random() * 200000),
            fee_rate: 0.02,
            fee_rewards: Math.floor(Math.random() * 2000)
          })
        });
      }
      console.log(`Created Kalshi: ${market.title.slice(0, 50)}...`);
    }
  }
  
  console.log('Seeding complete!');
}

seed().catch(console.error);
