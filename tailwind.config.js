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
        gold: {
          50: '#FAF6F0',
          100: '#F4ECDC',
          200: '#E8D6B8',
          300: '#DCC094',
          400: '#D0AA70',
          500: '#C5A880',
          600: '#BA986E',
          700: '#9E7B4E',
          800: '#7A5B34',
          900: '#523B1E',
        },
        obsidian: {
          950: '#070A0F',
          900: '#0B111A',
          850: '#101724',
          800: '#162030',
          700: '#222F45',
          600: '#334460',
        },
        clinical: {
          950: '#030712',
          900: '#070d1d',
          850: '#0b152d',
          800: '#0f1d3e',
          700: '#182f64',
          600: '#22418a',
        },
        medical: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        teal: {
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        bio: {
          slate: '#0f172a',
          card: 'rgba(15, 23, 42, 0.72)',
          cardLight: 'rgba(255, 255, 255, 0.85)',
          border: 'rgba(56, 189, 248, 0.18)',
          borderHover: 'rgba(56, 189, 248, 0.45)',
        }
      },
      fontFamily: {
        sans: ['"Inter"', '"Montserrat"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        display: ['"Cormorant Garamond"', '"Cinzel"', 'serif'],
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
      },
      boxShadow: {
        'medical-subtle': '0 4px 20px -2px rgba(14, 165, 233, 0.08)',
        'medical-glow': '0 0 35px -5px rgba(14, 165, 233, 0.25)',
        'clinical-card': '0 20px 40px -15px rgba(2, 6, 23, 0.7)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-heart': 'pulseHeart 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan-line': 'scanLine 3s linear infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        pulseHeart: {
          '0%, 100%': { transform: 'scale(1)' },
          '15%': { transform: 'scale(1.08)' },
          '30%': { transform: 'scale(1)' },
          '45%': { transform: 'scale(1.04)' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
}
