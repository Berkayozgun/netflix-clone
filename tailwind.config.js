/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'netflix-red': '#E50914',
        'netflix-black': '#111',
        'netflix-dark': '#141414',
      },
      fontFamily: {
        'netflix': ['Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 