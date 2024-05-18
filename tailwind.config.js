/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gradient-start": "#000B31",
        "gradient-mid": "#000720",
        "gradient-end": "#000413",
        "azul-primary": "#057DB7",
        "azul-secondary": "#002131",
        "gray-primary": "#8C8C8C",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
