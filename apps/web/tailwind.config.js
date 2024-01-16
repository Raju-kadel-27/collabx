/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato'],
        opensans: ['Open Sans'],
        roboto: ['Roboto']
      },
      scrollbarWidth: {
        'thin': '8px',
        'none': '0',
      },
    },
  },
  plugins: []
};

