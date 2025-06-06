import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import path from 'path'
import { dependencies } from './package.json'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'auth-app',
      filename: 'remoteEntry.js',
      exposes: {
        './LoginPage': './src/pages/LoginPage',
        './RegisterPage': './src/pages/RegisterPage',
        './AuthProvider': './src/providers/AuthProvider'
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
        'recharts': { singleton: true },
        'react-icons': { singleton: true },
        'wouter': { singleton: true }
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@shared': path.resolve(__dirname, '../shared')
    }
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
  server: {
    port: 3001
  }
})