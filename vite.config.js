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
        word:              resolve(__dirname, 'word/index.html'),
        wordShortcuts:     resolve(__dirname, 'word/shortcuts/index.html'),
        outlook:           resolve(__dirname, 'outlook/index.html'),
        outlookShortcuts:  resolve(__dirname, 'outlook/shortcuts/index.html'),
        chrome:            resolve(__dirname, 'chrome/index.html'),
        chromeShortcuts:   resolve(__dirname, 'chrome/shortcuts/index.html'),
        teams:             resolve(__dirname, 'teams/index.html'),
        teamsShortcuts:    resolve(__dirname, 'teams/shortcuts/index.html'),
        mac:               resolve(__dirname, 'mac/index.html'),
        macShortcuts:      resolve(__dirname, 'mac/shortcuts/index.html'),
        tips:              resolve(__dirname, 'tips/index.html'),
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
