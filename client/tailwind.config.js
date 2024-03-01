/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        greenMain: '#099382',
        darkMain: '#302F2F',
        bgGreen: '#E5F1F1',
        darkBlue: '#062d46',
      },
    },
  },
  plugins: [],
};
