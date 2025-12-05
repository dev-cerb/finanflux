/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/hooks/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        color: {
          dark: "#0A0014",
          card: "#2B0A45",
          purple: "#8A05BE",
          purpleLight: "#B56BFF",
          pink: "#D861E7",
        }
      }
    },
  },
  plugins: [],
};
