/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#22C55E',
        'brand-dark': '#16A34A',
        'brand-light': '#4ADE80',
      },
    },
  },
  plugins: [],
};
