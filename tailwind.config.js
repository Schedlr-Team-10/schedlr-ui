/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  theme: {
    extend: {
      fontFamily: {
        'julius': ['"Julius Sans One"', 'sans-serif'],
        'cinzel-decorative': ['"Cinzel Decorative"', 'serif'],
        'sans': ["Poppins", "sans-serif"]
      },
    },
  },
  plugins: [],
}

