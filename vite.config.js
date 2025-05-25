import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: process.env.GITHUB_PAGES 
    ? '/Proyecto1_web/'
    : '/fer/Laboratorios/Proyecto1_web/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.js'],
    coverage: {
      reporter: ['text', 'json', 'html']
    },
    include: ['src/**/*.{test,spec}.{js,jsx}']
  }
})
// https://vite.dev/config/
