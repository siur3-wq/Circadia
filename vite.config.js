import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  logLevel: 'error', // Suppress warnings, only show errors
  plugins: [react()],
  resolve: {
    alias: {
      // This tells Vite that "@" pointing to files maps directly to your "src" folder
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})