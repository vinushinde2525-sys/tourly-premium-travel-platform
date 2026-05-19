import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { getTestimonials } from '../../utils/api';
import { useFetch } from '../../hooks/useFetch';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionHeader, StarRating } from '../ui';

export default function TestimonialsSection() {
  const [ref, visible] = useScrollReveal();
  const { data: testimonials, loading } = useFetch(getTestimonials);
  const [current, setCurrent] = useState(0);

  const items = testimonials || [];
  const total = items.length;

  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(() => setCurrent(c => (c + 1) % total), 5000);
    return () => clearInterval(timer);
  }, [total]);

  const prev = () => setCurrent(c => (c - 1 + total) % total);
  const next = () => setCurrent(c => (c + 1) % total);

  return (
    <section ref={ref} className="section-padding bg-ocean-950 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-ocean-800/30 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-ocean-700/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

      <div className="container-custom relative">
        <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeader
            eyebrow="Testimonials"
            title="Stories From Travelers"
            subtitle="Real experiences from real travelers — discover what makes Tourly the choice of discerning adventurers."
            light
          />
        </div>

        {loading ? (
          <div className="max-w-3xl mx-auto bg-white/5 rounded-3xl p-10 animate-pulse h-64" />
        ) : items.length > 0 ? (
          <div className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="max-w-3xl mx-auto relative">
              {/* Card */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 text-center">
                <Quote size={40} className="text-sand-400/50 mx-auto mb-6" />

                <p className="text-white text-lg md:text-xl leading-relaxed mb-8 font-light italic">
                  "{items[current]?.text}"
                </p>

                <div className="flex items-center justify-center gap-4">
                  <img
                    src={items[current]?.avatar}
                    alt={items[current]?.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-sand-400/50"
                  />
                  <div className="text-left">
                    <p className="text-white font-semibold">{items[current]?.name}</p>
                    <p className="text-ocean-300 text-sm">{items[current]?.location}</p>
                    <p className="text-ocean-400 text-xs mt-0.5">{items[current]?.tour}</p>
                  </div>
                  <div className="ml-2">
                    <StarRating rating={items[current]?.rating} />
                  </div>
                </div>
              </div>

              {/* Navigation */}
              {total > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={next}
                    className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-8">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2 bg-sand-400' : 'w-2 h-2 bg-white/30 hover:bg-white/50'}`}
                  />
                ))}
              </div>
            </div>

            {/* All testimonials grid (desktop) */}
            <div className="hidden lg:grid grid-cols-4 gap-4 mt-16">
              {items.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setCurrent(i)}
                  className={`p-4 rounded-2xl border transition-all duration-300 text-left
                    ${i === current
                      ? 'bg-white/15 border-sand-400/50'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <p className="text-white text-xs font-semibold">{t.name}</p>
                      <p className="text-ocean-400 text-xs">{t.location}</p>
                    </div>
                  </div>
                  <StarRating rating={t.rating} size="sm" />
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
