module.exports = {
  mode: "jit",
  purge: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./src/**/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto"],
      },
      gridTemplateColumns: {
        cardLayout: "repeat(auto-fill, minmax(300px, 1fr))",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};