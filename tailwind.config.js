/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      textColor: {
        skin: {
          base: "var(--color-text-base)/<alpha-value>",
          muted: "var(--color-text-muted)/<alpha-value>",
          inverted: "var(--color-text-inverted)/<alpha-value>",
        },
      },
      backgroundColor: {
        skin: {
          fill: "var(--color-fill)/<alpha-value>",
          button: "var(--color-button-base)/<alpha-value>",
        },
      },
      borderColor: {
        skin: {
          fill: "var(--color-fill)",
          button: "var(--color-button-base)",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
}
