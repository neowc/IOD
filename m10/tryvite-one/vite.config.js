import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true,
    host: true, // needed for docker
    port: 8082,
    strictPort: true,
    watch: {
      usePolling: true
    }
  },
  preview: {
    host: true,
    port: 8082,
    strictPort: true
  },
  // server: {
  //   allowedHosts: ['frontend_web'],
  // },
  cors:{
    // origin: 'http://localhost:5173',
    AccessControlAllowOrigin: '*',
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }

})
