import { AMMQuote, LiquidityPool } from '@/types';

const FEE_RATE = 0.02;

export function calculateAMMQuote(
  pool: LiquidityPool,
  outcome: 'YES' | 'NO',
  side: 'BUY' | 'SELL',
  quantity: number
): AMMQuote {
  const yesReserve = Number(pool.yes_reserve);
  const noReserve = Number(pool.no_reserve);
  const k = yesReserve * noReserve;
  
  let cost: number;
  let newYesReserve: number;
  let newNoReserve: number;
  
  if (side === 'BUY') {
    if (outcome === 'YES') {
      newYesReserve = yesReserve - quantity;
      newNoReserve = k / newYesReserve;
      cost = newNoReserve - noReserve;
    } else {
      newNoReserve = noReserve - quantity;
      newYesReserve = k / newNoReserve;
      cost = newYesReserve - yesReserve;
    }
  } else {
    if (outcome === 'YES') {
      newYesReserve = yesReserve + quantity;
      newNoReserve = k / newYesReserve;
      cost = noReserve - newNoReserve;
    } else {
      newNoReserve = noReserve + quantity;
      newYesReserve = k / newNoReserve;
      cost = yesReserve - newYesReserve;
    }
  }
  
  const fee = Math.abs(cost) * FEE_RATE;
  const total = side === 'BUY' ? cost + fee : cost - fee;
  const price = Math.abs(cost / quantity);
  
  const totalReserves = newYesReserve + newNoReserve;
  const newYesPrice = newNoReserve / totalReserves;
  const newNoPrice = newYesReserve / totalReserves;
  
  const oldPrice = outcome === 'YES' 
    ? noReserve / (yesReserve + noReserve)
    : yesReserve / (yesReserve + noReserve);
  const priceImpact = Math.abs((price - oldPrice) / oldPrice);
  
  return {
    price,
    cost: Math.abs(cost),
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
