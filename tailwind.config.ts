import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './components/**/*.{vue,js,ts}',
    './pages/**/*.vue',
    './layouts/**/*.vue',
    './composables/**/*.{js,ts}',
    './utils/**/*.{js,ts}',
    './app.vue'
  ],
  safelist: [
    {
      pattern: /(bg|text|border)-(green|red|yellow|gray)-(100|300|700|800)/
    }
  ]
}