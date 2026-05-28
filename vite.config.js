import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main:  resolve(__dirname, 'index.html'),
        ppt:   resolve(__dirname, 'ppt/index.html'),
        excel: resolve(__dirname, 'excel/index.html'),
      },
    },
  },
  server: {
    port: 4200,
    open: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['tests/unit/**/*.test.js'],
  },
})
