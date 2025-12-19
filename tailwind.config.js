/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        material: {
          blue: {
            50: '#E3F2FD',
            100: '#BBDEFB',
            200: '#90CAF9',
            300: '#64B5F6',
            400: '#42A5F5',
            500: '#2196F3',
            600: '#1E88E5',
            700: '#1976D2',
          },
          red: {
            50: '#FFEBEE',
            100: '#FFCDD2',
            500: '#F44336',
            600: '#E53935',
          },
          green: {
            50: '#E8F5E9',
            500: '#4CAF50',
            600: '#43A047',
          },
          yellow: {
            50: '#FFFDE7',
            500: '#FFEB3B',
            600: '#FDD835',
          }
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
