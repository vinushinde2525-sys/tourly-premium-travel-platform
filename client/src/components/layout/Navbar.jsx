import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Phone } from 'lucide-react';

const navLinks = [
  { to: '/',             label: 'Home' },
  { to: '/destinations', label: 'Destinations' },
  { to: '/packages',     label: 'Packages' },
  { to: '/contact',      label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const { pathname }              = useLocation();
  const isHome                    = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [pathname]);

  const navBg = scrolled || !isHome
    ? 'bg-white/95 backdrop-blur-md shadow-sm'
    : 'bg-transparent';

  const textColor = scrolled || !isHome ? 'text-gray-700' : 'text-white';
  const logoColor = scrolled || !isHome ? 'text-ocean-700' : 'text-white';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
        {/* Top Bar */}
        {!scrolled && isHome && (
          <div className="hidden md:block bg-ocean-950/40 text-white/70 text-xs py-1.5">
            <div className="container-custom flex justify-between items-center">
              <a href="tel:+011234567" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Phone size={11} />
                +01 (123) 4567 90
              </a>
              <div className="flex items-center gap-1.5">
                <Globe size={11} />
                <span>English</span>
              </div>
            </div>
          </div>
        )}

        <nav className="container-custom flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className={`font-display font-bold text-xl tracking-tight ${logoColor} transition-colors`}>
            <span className="text-sand-400">✦</span> Tourly
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                    ${isActive
                      ? (scrolled || !isHome ? 'bg-ocean-50 text-ocean-700' : 'bg-white/20 text-white')
                      : `${textColor} hover:opacity-80`
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/packages"
              className={`text-sm font-medium px-5 py-2.5 rounded-full border-2 transition-all duration-300
                ${scrolled || !isHome
                  ? 'border-ocean-600 text-ocean-600 hover:bg-ocean-600 hover:text-white'
                  : 'border-white text-white hover:bg-white/10'
                }`}
            >
              Book Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className={`md:hidden p-2 rounded-lg transition-colors ${textColor}`}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden
          ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <span className="font-display font-bold text-xl text-ocean-700">
            <span className="text-sand-400">✦</span> Tourly
          </span>
          <button onClick={() => setMenuOpen(false)} className="p-1.5 text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <ul className="p-6 space-y-2">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-sm font-medium transition-colors
                  ${isActive ? 'bg-ocean-50 text-ocean-700' : 'text-gray-700 hover:bg-gray-50'}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="px-6">
          <Link
            to="/packages"
            className="block w-full text-center btn-primary justify-center"
          >
            Book Your Journey
          </Link>
        </div>

        <div className="absolute bottom-8 left-0 right-0 px-6 text-center">
          <p className="text-xs text-gray-400">📞 +01 (123) 4567 90</p>
        </div>
      </div>
    </>
  );
}
