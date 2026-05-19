import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getPackages } from '../../utils/api';
import { useFetch } from '../../hooks/useFetch';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionHeader, PackageCardSkeleton } from '../ui';
import PackageCard from './PackageCard';

export default function FeaturedPackages() {
  const [ref, visible] = useScrollReveal();
  const { data: packages, loading } = useFetch(getPackages);

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container-custom">
        <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeader
            eyebrow="Popular Packages"
            title="Checkout Our Packages"
            subtitle="All-inclusive travel packages designed to deliver extraordinary experiences without the hassle of planning."
          />
        </div>

        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map(i => <PackageCardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {(packages || []).slice(0, 6).map((pkg, i) => (
              <div
                key={pkg.id}
                className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <PackageCard pkg={pkg} layout="grid" />
              </div>
            ))}
          </div>
        )}

        <div className="text-center">
          <Link to="/packages" className="btn-outline">
            View All Packages
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
