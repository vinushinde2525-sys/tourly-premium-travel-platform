import { Link } from 'react-router-dom';
import { Clock, Users, MapPin, Star, Check } from 'lucide-react';
import { Badge } from '../ui';

export default function PackageCard({ pkg, layout = 'grid' }) {
  if (layout === 'list') {
    return (
      <div className="group bg-white rounded-2xl overflow-hidden shadow-card card-hover flex flex-col md:flex-row">
        <div className="relative md:w-72 h-52 md:h-auto overflow-hidden shrink-0">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <Badge label={pkg.badge} />
          </div>
        </div>

        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
              <MapPin size={12} className="text-ocean-500" />
              {pkg.destination}, {pkg.country}
            </div>
            <h3 className="font-display text-xl font-bold text-gray-900 mb-2 group-hover:text-ocean-700 transition-colors">
              {pkg.title}
            </h3>

            <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-3">
              <span className="flex items-center gap-1"><Clock size={12} /> {pkg.duration}</span>
              <span className="flex items-center gap-1"><Users size={12} /> Max {pkg.groupSize} pax</span>
              <span className="flex items-center gap-1"><Star size={12} className="fill-amber-400 text-amber-400" /> {pkg.rating} ({pkg.reviews} reviews)</span>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {pkg.includes.map(inc => (
                <span key={inc} className="flex items-center gap-1 text-xs bg-ocean-50 text-ocean-700 px-2 py-0.5 rounded-full">
                  <Check size={10} /> {inc}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              <span className="text-gray-400 text-xs line-through mr-2">${pkg.originalPrice}</span>
              <span className="font-display text-2xl font-bold text-ocean-700">${pkg.price}</span>
              <span className="text-gray-400 text-xs"> / person</span>
            </div>
            <Link
              to="/packages"
              className="btn-primary text-sm"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Grid layout
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-card card-hover flex flex-col">
      <div className="relative h-52 overflow-hidden shrink-0">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <Badge label={pkg.badge} />
        </div>
        {pkg.originalPrice > pkg.price && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
            -{Math.round((1 - pkg.price / pkg.originalPrice) * 100)}%
          </div>
        )}
      </div>

      <div className="flex-1 p-5 flex flex-col">
        <div className="flex items-center gap-1 text-xs text-ocean-500 font-medium mb-2">
          <MapPin size={11} /> {pkg.country}
        </div>
        <h3 className="font-display text-lg font-bold text-gray-900 mb-2 group-hover:text-ocean-700 transition-colors line-clamp-2">
          {pkg.title}
        </h3>

        <div className="flex gap-4 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1"><Clock size={11} /> {pkg.duration}</span>
          <span className="flex items-center gap-1"><Users size={11} /> {pkg.groupSize} pax</span>
        </div>

        <ul className="space-y-1 mb-4 flex-1">
          {pkg.highlights.slice(0, 2).map(h => (
            <li key={h} className="flex items-center gap-2 text-xs text-gray-500">
              <Check size={11} className="text-ocean-500 shrink-0" /> {h}
            </li>
          ))}
        </ul>

        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 line-through">${pkg.originalPrice}</p>
            <p className="font-display text-xl font-bold text-ocean-700">${pkg.price}<span className="text-xs font-normal text-gray-400"> /person</span></p>
          </div>
          <div className="flex items-center gap-1">
            <Star size={13} className="fill-amber-400 text-amber-400" />
            <span className="text-sm font-semibold text-gray-700">{pkg.rating}</span>
          </div>
        </div>

        <Link
          to="/packages"
          className="mt-3 w-full text-center btn-primary justify-center text-sm"
        >
          View Package
        </Link>
      </div>
    </div>
  );
}
