/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" }, screens: { "2xl": "1240px" } },
    extend: {
      fontFamily: {
        sign: ["var(--font-sign)", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        bangla: ["var(--font-bangla)", "serif"],
      },
    },
  },
  plugins: [],
};
