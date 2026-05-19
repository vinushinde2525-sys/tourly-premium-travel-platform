import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function CTASection() {
  const [ref, visible] = useScrollReveal();

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1400&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-ocean-950/75" />

      <div className="container-custom relative text-center">
        <div
          className={`max-w-2xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="text-sand-300 text-sm font-semibold uppercase tracking-widest mb-4">
            Ready to Explore?
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Your Next Adventure is Just a Click Away
          </h2>
          <p className="text-white/70 text-lg mb-10 leading-relaxed">
            Let our travel experts craft the perfect journey for you. From hidden gems to iconic landmarks — we make extraordinary travel accessible.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/packages" className="btn-primary text-base px-8 py-4">
              Browse Packages
              <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn-secondary text-base px-8 py-4">
              <Phone size={18} />
              Talk to an Expert
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
