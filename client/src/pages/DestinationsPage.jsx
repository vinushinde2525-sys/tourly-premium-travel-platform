import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { getDestinations } from '../utils/api';
import { useFetch } from '../hooks/useFetch';
import { SectionHeader, FilterButton, DestinationCardSkeleton, EmptyState } from '../components/ui';
import DestinationCard from '../components/sections/DestinationCard';

const regions = ['All', 'Europe', 'Asia', 'Africa', 'South America', 'North America', 'Oceania'];
const tags    = ['All', 'beach', 'culture', 'adventure', 'luxury', 'wildlife', 'romantic', 'history'];

export default function DestinationsPage() {
  const { data: destinations, loading } = useFetch(getDestinations);
  const [region, setRegion]   = useState('All');
  const [tag, setTag]         = useState('All');
  const [search, setSearch]   = useState('');
  const [sort, setSort]       = useState('rating');

  const filtered = useMemo(() => {
    let list = destinations || [];
    if (region !== 'All') list = list.filter(d => d.region === region);
    if (tag !== 'All')    list = list.filter(d => d.tags.includes(tag));
    if (search.trim())    list = list.filter(d =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.country.toLowerCase().includes(search.toLowerCase())
    );
    return [...list].sort((a, b) =>
      sort === 'price' ? a.price - b.price : b.rating - a.rating
    );
  }, [destinations, region, tag, search, sort]);

  return (
    <>
      {/* Page Hero */}
      <section
        className="relative pt-40 pb-20 text-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1400&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-ocean-950/65" />
        <div className="relative container-custom">
          <p className="text-sand-300 text-sm font-semibold uppercase tracking-widest mb-3 animate-fade-up" style={{ animationFillMode: 'both' }}>
            Explore the World
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            All Destinations
          </h1>
          <p className="text-white/70 max-w-xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            Discover extraordinary places across the globe, each offering a uniquely memorable experience.
          </p>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {/* Filters */}
          <div className="bg-white rounded-2xl p-5 shadow-card mb-8 space-y-4">
            {/* Search + Sort */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search destinations or countries…"
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ocean-300 transition-all"
                />
              </div>
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-ocean-300"
              >
                <option value="rating">Sort: Top Rated</option>
                <option value="price">Sort: Lowest Price</option>
              </select>
            </div>

            {/* Region filter */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Region</p>
              <div className="flex flex-wrap gap-2">
                {regions.map(r => (
                  <FilterButton key={r} label={r} active={region === r} onClick={() => setRegion(r)} />
                ))}
              </div>
            </div>

            {/* Tag filter */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Experience Type</p>
              <div className="flex flex-wrap gap-2">
                {tags.map(t => (
                  <FilterButton key={t} label={t.charAt(0).toUpperCase() + t.slice(1)} active={tag === t} onClick={() => setTag(t)} />
                ))}
              </div>
            </div>
          </div>

          {/* Results count */}
          {!loading && (
            <p className="text-sm text-gray-500 mb-6">
              Showing <span className="font-semibold text-gray-700">{filtered.length}</span> destinations
            </p>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <DestinationCardSkeleton key={i} />)
              : filtered.length > 0
                ? filtered.map((dest, i) => <DestinationCard key={dest.id} dest={dest} index={i} />)
                : <EmptyState icon="✈️" title="No destinations found" message="Try adjusting your filters or search term." />
            }
          </div>
        </div>
      </section>
    </>
  );
}
