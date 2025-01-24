/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '900px': '900px',
      },
      colors: {
        'gradient-start': '#6a11cb',
        'gradient-end': '#2575fc',
        primary: '#1A202C', // Dark background
        secondary: '#2D3748', // Slightly lighter dark color
        highlight: '#1E40AF', // Blue highlight color
        accent: '#3B82F6', // Light blue accent
        text: '#E2E8F0', // Light gray text
        card: '#2B3A42', // Video card background
      },
    },
  },
  plugins: [],
}

