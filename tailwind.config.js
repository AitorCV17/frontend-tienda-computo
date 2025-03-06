// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,ts,js,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'science-blue': {
          '50': '#f2f7fd',
          '100': '#e5edf9',
          '200': '#c4dbf3',
          '300': '#90bce9',
          '400': '#559adb',
          '500': '#2f7dc8',  // <--- Importante
          '600': '#236bb8',
          '700': '#1b4f89',
          '800': '#1a4372',
          '900': '#1b3a5f',
          '950': '#12253f'
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
