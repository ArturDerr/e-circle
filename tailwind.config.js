/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sfRegular: ["Sf-regular", "sans-serif"],
        sfMedium: ["Sf-medium", "sans-serif"],
      },
      colors: {
        background: "#FFFFFF",
      },
    },
  },
  plugins: [],
}
