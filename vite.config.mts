import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import PurgeIcons from "vite-plugin-purge-icons";
import mdx from "@mdx-js/rollup";

const srcPath = fileURLToPath(new URL("./src", import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    mdx({
      jsxImportSource: "vue",
    }),
    PurgeIcons(),
  ],
  resolve: {
    alias: {
      "@": srcPath,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use 'sass:math';
          @import "${srcPath}/styles/common.scss";
        `,
      },
    },
  },
});
