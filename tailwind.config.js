/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: "#ffffff",
          dark: "#1a202c",
        },
        header: {
          DEFAULT: "#008571", // ✅ Navbar blijft groen in beide modi
          dark: "#008571", // ✅ Voorkomt kleurverandering in dark mode
        },
        button: {
          DEFAULT: "#4AD996", // ✅ Standaard groen voor buttons
          dark: "#4AD996", // ✅ Zelfde kleur in dark mode
          positive: "#4AD996",
          negative: "#EC6265",
        },
        border: {
          DEFAULT: "#2D8474", // ✅ Grenzen blijven hetzelfde
          dark: "#2D8474",
        },
        text: {
          DEFAULT: "#000000", // ✅ Standaard tekstkleur
          dark: "#ffffff",
        },
      },
    },
  },
  plugins: [],
};
