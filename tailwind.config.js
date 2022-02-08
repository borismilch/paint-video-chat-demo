module.exports = {
  mode: 'jit',

  dark: 'class',

  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      colors: {
        secondary: '#611f69',
        light: "#38373c",
        placeholder: "#c4c4c6",
        darken: "#121016",
        sidebar: "#19171d",
        main: "#1a1d21",
        border: "#e8e8e821",
        textColor: "#d1d2d3",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms'), require('@tailwindcss/line-clamp'), require('tailwind-scrollbar')],
};
