import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


// lines added else it was not working....
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/register': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/signin': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/about': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/getData': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/contact': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
