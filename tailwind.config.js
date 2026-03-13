/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Georgia', 'serif', 'Times New Roman'],
      },
      colors: {
        emerald: {
          950: '#022c22',
        },
      },
    },
  },
  plugins: [],
}