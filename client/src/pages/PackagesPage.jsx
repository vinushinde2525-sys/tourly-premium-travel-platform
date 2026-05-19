import { useState, useMemo } from 'react';
import { getPackages } from '../utils/api';
import { useFetch } from '../hooks/useFetch';
import { SectionHeader, FilterButton, PackageCardSkeleton, EmptyState } from '../components/ui';
import PackageCard from '../components/sections/PackageCard';
import { LayoutGrid, List } from 'lucide-react';

const categories = ['all', 'luxury', 'adventure', 'cultural', 'wellness'];

export default function PackagesPage() {
  const { data: packages, loading } = useFetch(getPackages);
  const [category, setCategory] = useState('all');
  const [layout, setLayout]     = useState('grid');
  const [maxPrice, setMaxPrice] = useState(10000);

  const filtered = useMemo(() => {
    let list = packages || [];
    if (category !== 'all') list = list.filter(p => p.category === category);
    list = list.filter(p => p.price <= maxPrice);
    return list;
  }, [packages, category, maxPrice]);

  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-40 pb-20 text-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1400&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-ocean-950/70" />
        <div className="relative container-custom">
          <p className="text-sand-300 text-sm font-semibold uppercase tracking-widest mb-3 animate-fade-up" style={{ animationFillMode: 'both' }}>
            All-Inclusive Experiences
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            Travel Packages
          </h1>
          <p className="text-white/70 max-w-xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            Curated all-inclusive packages designed to deliver extraordinary experiences without the hassle.
          </p>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {/* Filters */}
          <div className="bg-white rounded-2xl p-5 shadow-card mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div className="flex flex-wrap gap-2">
                {categories.map(c => (
                  <FilterButton
                    key={c}
                    label={c.charAt(0).toUpperCase() + c.slice(1)}
                    active={category === c}
                    onClick={() => setCategory(c)}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLayout('grid')}
                  className={`p-2 rounded-lg transition-colors ${layout === 'grid' ? 'bg-ocean-100 text-ocean-700' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <LayoutGrid size={18} />
                </button>
                <button
                  onClick={() => setLayout('list')}
                  className={`p-2 rounded-lg transition-colors ${layout === 'list' ? 'bg-ocean-100 text-ocean-700' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>

            {/* Price filter */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 whitespace-nowrap">Max Price: <strong>${maxPrice.toLocaleString()}</strong></span>
              <input
                type="range"
                min="500"
                max="10000"
                step="100"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="flex-1 accent-ocean-600"
              />
            </div>
          </div>

          {!loading && (
            <p className="text-sm text-gray-500 mb-6">
              Showing <span className="font-semibold text-gray-700">{filtered.length}</span> packages
            </p>
          )}

          {/* Results */}
          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3].map(i => <PackageCardSkeleton key={i} />)}
            </div>
          ) : filtered.length > 0 ? (
            <div className={layout === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
              {filtered.map(pkg => (
                <PackageCard key={pkg.id} pkg={pkg} layout={layout === 'grid' ? 'grid' : 'list'} />
              ))}
            </div>
          ) : (
            <div className="grid">
              <EmptyState icon="📦" title="No packages found" message="Try changing the category or adjusting your price range." />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
