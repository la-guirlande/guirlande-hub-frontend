const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    fontFamily: {
      'roboto': ['Roboto', 'sans-serif']
    },
    extend: {
      colors: {
        primary: {
          light: colors.indigo['400'],
          DEFAULT: colors.indigo['500'],
          dark: colors.indigo['600']
        },
        success: colors.green['500'],
        warn: colors.yellow['500'],
        error: colors.red['500']
      }
    },
  },
  plugins: [],
}
