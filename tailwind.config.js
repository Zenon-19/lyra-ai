import typographyPlugin from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {    extend: {      colors: {
        offwhite: '#F7F7F8',
        charcoal: '#1F1F1F',
        crimson: '#D93B3B',
        deepred: '#D93B3B', // Keep for backward compatibility
        'stealth-blue': '#007AFF',
        'dusty-rose': '#DEB3AD',
        'coral': '#DE847B',
        'tiger-lily': '#B95C50',
        'deep-burgundy': '#3B0404',
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-up': 'slideIn 0.3s ease-out forwards',
        'pulse-gentle': 'pulse 2s infinite',
        'typing-dots': 'typing 0.8s infinite',
        'blink': 'avatarBlink 4s ease-in-out infinite',
        'glow': 'glowPulse 2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'emotion-shift': 'emotionTransition 1s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [typographyPlugin],
}
