import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-lg">
        <p className="font-display text-9xl font-bold text-ocean-100 select-none leading-none mb-4">404</p>
        <h1 className="font-display text-3xl font-bold text-gray-900 mb-3">Lost in Transit</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Looks like this page has gone off the beaten path. Let's get you back on track to your next adventure.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/" className="btn-primary">
            <Home size={16} /> Back to Home
          </Link>
          <Link to="/destinations" className="btn-outline">
            <ArrowLeft size={16} /> Explore Destinations
          </Link>
        </div>
      </div>
    </div>
  );
}
