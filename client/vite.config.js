import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/register': {
        target: 'https://mern-portfolio-server-eight.vercel.app',
        changeOrigin: true,
        secure: true,
      },
      '/signin': {
        target: 'https://mern-portfolio-server-eight.vercel.app',
        changeOrigin: true,
        secure: true,
      },
      '/about': {
        target: 'https://mern-portfolio-server-eight.vercel.app',
        changeOrigin: true,
        secure: true,
      },
      '/getData': {
        target: 'https://mern-portfolio-server-eight.vercel.app',
        changeOrigin: true,
        secure: true,
      },
      '/contact': {
        target: 'https://mern-portfolio-server-eight.vercel.app',
        changeOrigin: true,
        secure: true,
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
