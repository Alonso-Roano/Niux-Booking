import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@admin': path.resolve(__dirname, 'src/modules/admin'),
      '@auth': path.resolve(__dirname, 'src/modules/auth'),
      '@client': path.resolve(__dirname, 'src/modules/client'),
      '@company': path.resolve(__dirname, 'src/modules/company'),
      '@core': path.resolve(__dirname, 'src/modules/core'),
      '@shared': path.resolve(__dirname, 'src/modules/shared'),
      '@pages': path.resolve(__dirname, 'src/modules/pages'),
    },
  },
})
