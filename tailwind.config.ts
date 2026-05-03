import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'trellis-primary': '#7A9E7E',
        'trellis-primary-deep': '#3F5E45',
        'trellis-secondary': '#C9B8E0',
        'trellis-accent': '#D4A574',
        'trellis-bg': '#F7F3ED',
        'trellis-surface': '#EDEAE3',
        'trellis-text': '#2A2E2B',
        'trellis-text-muted': '#6F756F',
        'trellis-crisis': '#C9534F',
      },
      fontFamily: {
        serif: ['var(--font-fraunces)'],
        sans: ['var(--font-inter)'],
      },
      borderRadius: {
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
};

export default config;
