/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    screens: {
      sm: "20rem",
      md: "39rem",
      lg: "52rem",
      xl: "64rem",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
