/** @type {import('vite').UserConfig} */

import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    manifest: true,
    rollupOptions: {
      input: {
        // main: resolve(__dirname, 'templates/index.html'),
        textOps: resolve(__dirname, 'apps/text-ops/index.html'),
      },
    },
    emptyOutDir: false,
    outDir: 'static',
  },
  publicDir: false,
})