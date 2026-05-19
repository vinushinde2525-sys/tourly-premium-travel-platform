// ── StarRating ─────────────────────────────────────────────────────────
export function StarRating({ rating, max = 5, size = 'sm' }) {
  const sizeClass = size === 'sm' ? 'text-sm' : 'text-base';
  return (
    <span className={`flex items-center gap-0.5 ${sizeClass}`}>
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={i < Math.round(rating) ? 'star-filled' : 'star-empty'}>★</span>
      ))}
    </span>
  );
}

// ── Badge ───────────────────────────────────────────────────────────────
const badgeColors = {
  'Best Seller': 'bg-amber-500',
  Popular:       'bg-emerald-500',
  Adventure:     'bg-orange-500',
  Wellness:      'bg-teal-500',
  Premium:       'bg-purple-600',
  New:           'bg-ocean-500',
  default:       'bg-ocean-600',
};

export function Badge({ label }) {
  const bg = badgeColors[label] || badgeColors.default;
  return (
    <span className={`${bg} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
      {label}
    </span>
  );
}

// ── Skeleton ────────────────────────────────────────────────────────────
export function Skeleton({ className = '' }) {
  return <div className={`shimmer-bg rounded-xl animate-pulse ${className}`} />;
}

export function DestinationCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-card">
      <Skeleton className="h-56 w-full rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
}

export function PackageCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-card flex flex-col md:flex-row">
      <Skeleton className="h-56 md:h-auto md:w-64 rounded-none" />
      <div className="flex-1 p-6 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
}

// ── SectionHeader ───────────────────────────────────────────────────────
export function SectionHeader({ eyebrow, title, subtitle, center = true, light = false }) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      {eyebrow && (
        <p className={`text-sm font-semibold uppercase tracking-widest mb-3 ${light ? 'text-sand-300' : 'text-ocean-500'}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 ${light ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base md:text-lg leading-relaxed max-w-2xl ${center ? 'mx-auto' : ''} ${light ? 'text-ocean-200' : 'text-gray-500'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ── FilterButton ────────────────────────────────────────────────────────
export function FilterButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap
        ${active
          ? 'bg-ocean-600 text-white shadow-md'
          : 'bg-white text-gray-600 border border-gray-200 hover:border-ocean-300 hover:text-ocean-600'
        }`}
    >
      {label}
    </button>
  );
}

// ── EmptyState ──────────────────────────────────────────────────────────
export function EmptyState({ icon = '🔍', title = 'No results found', message }) {
  return (
    <div className="col-span-full text-center py-20">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="font-display text-xl font-semibold text-gray-700 mb-2">{title}</h3>
      {message && <p className="text-gray-400 text-sm">{message}</p>}
    </div>
  );
}
