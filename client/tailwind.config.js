/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        sand: {
          50:  '#fdf8f0',
          100: '#f9edd8',
          200: '#f2d9b0',
          300: '#e8c07a',
          400: '#dba048',
          500: '#c8882a',
          600: '#a96d1f',
        },
        ocean: {
          50:  '#f0f7ff',
          100: '#e0effe',
          200: '#baddfd',
          300: '#7dc3fb',
          400: '#38a3f7',
          500: '#0e84e3',
          600: '#0266c1',
          700: '#0351a0',
          800: '#074484',
          900: '#0c3a6e',
          950: '#082449',
        },
        forest: {
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
        },
      },
      backgroundImage: {
        'hero-pattern': "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'slide-right': 'slideRight 0.5s ease forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideRight: {
          from: { opacity: '0', transform: 'translateX(-20px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'card': '0 4px 24px rgba(0,0,0,0.08)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.15)',
        'glow': '0 0 30px rgba(14,132,227,0.25)',
      },
    },
  },
  plugins: [],
};
