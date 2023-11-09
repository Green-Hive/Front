/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'custom': ['Lexend Deca', 'ui-sans-serif', 'system-ui'],
      }
    },
  },
  plugins: [],
};
