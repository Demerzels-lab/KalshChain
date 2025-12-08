'use client';

import { useState, useMemo } from 'react';
import { useMarkets } from '@/hooks/useMarkets';
import { MarketCard } from '@/components/MarketCard';
import { Card } from '@/components/ui/card';

import { Search, Filter, Loader2, LayoutGrid, List } from 'lucide-react';

const categories = ['All', 'Crypto', 'Politics', 'Economy', 'Sports', 'AI & Tech', 'Culture'];
const marketTypes = ['All', 'On-Chain', 'Kalshi 2026'];
const sortOptions = ['Highest Volume', 'Newest', 'Ending Soon', 'High Probability'];

export default function ExplorePage() {
  const { markets, loading } = useMarkets();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [marketType, setMarketType] = useState('All');
  const [sortBy, setSortBy] = useState('Highest Volume');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredMarkets = useMemo(() => {
    let result = [...markets];

    if (search) {
      result = result.filter(m => 
        m.title.toLowerCase().includes(search.toLowerCase()) ||
        m.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== 'All') {
      result = result.filter(m => m.category === category);
    }

    if (marketType === 'On-Chain') {
      result = result.filter(m => !m.is_kalshi);
    } else if (marketType === 'Kalshi 2026') {
      result = result.filter(m => m.is_kalshi);
    }

    switch (sortBy) {
      case 'Highest Volume':
        result.sort((a, b) => Number(b.total_volume) - Number(a.total_volume));
        break;
      case 'Newest':
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'Ending Soon':
        result.sort((a, b) => new Date(a.expiration_date).getTime() - new Date(b.expiration_date).getTime());
        break;
      case 'High Probability':
        result.sort((a, b) => Number(b.yes_price) - Number(a.yes_price));
        break;
    }

    return result;
  }, [markets, search, category, marketType, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Explore Markets</h1>
        <p className="text-slate-400">Discover and trade on various prediction markets</p>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search markets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <select
              value={marketType}
              onChange={(e) => setMarketType(e.target.value)}
              className="px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {marketTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {sortOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <div className="flex gap-1 p-1 rounded-lg bg-slate-800 border border-slate-700">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <LayoutGrid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Results */}
      <div className="mb-4 text-sm text-slate-400">
        {filteredMarkets.length} markets found
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
        </div>
      ) : filteredMarkets.length === 0 ? (
        <Card className="p-12 text-center">
          <Filter className="h-12 w-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Results</h3>
          <p className="text-slate-400">Try adjusting your search filters</p>
        </Card>
      ) : (
        <div className={`grid gap-5 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {filteredMarkets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>
      )}
    </div>
  );
}
