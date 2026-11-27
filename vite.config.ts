import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['lucide-react', 'three', 'gsap', 'motion/react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          three: ['three'],
          gsap: ['gsap', '@gsap/react'],
          motion: ['motion'],
          icons: ['lucide-react'],
        },
      },
    },
  },
});
