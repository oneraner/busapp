module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      "c-primary": "#014F9C",
      "c-bg": "rgba(235, 239, 251,0.9)",
      "c-white": "#fff",
    },
    minHeight: {
      "c-full": "100vh",
      "c-screen": "calc(100vh - 140px)",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
