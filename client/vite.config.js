import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/register': {
        target: 'https://mern-portfolio-server-eight.vercel.app',
        changeOrigin: true,
        secure: false,
      },
      '/signin': {
        target: 'https://mern-portfolio-server-eight.vercel.app',
        changeOrigin: true,
        secure: false,
      },
      '/about': {
        target: 'https://mern-portfolio-server-eight.vercel.app',
        changeOrigin: true,
        secure: false,
      },
      '/getData': {
        target: 'https://mern-portfolio-server-eight.vercel.app',
        changeOrigin: true,
        secure: false,
      },
      '/contact': {
        target: 'https://mern-portfolio-server-eight.vercel.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  // Handle client-side routing
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
