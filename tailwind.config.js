/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        onNeutralBg: "rgb(var(--onNeutralBg))",
        neutralBg: "rgb(var(--neutralBg))",
        primaryBg: "hsl(var(--primaryBg))",
        secondaryBg: "hsl(var(--secondaryBg))",
        onPrimaryBg: "hsl(var(--onPrimaryBg))",
        primary: "hsl(var(--primary))",
      },
    },
  },
  plugins: [],
}
