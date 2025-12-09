import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return `${value.toFixed(3)} SOL`;
}

export function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

export function formatNumber(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(2)}K`;
  }
  return value.toFixed(2);
}

export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function generateTxHash(): string {
  const chars = '0123456789abcdef';
  let hash = '0x';
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}

export function getTimeRemaining(expirationDate: string): string {
  const now = new Date();
  const expiry = new Date(expirationDate);
  const diff = expiry.getTime() - now.getTime();

  if (diff <= 0) return 'Expired';

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days > 30) return `${Math.floor(days / 30)} months`;
  if (days > 0) return `${days} days`;
  if (hours > 0) return `${hours} hours`;
  return 'Soon';
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'Crypto': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    'Politics': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'Economy': 'bg-green-500/20 text-green-400 border-green-500/30',
    'Sports': 'bg-red-500/20 text-red-400 border-red-500/30',
    'AI & Tech': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'Culture': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  };
  return colors[category] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
}
