import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Send } from 'lucide-react';
import { subscribeNewsletter } from '../../utils/api';
import toast from 'react-hot-toast';

const footerLinks = {
  Company: [
    { label: 'About Us', to: '/' },
    { label: 'Our Team', to: '/' },
    { label: 'Careers', to: '/' },
    { label: 'Press', to: '/' },
  ],
  Explore: [
    { label: 'Destinations', to: '/destinations' },
    { label: 'Packages', to: '/packages' },
    { label: 'Gallery', to: '/' },
    { label: 'Blog', to: '/' },
  ],
  Support: [
    { label: 'FAQ', to: '/' },
    { label: 'Contact Us', to: '/contact' },
    { label: 'Privacy Policy', to: '/' },
    { label: 'Terms & Conditions', to: '/' },
  ],
};

const socials = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await subscribeNewsletter(email);
      if (res.data.success) {
        toast.success(res.data.message);
        setEmail('');
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-ocean-950 text-white">
      {/* Newsletter Banner */}
      <div className="bg-gradient-to-r from-ocean-700 to-ocean-900 py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl font-bold mb-1">
                Get Inspired. Travel Better.
              </h3>
              <p className="text-ocean-200 text-sm">
                Subscribe for exclusive deals, travel tips, and destination guides.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:bg-white/20 transition-colors"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-3 bg-sand-400 hover:bg-sand-500 text-white rounded-full font-medium text-sm transition-colors flex items-center gap-2 disabled:opacity-70"
              >
                <Send size={14} />
                {loading ? 'Subscribing…' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block font-display font-bold text-2xl mb-4">
              <span className="text-sand-400">✦</span> Tourly
            </Link>
            <p className="text-ocean-300 text-sm leading-relaxed mb-6 max-w-xs">
              Crafting unforgettable journeys to the world's most extraordinary destinations since 2015. Your adventure begins here.
            </p>
            {/* Contact */}
            <ul className="space-y-3 text-sm text-ocean-300">
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-sand-400 shrink-0" />
                <a href="tel:+01123456790" className="hover:text-white transition-colors">+01 (123) 4567 90</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-sand-400 shrink-0" />
                <a href="mailto:hello@tourly.com" className="hover:text-white transition-colors">hello@tourly.com</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-sand-400 shrink-0 mt-0.5" />
                <span>3146 Koontz Lane, California, USA</span>
              </li>
            </ul>
            {/* Socials */}
            <div className="flex gap-3 mt-6">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-ocean-700 flex items-center justify-center text-ocean-300 hover:border-sand-400 hover:text-sand-400 transition-all"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">{title}</h4>
              <ul className="space-y-3">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-ocean-300 text-sm hover:text-white transition-colors hover:pl-1 transition-all duration-200 inline-block"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-ocean-900">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ocean-400">
          <p>© {new Date().getFullYear()} Tourly. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
