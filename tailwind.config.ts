import type { Config } from 'tailwindcss'

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['"Lexend"', 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
} satisfies Config

