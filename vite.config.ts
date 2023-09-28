import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Specify your desired output directory here
    outDir: 'build',
  },
  base: '/',
})

