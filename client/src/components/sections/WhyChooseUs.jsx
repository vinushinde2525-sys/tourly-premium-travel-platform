import { Shield, Headphones, Map, Award, Users, Globe, Star, TrendingUp } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionHeader } from '../ui';

const features = [
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'Your safety is our top priority. All trips are fully insured with 24/7 emergency support.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Headphones,
    title: 'Expert Support',
    description: 'Dedicated travel consultants available around the clock to assist with any query.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Map,
    title: 'Custom Itineraries',
    description: 'Every journey is tailor-made to match your interests, pace, and travel style.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Award,
    title: 'Award Winning',
    description: 'Recognized as a top travel agency for five consecutive years by leading travel publications.',
    color: 'bg-purple-50 text-purple-600',
  },
];

const stats = [
  { icon: Users, value: '12,000+', label: 'Happy Travelers', color: 'text-ocean-500' },
  { icon: Globe, value: '150+', label: 'Destinations', color: 'text-sand-500' },
  { icon: Star, value: '4.9/5', label: 'Average Rating', color: 'text-amber-500' },
  { icon: TrendingUp, value: '10+', label: 'Years Experience', color: 'text-emerald-500' },
];

export function WhyChooseUs() {
  const [ref, visible] = useScrollReveal();

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container-custom">
        <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeader
            eyebrow="Why Choose Us"
            title="Travel With Confidence"
            subtitle="We combine local expertise with world-class service to create travel experiences that exceed every expectation."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, description, color }, i) => (
            <div
              key={title}
              className={`group p-6 rounded-2xl border border-gray-100 hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className={`inline-flex w-12 h-12 rounded-xl items-center justify-center mb-4 ${color}`}>
                <Icon size={22} />
              </div>
              <h3 className="font-display font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StatsSection() {
  const [ref, visible] = useScrollReveal();

  return (
    <section ref={ref} className="py-16 bg-ocean-600">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {stats.map(({ icon: Icon, value, label, color }, i) => (
            <div
              key={label}
              className={`text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <Icon size={24} className="text-white/70 mx-auto mb-3" />
              <p className="font-display text-3xl md:text-4xl font-bold text-white mb-1">{value}</p>
              <p className="text-ocean-200 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
