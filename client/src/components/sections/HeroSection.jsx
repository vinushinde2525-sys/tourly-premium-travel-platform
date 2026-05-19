import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, ChevronDown } from 'lucide-react';
import { searchTours } from '../../utils/api';
import toast from 'react-hot-toast';

const stats = [
  { value: '150+', label: 'Destinations' },
  { value: '12K+', label: 'Happy Travelers' },
  { value: '98%',  label: 'Satisfaction Rate' },
];

export default function HeroSection() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ destination: '', checkin: '', checkout: '', people: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.destination.trim()) { toast.error('Please enter a destination'); return; }
    setLoading(true);
    try {
      const res = await searchTours(form);
      const count = res.data.results?.length || 0;
      toast.success(count > 0 ? `Found ${count} destinations!` : 'No exact matches — showing all destinations');
      navigate('/destinations');
    } catch {
      toast.error('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-950/70 via-ocean-950/50 to-ocean-950/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-ocean-950/30 to-transparent" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10 animate-float"
            style={{
              width: `${20 + i * 10}px`,
              height: `${20 + i * 10}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`,
            }}
          />
        ))}
      </div>

      <div className="relative container-custom pt-28 pb-16">
        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white/80 text-sm mb-6 animate-fade-up"
          style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}
        >
          <span className="w-2 h-2 rounded-full bg-sand-400 animate-pulse-slow" />
          Premium Travel Experiences
        </div>

        {/* Headline */}
        <h1
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 max-w-3xl animate-fade-up"
          style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}
        >
          Journey to{' '}
          <span className="italic text-sand-300">Extraordinary</span>
          <br />Places
        </h1>

        <p
          className="text-white/70 text-lg md:text-xl mb-10 max-w-xl leading-relaxed animate-fade-up"
          style={{ animationDelay: '0.35s', opacity: 0, animationFillMode: 'forwards' }}
        >
          Curated travel experiences crafted for the curious soul. Discover destinations that inspire and memories that last a lifetime.
        </p>

        {/* Search Card */}
        <div
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-6 max-w-4xl animate-fade-up"
          style={{ animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards' }}
        >
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                <input
                  name="destination"
                  value={form.destination}
                  onChange={handleChange}
                  placeholder="Where to go?"
                  className="w-full pl-9 pr-3 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 text-sm focus:outline-none focus:bg-white/20 transition-colors"
                />
              </div>
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                <input
                  type="date"
                  name="checkin"
                  value={form.checkin}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-3 bg-white/10 border border-white/20 rounded-xl text-white/70 text-sm focus:outline-none focus:bg-white/20 transition-colors [color-scheme:dark]"
                />
              </div>
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                <input
                  type="date"
                  name="checkout"
                  value={form.checkout}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-3 bg-white/10 border border-white/20 rounded-xl text-white/70 text-sm focus:outline-none focus:bg-white/20 transition-colors [color-scheme:dark]"
                />
              </div>
              <div className="relative">
                <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                <input
                  type="number"
                  name="people"
                  value={form.people}
                  onChange={handleChange}
                  placeholder="Travelers"
                  min="1"
                  className="w-full pl-9 pr-3 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 text-sm focus:outline-none focus:bg-white/20 transition-colors"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-sand-400 hover:bg-sand-500 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:shadow-lg disabled:opacity-60"
            >
              <Search size={18} />
              {loading ? 'Searching…' : 'Search Experiences'}
            </button>
          </form>
        </div>

        {/* Stats */}
        <div
          className="flex flex-wrap gap-8 mt-10 animate-fade-up"
          style={{ animationDelay: '0.65s', opacity: 0, animationFillMode: 'forwards' }}
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="text-white">
              <p className="font-display text-3xl font-bold text-sand-300">{value}</p>
              <p className="text-white/60 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
        <ChevronDown size={24} />
      </div>
    </section>
  );
}
