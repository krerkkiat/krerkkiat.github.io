/** @type {import('vite').UserConfig} */

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    manifest: false,
    rollupOptions: {
      input: {
        // main: resolve(__dirname, 'templates/index.html'),
        capitalNeeded: resolve(__dirname, "apps/capital-needed/index.html"),
        createPassword: resolve(__dirname, "apps/create-password/index.html"),
        createQrCode: resolve(__dirname, "apps/create-qrcode/index.html"),
        textOps: resolve(__dirname, "apps/text-ops/index.html"),
      },
    },
    // To not clear the static folder.
    emptyOutDir: false,
    outDir: "static",
  },
  publicDir: false,
});
