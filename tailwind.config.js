const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        Margarine: [ "Margarine", "serif"],
      }, 
     animation:{
      'slide-up': 'slideUp 0.7s ease-out forwards',
      'number-translate': 'translateUpDown 2s infinite',
     } , 
     keyframes:{
      slideUp: {
        '0%': {
          opacity: 0,
          transform: 'translateY(30px)',
        },
        '100%': {
          opacity: 1,
          transform: 'translateY(0)',
        },
      },
      translateUpDown: {
        '0%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-8px)' },
        '100%': { transform: 'translateY(0)' },
      },
     },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

