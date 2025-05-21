import typographyPlugin from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#F9FAFB', // Off-white
        primary: '#222222', // Black for text
        accent: '#8AB9CE', // Sky blue for emphasis
        cta: '#000000', // Black for buttons
        personaBlue: '#C8E3F4', // Persona card blue
        personaPink: '#FBE5E5', // Persona card pink
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '1.25rem',
        '2xl': '2rem',
      },
      boxShadow: {
        card: '0 4px 24px 0 rgba(138, 185, 206, 0.08)',
      },
    },
  },
  plugins: [typographyPlugin],
}
