import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { setupServer } from './server/server.js'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'mock-api',
      configureServer(server) {
        setupServer(server.middlewares)
      }
    }
  ],
  server: {
    port: 3000
  }
})