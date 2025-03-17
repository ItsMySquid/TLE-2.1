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
          100: '#ffffff',
          dark: '#f0f0f0'
        },
        headerColor: {
          100: '#008571'
        },
        buttonColor: {
          100: '#4AD996',
          dark: '#38A169', // Dark mode button color
          positive: '#4AD996',
          negative: '#EC6265'
        },
        borderColor: {
          100: '#2D8474',
          dark: '#4A5568' // Dark mode border color
        },
        tekstColor: {
          100: '#ffffff'
        },
      }
    },
  },
  plugins: [],
}

