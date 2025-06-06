import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import path from 'path'

export default defineConfig({
  optimizeDeps: {
    include: ['react', 'react-dom', '@tanstack/react-query', 'recharts', 'react-icons', 'wouter']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@shared': path.resolve(__dirname, '../shared')
    }
  },
  build: {
    target: 'es2020',
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        format: 'esm',
        entryFileNames: '[name].js'
      }
    }
  },
  plugins: [
    react(),
    federation({
      name: 'shell-app',
      remotes: {
        authApp: 'http://localhost:3001/assets/remoteEntry.js',
        dashboardApp: 'http://localhost:3003/assets/remoteEntry.js',
        notFoundApp: 'http://localhost:3004/assets/remoteEntry.js'
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
        '@tanstack/react-query': { singleton: true },
        recharts: { singleton: true },
        'react-icons': { singleton: true },
        wouter: { singleton: true }
      }
    })
  ],
  server: {
    port: 3000
  }
})