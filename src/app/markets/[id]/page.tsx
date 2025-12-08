import { createClient } from '@supabase/supabase-js';
import { MarketDetailClient } from './MarketDetailClient';

// Generate static params for all markets
export async function generateStaticParams() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: markets } = await supabase
      .from('kalshchain_markets')
      .select('id')
      .eq('status', 'active');

    return markets?.map((market) => ({
      id: market.id.toString(),
    })) || [];
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default function MarketDetailPage({ params }: { params: { id: string } }) {
  return <MarketDetailClient marketId={params.id} />;
}
