const theme = require('@kilnfi/design-system/dist/theme');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@kilnfi/design-system/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1366px',
    },
    extend: {
      ...theme,
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
