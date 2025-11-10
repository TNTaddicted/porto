import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // For GitHub Pages: use '/porto/' (your repo name)
  // For custom domain: use '/'
  // In development, use '/' for local testing
  base: process.env.NODE_ENV === 'production' ? '/porto/' : '/',
})

