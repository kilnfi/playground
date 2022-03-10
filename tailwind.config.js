module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1366px',
    },
    extend: {
      colors: {
        'primary': '#3e55f9',
        'primary-light': '#5468fd',
        'primary-dark': '#2738cc',
      },
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
