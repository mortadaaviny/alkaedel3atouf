/** @type {import('tailwindcss').Config} */
export default {
  future: { hoverOnlyWhenSupported: true },
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Public experience — midnight plum, warm cream, amber light
        ink: {
          950: '#0A0711',
          900: '#110C1A',
          850: '#161021',
          800: '#1D152B',
          700: '#2A2040',
          600: '#3A2E55',
        },
        violet: {
          300: '#B3A6D1',
          400: '#9787BA',
          500: '#7A6A9E',
          600: '#5E4F82',
        },
        lavender: {
          100: '#EEE9F7',
          200: '#DDD4EE',
          300: '#C6BADF',
        },
        cream: {
          50: '#FCF8F1',
          100: '#F5ECDD',
          200: '#EADCC4',
          300: '#D9C5A3',
        },
        amber: {
          200: '#F8DCAA',
          300: '#F5C77B',
          400: '#F0B35A',
          500: '#DE963A',
        },
        olive: {
          400: '#9AA174',
          500: '#7C8457',
          700: '#4A5236',
        },
        // Admin CMS — neutral, quiet, functional
        cms: {
          bg: '#F6F5F8',
          surface: '#FFFFFF',
          line: '#E7E4ED',
          line2: '#D9D5E2',
          text: '#1C1727',
          muted: '#6C6579',
          faint: '#9C96A8',
          primary: '#4A3A72',
          primaryHover: '#3B2D5E',
          tint: '#F1EEF8',
          success: '#23794F',
          successTint: '#E6F4EC',
          danger: '#C23B2B',
          dangerTint: '#FBECEA',
          warn: '#9A6512',
          warnTint: '#FBF2E1',
        },
      },
      boxShadow: {
        card: '0 1px 0 0 rgba(255,255,255,0.06) inset, 0 18px 40px -22px rgba(0,0,0,0.75), 0 4px 14px -6px rgba(0,0,0,0.5)',
        cardHover:
          '0 1px 0 0 rgba(255,255,255,0.09) inset, 0 34px 70px -28px rgba(0,0,0,0.85), 0 10px 26px -10px rgba(10,6,20,0.7), 0 0 0 1px rgba(245,199,123,0.10)',
        player: '0 40px 120px -30px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.06)',
        cms: '0 1px 2px rgba(28,23,39,0.04), 0 1px 1px rgba(28,23,39,0.03)',
        cmsPop: '0 12px 40px -12px rgba(28,23,39,0.25), 0 2px 6px rgba(28,23,39,0.06)',
      },
      transitionTimingFunction: {
        cine: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        drift: {
          '0%': { transform: 'translate3d(0, 0, 0)', opacity: '0' },
          '15%': { opacity: 'var(--mote-o, 0.7)' },
          '85%': { opacity: 'var(--mote-o, 0.7)' },
          '100%': { transform: 'translate3d(var(--mote-x, 20px), -120px, 0)', opacity: '0' },
        },
        spin: { to: { transform: 'rotate(360deg)' } },
      },
      animation: {
        shimmer: 'shimmer 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        drift: 'drift var(--mote-d, 9s) ease-in-out var(--mote-delay, 0s) infinite',
      },
    },
  },
  plugins: [],
};
