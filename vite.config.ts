import { URL, fileURLToPath } from "node:url";

import mdx from "@mdx-js/rollup";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

const srcPath = fileURLToPath(new URL("./src", import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		mdx({
			jsxImportSource: "vue",
		}),
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
          @use "${srcPath}/styles/common.scss" as *;
        `,
			},
		},
	},
});
