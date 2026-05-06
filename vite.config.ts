import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";

import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

const srcPath = fileURLToPath(new URL("./src", import.meta.url));
const repoPath = fileURLToPath(new URL(".", import.meta.url));
const FRONTMATTER_DELIMITER = "---";

const resolveMdxRawPath = (source: string, importer?: string): string => {
	const [filepath = ""] = source.split("?");
	if (filepath.startsWith("@/")) {
		return `${srcPath}/${filepath.slice(2)}`;
	}
	if (filepath.startsWith("/src/")) {
		return `${repoPath}${filepath.slice(1)}`;
	}
	if (filepath.startsWith(".") && importer) {
		const [importerPath = ""] = importer.split("?");
		return resolve(dirname(importerPath), filepath);
	}
	return filepath;
};

const stripFrontmatter = (source: string): string => {
	const lines = source.split(/\r?\n/);
	if (lines[0]?.trim() !== FRONTMATTER_DELIMITER) {
		return source;
	}

	for (let i = 1; i < lines.length; i++) {
		if (lines[i]?.trim() === FRONTMATTER_DELIMITER) {
			return lines.slice(i + 1).join("\n");
		}
	}

	return source;
};

const mdxFrontmatterPlugin = (): Plugin => ({
	name: "mdx-frontmatter-stripper",
	enforce: "pre",
	transform(code, id) {
		const [filepath = ""] = id.split("?");
		if (!filepath.endsWith(".mdx")) {
			return null;
		}

		return {
			code: stripFrontmatter(code),
			map: null,
		};
	},
});

const mdxRawPlugin = (): Plugin => ({
	name: "mdx-raw-loader",
	enforce: "pre",
	resolveId(source, importer) {
		if (!source.includes(".mdx?raw")) {
			return null;
		}

		return `\0mdx-raw:${resolveMdxRawPath(source, importer)}`;
	},
	load(id) {
		if (!id.startsWith("\0mdx-raw:")) {
			return null;
		}

		const filepath = id.slice("\0mdx-raw:".length);
		return `export default ${JSON.stringify(readFileSync(filepath, "utf8"))};`;
	},
});

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), mdxRawPlugin(), mdxFrontmatterPlugin(), mdx()],
	resolve: {
		alias: {
			"@": srcPath,
		},
	},
});
