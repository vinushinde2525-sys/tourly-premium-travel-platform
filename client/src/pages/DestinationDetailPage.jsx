import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, Clock, Users, Check, Heart } from 'lucide-react';
import { getDestination } from '../utils/api';
import { useFetch } from '../hooks/useFetch';
import { StarRating, Skeleton } from '../components/ui';

export default function DestinationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: dest, loading, error } = useFetch(getDestination, id, [id]);

  if (error) return (
    <div className="min-h-screen flex items-center justify-center pt-20 text-center">
      <div>
        <p className="text-6xl mb-4">🗺️</p>
        <h2 className="font-display text-2xl font-bold text-gray-800 mb-2">Destination Not Found</h2>
        <p className="text-gray-500 mb-6">This destination doesn't exist or has been removed.</p>
        <Link to="/destinations" className="btn-primary">Back to Destinations</Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        {loading
          ? <div className="w-full h-full shimmer-bg" />
          : (
            <>
              <img
                src={dest?.image}
                alt={dest?.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/80 via-transparent to-ocean-950/30" />
            </>
          )
        }
        <button
          onClick={() => navigate(-1)}
          className="absolute top-24 left-4 md:left-8 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full p-2 hover:bg-white/30 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        {dest && (
          <div className="absolute bottom-8 left-4 md:left-8 text-white">
            <p className="text-sand-300 text-sm font-medium flex items-center gap-1 mb-1">
              <MapPin size={13} /> {dest.country} · {dest.region}
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold">{dest.name}</h1>
          </div>
        )}
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/5" />
            </div>
          ) : dest && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Main */}
              <div className="lg:col-span-2">
                {/* Rating row */}
                <div className="flex flex-wrap items-center gap-5 mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <StarRating rating={dest.rating} size="md" />
                    <span className="font-bold text-gray-800">{dest.rating}</span>
                    <span className="text-gray-400 text-sm">({dest.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock size={14} /> {dest.duration}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {dest.tags.map(tag => (
                      <span key={tag} className="tag-pill capitalize">{tag}</span>
                    ))}
                  </div>
                </div>

                <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">About This Destination</h2>
                <p className="text-gray-600 leading-relaxed mb-8">{dest.description}</p>

                <h3 className="font-display text-xl font-bold text-gray-900 mb-4">Trip Highlights</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {dest.highlights.map(h => (
                    <li key={h} className="flex items-center gap-3 bg-ocean-50 rounded-xl px-4 py-3 text-sm text-ocean-800">
                      <Check size={15} className="text-ocean-500 shrink-0" /> {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sidebar booking card */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-white border border-gray-200 rounded-2xl p-6 shadow-card">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Starting from</p>
                  <p className="font-display text-4xl font-bold text-ocean-700 mb-1">
                    ${dest.price}
                    <span className="text-base font-normal text-gray-400"> /person</span>
                  </p>

                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    {dest.rating} · {dest.reviews} reviews
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock size={14} className="text-ocean-500" /> Duration: {dest.duration}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin size={14} className="text-ocean-500" /> {dest.name}, {dest.country}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users size={14} className="text-ocean-500" /> Small group tours available
                    </div>
                  </div>

                  <Link to="/packages" className="btn-primary w-full justify-center mb-3">
                    Book This Destination
                  </Link>
                  <Link to="/contact" className="btn-outline w-full justify-center text-sm">
                    <Heart size={14} /> Enquire Now
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
