/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          bg: "#070815",
          nebula1: "#5b21b6",
          nebula2: "#0ea5e9",
          ion: "#22d3ee",
          starlight: "#e2e8f0",
          warning: "#f59e0b",
          success: "#22c55e",
          critical: "#ef4444",
        },
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "starfield": {
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(-2000px)" },
        },
        "nebula-pulse": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "starfield": "starfield 20s linear infinite",
        "nebula-pulse": "nebula-pulse 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
