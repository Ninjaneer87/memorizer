/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': "var(--color-primary)",
        'secondary': "var(--color-secondary)",
        'placeholder': "var(--color-placeholder)",
        'bg': "var(--color-background)",
        'bg-paper': "var(--color-background-paper)",
        'text': "var(--color-text)",
        'border': "var(--color-border)",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
