/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':"#1fb6ff", // blue
        'secondary':"#14b8a6", // teal
      },
    },
  },
  plugins: [],
}