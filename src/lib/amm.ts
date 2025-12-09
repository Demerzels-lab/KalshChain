import { AMMQuote, LiquidityPool } from '@/types';

const FEE_RATE = 0.02;
const PRICE_PER_SHARE = 0.01; // 1 share = 0.01 SOL

export function calculateAMMQuote(
  pool: LiquidityPool,
  outcome: 'YES' | 'NO',
  side: 'BUY' | 'SELL',
  quantity: number
): AMMQuote {
  // Fixed pricing: 1 share = 0.01 SOL
  const baseCost = quantity * PRICE_PER_SHARE;
  const fee = baseCost * FEE_RATE;
  const total = side === 'BUY' ? baseCost + fee : baseCost - fee;
  const price = PRICE_PER_SHARE;
  
  // For simplicity, maintain the same reserve calculations for price updates
  const yesReserve = Number(pool.yes_reserve);
  const noReserve = Number(pool.no_reserve);
  const k = yesReserve * noReserve;
  
  let newYesReserve: number;
  let newNoReserve: number;
  
  if (side === 'BUY') {
    if (outcome === 'YES') {
      newYesReserve = yesReserve - quantity;
      newNoReserve = k / newYesReserve;
    } else {
      newNoReserve = noReserve - quantity;
      newYesReserve = k / newNoReserve;
    }
  } else {
    if (outcome === 'YES') {
      newYesReserve = yesReserve + quantity;
      newNoReserve = k / newYesReserve;
    } else {
      newNoReserve = noReserve + quantity;
      newYesReserve = k / newNoReserve;
    }
  }
  
  const totalReserves = newYesReserve + newNoReserve;
  const newYesPrice = newNoReserve / totalReserves;
  const newNoPrice = newYesReserve / totalReserves;
  
  const oldPrice = outcome === 'YES' 
    ? noReserve / (yesReserve + noReserve)
    : yesReserve / (yesReserve + noReserve);
  const priceImpact = Math.abs((price - oldPrice) / oldPrice);
  
  return {
    price,
    cost: baseCost,
    fee,
    total: Math.abs(total),
    priceImpact,
    newYesPrice,
    newNoPrice,
  };
}

export function getCurrentPrices(pool: LiquidityPool): { yes: number; no: number } {
  const yesReserve = Number(pool.yes_reserve);
  const noReserve = Number(pool.no_reserve);
  const total = yesReserve + noReserve;
  
  return {
    yes: noReserve / total,
    no: yesReserve / total,
  };
}

export function estimateSlippage(
  pool: LiquidityPool,
  outcome: 'YES' | 'NO',
  quantity: number
): number {
  const quote = calculateAMMQuote(pool, outcome, 'BUY', quantity);
  return quote.priceImpact;
}
