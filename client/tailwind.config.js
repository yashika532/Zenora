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
      },
    },
  },
  plugins: [],
}

