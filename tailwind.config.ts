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
        'therapy-primary': '#7A9E7E',
        'therapy-primary-deep': '#3F5E45',
        'therapy-secondary': '#C9B8E0',
        'therapy-accent': '#D4A574',
        'therapy-bg': '#F7F3ED',
        'therapy-surface': '#EDEAE3',
        'therapy-text': '#2A2E2B',
        'therapy-text-muted': '#6F756F',
        'therapy-crisis': '#C9534F',
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
