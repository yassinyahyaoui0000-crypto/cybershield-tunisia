import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Cybersecurity-themed neon color palette
        primary: {
          DEFAULT: '#00d9ff', // Neon cyan
          light: '#5df4ff',
          dark: '#0099cc',
        },
        success: {
          DEFAULT: '#00ff88', // Neon green
          light: '#5dffb3',
          dark: '#00cc6a',
        },
        warning: {
          DEFAULT: '#ffcc00', // Neon yellow
          light: '#ffe066',
          dark: '#cc9900',
        },
        danger: {
          DEFAULT: '#ff0055', // Neon pink/red
          light: '#ff5588',
          dark: '#cc0044',
        },
        // Surface colors for cards/panels
        surface: {
          light: '#ffffff',
          dark: '#0a0e1a', // Deep dark blue
          'dark-elevated': '#121829', // Slightly lighter for cards
        },
        // Text colors
        text: {
          primary: '#e5e7eb', // Light gray for dark backgrounds
          secondary: '#9ca3af', // Muted gray
          dark: '#1f2937', // Dark text for light backgrounds
        },
        // Glow effects
        glow: {
          cyan: 'rgba(0, 217, 255, 0.5)',
          green: 'rgba(0, 255, 136, 0.5)',
          yellow: 'rgba(255, 204, 0, 0.5)',
          pink: 'rgba(255, 0, 85, 0.5)',
        },
      },
      fontFamily: {
        arabic: ['Cairo', 'Noto Sans Arabic', 'sans-serif'],
      },
      // Cyber gradient animations
      animation: {
        'cyber-gradient': 'cyber-gradient 15s ease infinite',
      },
      keyframes: {
        'cyber-gradient': {
          '0%, 100%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
