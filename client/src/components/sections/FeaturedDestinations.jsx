import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getDestinations } from '../../utils/api';
import { useFetch } from '../../hooks/useFetch';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionHeader, DestinationCardSkeleton } from '../ui';
import DestinationCard from './DestinationCard';

export default function FeaturedDestinations() {
  const [ref, visible] = useScrollReveal();
  const { data: destinations, loading } = useFetch(getDestinations, { featured: true });

  return (
    <section ref={ref} className="section-padding bg-gray-50">
      <div className="container-custom">
        <div
          className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <SectionHeader
            eyebrow="Uncover Places"
            title="Popular Destinations"
            subtitle="Handpicked destinations that captivate travelers from around the world — each offering a uniquely unforgettable experience."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <DestinationCardSkeleton key={i} />)
            : (destinations || []).slice(0, 6).map((dest, i) => (
                <div
                  key={dest.id}
                  className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <DestinationCard dest={dest} index={i} />
                </div>
              ))
          }
        </div>

        <div className="text-center">
          <Link to="/destinations" className="btn-outline">
            Explore All Destinations
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
