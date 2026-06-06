import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest:    '#0D2E28',
        teal:      '#1A6B5A',
        green:     '#5EC9A7',
        parchment: '#F5F3EE',
        amber:     '#C9A96E',
        red:       '#D96A6A',
        ink:       '#0D2E28',
      },
      fontFamily: {
        serif: ['DM Serif Display', 'Georgia', 'serif'],
        sans:  ['DM Sans', 'system-ui', 'sans-serif'],
        mono:  ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      maxWidth: {
        content: '1240px',
      },
      letterSpacing: {
        eyebrow: '0.18em',
        label:   '0.12em',
        wide:    '0.22em',
      },
    },
  },
  plugins: [],
}

export default config
