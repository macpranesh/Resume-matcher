// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Resume-matcher/', // replace with your repo name
  plugins: [react()],
})
