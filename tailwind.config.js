/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#7c3aed',
      },
      backgroundColor: ({ theme }) => ({
        ...theme('colors'),
      }),
      textColor: ({ theme }) => ({
        ...theme('colors'),
      }),
      borderColor: ({ theme }) => ({
        ...theme('colors'),
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}