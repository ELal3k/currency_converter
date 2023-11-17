/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        onNeutralBg: "var(--onNeutralBg)",
        neutralBg: "var(--neutralBg)",
        primaryBg: "var(--primaryBg)",
        onPrimaryBg: "var(--onPrimaryBg)",
        primary: "var(--primary)",
      },
    },
  },
  plugins: [],
}
