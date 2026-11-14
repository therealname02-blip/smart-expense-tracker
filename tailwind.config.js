/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        nectar: {
          canvas: '#FFFBF7',
          canvasSubtle: '#F6F3EE',
          forest: '#054F31',
          emerald: '#0B7443',
          accent: '#039855',
          mint: '#D1FADF',
          mintLight: '#E8F5EB',
          leaf: '#61BC76',
          wasabi: '#F2F9EB',
          peach: '#FEE9D1',
          peachLight: '#FFF2E4',
          peachDeep: '#4E3411',
          droplet: '#EFF7FF',
          darkBg: '#09110D',
          darkCard: '#111F17',
          darkBorder: '#1A2E22',
          darkMuted: '#8E9E94',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      borderRadius: {
        'pill': '9999px',
        'card': '1.5rem',
        '2card': '2rem'
      },
      boxShadow: {
        'nectar': '0 16px 32px -8px rgba(5, 79, 49, 0.06), 0 4px 8px -2px rgba(5, 79, 49, 0.03)',
        'nectar-float': '0 24px 48px -12px rgba(5, 79, 49, 0.12), 0 8px 16px -4px rgba(5, 79, 49, 0.06)',
        'nectar-glow': '0 0 25px rgba(11, 116, 67, 0.15)'
      }
    },
  },
  plugins: [],
};
