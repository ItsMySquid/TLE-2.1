/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        backgroundColor: {
          100: '#E8F1F5',
          dark: '#1A202C' // Dark mode background color
        },
        headerColor: {
          100: '#00C5A5',
          dark: '#2D3748' // Dark mode header color
        },
        buttonColor: {
          100: '#4AD996',
          dark: '#38A169' // Dark mode button color
        },
        borderColor: {
          100: '#2D8474',
          dark: '#4A5568' // Dark mode border color
        },
        tekstColor: {
          100: '#354B46',
          dark: '#CBD5E0' // Dark mode text color
        },
      }
    },
  },
  plugins: [],
}