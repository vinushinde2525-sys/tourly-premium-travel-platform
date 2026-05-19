import { Link } from 'react-router-dom';
import { MapPin, Star, Clock } from 'lucide-react';

export default function DestinationCard({ dest, index = 0 }) {
  return (
    <Link
      to={`/destinations/${dest.id}`}
      className="group block rounded-2xl overflow-hidden bg-white shadow-card card-hover"
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={dest.image}
          alt={dest.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Region tag */}
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
            {dest.region}
          </span>
        </div>
        {/* Price */}
        <div className="absolute bottom-3 right-3">
          <span className="bg-ocean-600 text-white text-sm font-bold px-3 py-1.5 rounded-xl">
            From ${dest.price}
          </span>
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Location */}
        <div className="flex items-center gap-1 text-ocean-500 text-xs font-medium mb-2">
          <MapPin size={12} />
          {dest.country}
        </div>

        {/* Title */}
        <h3 className="font-display text-xl font-bold text-gray-900 mb-2 group-hover:text-ocean-700 transition-colors">
          {dest.name}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {dest.description}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span className="text-sm font-semibold text-gray-700">{dest.rating}</span>
            <span className="text-xs text-gray-400">({dest.reviews})</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <Clock size={12} />
            {dest.duration}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {dest.tags.slice(0, 3).map(tag => (
            <span key={tag} className="tag-pill capitalize">{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
