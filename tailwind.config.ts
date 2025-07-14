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
        'emerald-600': '#059669',
        'cyan-600': '#0891b2',
        'blue-600': '#2563eb',
        'purple-600': '#9333ea',
        'amber-600': '#d97706',
        'green-600': '#16a34a',
        'rose-600': '#e11d48',
        'indigo-600': '#4f46e5',
        'pink-600': '#db2777',
        'emerald-50': '#ecfdf5',
        'cyan-50': '#ecfeff',
        'blue-50': '#eff6ff',
        'purple-50': '#f5f3ff',
        'amber-50': '#fffbeb',
        'green-50': '#f0fdf4',
        'rose-50': '#fff1f2',
        'teal-50': '#f0fdfa',
        'indigo-50': '#eef2ff',
      },
    },
  },
  plugins: [],
}
export default config


