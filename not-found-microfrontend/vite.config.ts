import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'not-found-app',
      filename: 'remoteEntry.js',
      exposes: {
        './NotFoundPage': './src/pages/NotFoundPage'
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
        '@tanstack/react-query': { singleton: true },
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
    port: 3004
  }
});