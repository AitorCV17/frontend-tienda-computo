// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,ts,js,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        'curious-blue': {
          50:  '#f0faff',
          100: '#e1f3fd',
          200: '#bce8fb',
          300: '#81d7f8',
          400: '#3ec2f2',
          500: '#15aae2',
          600: '#0993ce',
          700: '#086e9c',
          800: '#0b5d81',
          900: '#0f4d6b',
          950: '#0a3147'
        }
      },
      keyframes: {
        'fade-in-down': {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        'pop': {
          '0%': { transform: 'scale(0.95)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' }
        }
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out',
        'spin-slow': 'spin-slow 2s linear infinite',
        'pop': 'pop 0.3s ease-in-out'
      }
    }
  },
  plugins: []
}
