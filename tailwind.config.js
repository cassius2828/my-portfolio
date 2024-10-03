/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      boxShadow: {
        "blue-lg": "0 0 15px 3px rgba(59, 130, 246, 0.7), 0 0 6px 1px rgba(59, 130, 246, 0.5)",
      },
    },
  },
  plugins: [],
};