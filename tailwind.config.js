/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'stream-purple': '#7c3aed', // Violet-600
        'stream-dark': '#0f172a',   // Slate-900 (Deep Ocean)
        'stream-light': '#1e293b',  // Slate-800
        'stream-accent': '#38bdf8', // Sky-400
      },
      fontFamily: {
        'netflix': ['Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 