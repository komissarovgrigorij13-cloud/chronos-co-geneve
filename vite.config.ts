import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Keep the hosted Site at the root while giving GitHub Pages the
  // repository prefix it needs for static asset URLs.
  base: process.env.GITHUB_ACTIONS ? '/chronos-co-geneve/' : '/',
  server: {
    host: '0.0.0.0', // Bind to 0.0.0.0 so both 127.0.0.1 and localhost work reliably
    port: 5173,
    strictPort: true,
  },
})
