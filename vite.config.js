import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main:           resolve(__dirname, 'index.html'),
        ppt:            resolve(__dirname, 'ppt/index.html'),
        pptShortcuts:   resolve(__dirname, 'ppt/shortcuts/index.html'),
        excel:          resolve(__dirname, 'excel/index.html'),
        excelShortcuts: resolve(__dirname, 'excel/shortcuts/index.html'),
        word:           resolve(__dirname, 'word/index.html'),
        wordShortcuts:  resolve(__dirname, 'word/shortcuts/index.html'),
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
