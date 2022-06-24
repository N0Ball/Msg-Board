/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'dark': '#0DBDA1',
      'light': '#DFFFE7',
      'warning': '#EDE643',
      'primary': '#78D3A8',
      'secondary': '#B2FFE9',
      'red': '#E3242B'
    }
  },
  plugins: [],
}