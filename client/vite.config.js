import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isGhPages = mode === 'gh-pages'

  return {
    plugins: [react()],
    base: isGhPages ? '/city-soundscape/' : '/',
    build: {
      outDir: isGhPages ? 'dist' : '../server/public',
      emptyOutDir: true
    },
    resolve: {
      alias: {
        'picocss': path.resolve(__dirname, '../node_modules/@picocss/pico/css')
      }
    },
    server: {
      proxy: {
        '/api': {
          target: `http://localhost:${Number(process.env.BACKEND_PORT) || 3000}`
        }
      }
    }
  }
})