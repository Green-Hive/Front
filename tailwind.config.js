/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'custom': ['Lexend Deca', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        'Light-gray': '#3B3B3B',
        'main': '#2C2C2C',
        'title':'#D6D6D6',
        'navbar':'#131315',
        'greenOlive':'#3C4C10',
        'lightGreen':'#C5D4BD',
      },
    },
  },
  plugins: [],
};
