import { createClient } from '@supabase/supabase-js';
import { MarketDetailClient } from './MarketDetailClient';

// Generate static params for all markets
export async function generateStaticParams() {
  // Return empty array to skip static generation for dynamic routes
  // Markets will be rendered on-demand
  return [];
}

export default function MarketDetailPage({ params }: { params: { id: string } }) {
  return <MarketDetailClient marketId={params.id} />;
}
