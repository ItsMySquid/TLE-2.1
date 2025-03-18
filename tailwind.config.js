/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // ✅ Handmatige dark mode (met een toggle)
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#ffffff", // Light mode achtergrond
          dark: "#1a202c",   // Dark mode achtergrond
        },
        header: {
          DEFAULT: "#008571", // ✅ Navbar blijft altijd groen
        },
        button: {
          DEFAULT: "#4AD996", // ✅ Basis button-kleur
          positive: "#4AD996", // ✅ Correct antwoord
          negative: "#EC6265", // ❌ Fout antwoord
        },
        border: {
          DEFAULT: "#2D8474", // ✅ Standaard border-kleur
        },
        text: {
          DEFAULT: "#000000", // ✅ Standaard tekstkleur
          dark: "#ffffff",    // ✅ Tekstkleur in dark mode
        },
      },
    },
  },
  plugins: [],
};
