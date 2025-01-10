import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.', // Set the root directory to the project root
  build: {
    outDir: 'dist', // Directory to output built files
    emptyOutDir: true, // Clean the output directory before building
  },
});

