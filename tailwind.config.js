/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cb: {
          blue: '#0052FF',
          'blue-hover': '#0039B3',
          'blue-dim': '#1a2a4a',
          bg: '#0A0B0D',
          'bg-card': '#111318',
          'bg-raised': '#191C23',
          'bg-hover': '#1E222B',
          border: '#232732',
          'border-subtle': '#1A1D26',
          text: '#F5F5F5',
          'text-secondary': '#8A919E',
          'text-tertiary': '#4E5563',
          green: '#05B169',
          red: '#F05252',
          'green-dim': '#0A2318',
          'red-dim': '#2A0E0E',
        }
      },
      fontFamily: {
        display: ['"Coinbase Display"', '"DM Sans"', 'ui-sans-serif', 'system-ui'],
        mono: ['"Coinbase Mono"', '"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'ticker': 'ticker 40s linear infinite',
        'fade-up': 'fadeUp 0.5s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'number-roll': 'numberRoll 0.3s ease',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        numberRoll: {
          '0%': { transform: 'translateY(4px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
      backgroundImage: {
        'cb-gradient': 'linear-gradient(135deg, #0052FF 0%, #1a6bff 50%, #0A3BB0 100%)',
        'cb-dark-gradient': 'linear-gradient(180deg, #0A0B0D 0%, #0D1020 100%)',
      }
    },
  },
  plugins: [],
}
