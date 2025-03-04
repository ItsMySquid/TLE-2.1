/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        backgroundColor: {
          100: '#E8F1F5'
        },
        headerColor: {
          100: '#00C5A5'
        },
        buttonColor: {
          100: '#4AD996'
        },
        borderColor: {
          100: '#2D8474'
        },
        tekstColor: {
          100: '#354B46'
        },
      }
    },
  },
  plugins: [],
}

