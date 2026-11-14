import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { basename, dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createProcessor } from "@mdx-js/mdx";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router";
import { createServer } from "vite";

const root = fileURLToPath(new URL("../", import.meta.url));
const dist = join(root, "dist");
const postsDirectory = join(root, "src/assets/posts");
const siteUrl = "https://www.tesso.dev";
const processor = createProcessor({ format: "mdx" });

const readJson = async (path) =>
	JSON.parse(await readFile(join(root, path), "utf8"));

const escapeMarkdown = (value) =>
	String(value).replace(/[\\`*_{}[\]()#+.!|<>-]/g, "\\$&");
const escapeXml = (value) =>
	String(value).replace(
		/[&<>"']/g,
		(character) =>
			({
				"&": "&amp;",
				"<": "&lt;",
				">": "&gt;",
				'"': "&quot;",
				"'": "&apos;",
			})[character],
	);

function unquote(value) {
	return (value.startsWith('"') && value.endsWith('"')) ||
		(value.startsWith("'") && value.endsWith("'"))
		? value.slice(1, -1)
		: value;
}

function parsePost(source, filename) {
	const lines = source.split(/\r?\n/);
	if (lines[0]?.trim() !== "---")
		throw new Error(`${filename}: frontmatter is missing`);
	const end = lines.findIndex(
		(line, index) => index > 0 && line.trim() === "---",
	);
	if (end < 0) throw new Error(`${filename}: frontmatter is not closed`);
	const fields = {};
	for (const line of lines.slice(1, end)) {
		const match = /^([A-Za-z0-9_-]+)\s*:\s*(.*)$/.exec(line);
		if (match) fields[match[1]] = unquote(match[2].trim());
	}
	const { slug, title, date } = fields;
	if (!slug || !title || !date || Number.isNaN(new Date(date).getTime())) {
		throw new Error(`${filename}: valid slug, title, and date are required`);
	}
	if (!/^(?!\.{1,2}$)[^/\\?#%\p{Cc}]+$/u.test(slug)) {
		throw new Error(`${filename}: slug cannot be used as an output filename`);
	}
	const body = lines
		.slice(end + 1)
		.join("\n")
		.trim();
	const tree = processor.parse(body);
	let requiresRendering = false;
	const inspect = (node) => {
		if (node.type.startsWith("mdx")) {
			requiresRendering = true;
		}
		for (const child of node.children ?? []) inspect(child);
	};
	inspect(tree);
	return { slug, title, date, body, requiresRendering };
}

async function write(path, content) {
	const destination = join(dist, path);
	await mkdir(dirname(destination), { recursive: true });
	await writeFile(destination, `${content.trimEnd()}\n`, "utf8");
}

const [profile, works, filenames] = await Promise.all([
	readJson("src/assets/data/profile.json"),
	readJson("src/assets/data/works.json"),
	readdir(postsDirectory),
]);
const posts = await Promise.all(
	filenames
		.filter((file) => file.endsWith(".mdx"))
		.sort()
		.map(async (filename) =>
			parsePost(
				await readFile(join(postsDirectory, filename), "utf8"),
				filename,
			),
		),
);
const seen = new Set();
for (const post of posts) {
	if (seen.has(post.slug)) throw new Error(`Duplicate post slug: ${post.slug}`);
	seen.add(post.slug);
}
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

const mdLink = (label, url) => `[${escapeMarkdown(label)}](${url})`;
const postUrl = (slug) =>
	`${siteUrl}/blog/${encodeURIComponent(slug).replace(/[!'()*]/g, (character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`)}`;
const home = [
	`# ${escapeMarkdown(profile.name)}`,
	profile.role,
	"## 現在地",
	...profile.nowLines.map((line) => `- ${escapeMarkdown(line)}`),
	"## About",
	profile.about,
	`得意なもの: ${profile.skills.map((skill) => escapeMarkdown(skill.name)).join(", ")}`,
	`好きなもの: ${profile.likes.map(escapeMarkdown).join(", ")}`,
	"## Belonging",
	...profile.belongings.map(
		(entry) =>
			`- ${mdLink(entry.name, entry.link)} (${entry.since} – ${entry.until ?? "現在"}): ${entry.note}`,
	),
	"## Works",
	...works.map(
		(work) =>
			`- ${mdLink(work.title, work.link)} (${work.duration.since}${work.duration.until ? ` – ${work.duration.until}` : ""}): ${work.description} [${work.tags.map(escapeMarkdown).join(", ")}]`,
	),
	"## Blog",
	...posts.map(
		(post) => `- ${post.date} ${mdLink(post.title, postUrl(post.slug))}`,
	),
	"## Links",
	...profile.links.map((link) => `- ${mdLink(link.name, link.url)}`),
].join("\n\n");

let server;
try {
	let loadPostBodyBySlug;
	let builtAssets;
	if (posts.some((post) => post.requiresRendering)) {
		builtAssets = await readdir(join(dist, "assets"));
		server = await createServer({
			root,
			appType: "custom",
			logLevel: "silent",
			mode: "production",
			server: { middlewareMode: true },
		});
		({ loadPostBodyBySlug } = await server.ssrLoadModule("/src/lib/blog.ts"));
	}
	await rm(join(dist, "agent", "blog"), { recursive: true, force: true });
	await write("agent/index.md", home);
	await write(
		"agent/404.md",
		`# ページが見つかりませんでした\n\n- [ホーム](${siteUrl}/)\n- [ブログ](${siteUrl}/#blog)\n- [サイトマップ](${siteUrl}/sitemap.xml)`,
	);
	for (const post of posts) {
		let body = post.body;
		if (post.requiresRendering) {
			const Body = await loadPostBodyBySlug(post.slug);
			if (!Body) throw new Error(`Cannot load MDX post ${post.slug}`);
			const html = renderToStaticMarkup(
				React.createElement(
					StaticRouter,
					{ location: `/blog/${encodeURIComponent(post.slug)}` },
					React.createElement(Body),
				),
			);
			const publishedHtml = html.replace(
				/(src|href)="\/src\/assets\/([^"?#]+)"/g,
				(_, attr, path) => {
					const extension = extname(path);
					const name = basename(path, extension);
					const candidates = builtAssets.filter(
						(asset) =>
							asset.startsWith(`${name}-`) && asset.endsWith(extension),
					);
					if (candidates.length !== 1) {
						throw new Error(`Cannot identify built asset for ${path}`);
					}
					return `${attr}="/assets/${candidates[0]}"`;
				},
			);
			// HTML is valid Markdown and preserves components that have no Markdown equivalent.
			body = `<div>\n${publishedHtml}\n</div>`;
		}
		await write(
			`agent/blog/${post.slug}.md`,
			`# ${escapeMarkdown(post.title)}\n\n${post.date}\n\n${body}`,
		);
	}
} finally {
	await server?.close();
}
const urls = [`${siteUrl}/`, ...posts.map((post) => postUrl(post.slug))];
await write(
	"sitemap.xml",
	`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`).join("\n")}\n</urlset>`,
);
