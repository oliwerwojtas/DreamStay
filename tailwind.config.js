/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      sm: "20rem",
      md: "39rem",
      lg: "52rem",
      xl: "64rem",
    },
    extend: {},
  },
  plugins: ["@tailwindcss/forms"],
};
