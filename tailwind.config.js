module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      roboto: [
        "Roboto",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
    },
    colors: {
      "c-primary": "#014F9C",
      "c-second": "rgba(252, 114, 38, 0.85)",
      "c-dark": "#222222",
      "c-bg": "rgba(235, 239, 251, 0.9)",
      "c-white": "#fff",
      "c-blue": "rgba(1, 79, 156, 0.6)",
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
