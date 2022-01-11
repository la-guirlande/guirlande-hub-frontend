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
          light: '#DBB1FF',
          DEFAULT: '#B460FD',
          dark: '#8F3DD5'
        }
      }
    },
  },
  plugins: [],
}
