import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  define: {
    'process.env': {}, // Ensure compatibility for Angular's environment variables
  },
  optimizeDeps: {
    exclude: ['zone.js', '@angular/elements'], // Exclude Zone.js and Angular Elements from pre-bundling
  },
  server: {
    port: 5173, // Use your desired port here
    hmr: false, // Temporarily disable HMR to avoid potential conflicts
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true, // Helps with handling Angular CommonJS modules
    }
  },
})