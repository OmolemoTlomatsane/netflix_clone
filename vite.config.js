import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // You can leave out root if you use the default structure
  root: './public', // if necessary, to ensure the app is built from the correct directory
})

