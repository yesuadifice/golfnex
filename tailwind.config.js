/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,css,scss}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A', // Dark blue for branding
        secondary: '#3B82F6', // Lighter blue for accents
        accent: '#22C55E', // Green for success
        danger: '#EF4444', // Red for errors
        muted: '#6B7280', // Gray for text
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Better form styling
    require('@tailwindcss/typography'), // Prose for content display
  ],
};
