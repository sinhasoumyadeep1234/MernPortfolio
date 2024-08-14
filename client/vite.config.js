import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // if you're using React

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // Add plugins here
  server: {
    port: 3000, // Set the port for the dev server
  },
  build: {
    outDir: 'dist', // Output directory for the build files
  },
  resolve: {
    alias: {
      '@': '/src', // Allows you to use '@' as an alias for the 'src' directory
    },
  },
});
