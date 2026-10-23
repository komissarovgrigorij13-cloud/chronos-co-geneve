import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Bind to 0.0.0.0 so both 127.0.0.1 and localhost work reliably
    port: 5173,
    strictPort: true,
  },
})
