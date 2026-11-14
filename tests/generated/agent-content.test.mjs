import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import {
	cp,
	mkdir,
	mkdtemp,
	readFile,
	rm,
	symlink,
	writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { promisify } from "node:util";

const read = (path) =>
	readFile(new URL(`../../dist/${path}`, import.meta.url), "utf8");

test("the homepage is readable without JavaScript and identifies the author", async () => {
	const html = await read("index.html");
	assert.match(html, /Go言語を使ったバックエンド開発/);
	const json = /<script type="application\/ld\+json">(.*?)<\/script>/.exec(
		html,
	);
	assert.ok(json, "homepage JSON-LD is missing");
	const data = JSON.parse(json[1]);
	assert.ok(
		data["@graph"].some(
			(item) =>
				item["@type"] === "Person" &&
				item.sameAs.includes("https://github.com/tesso57"),
		),
	);
});

test("an article has readable HTML, metadata, and a Markdown representation", async () => {
	const html = await read("blog/2024-06-09/index.html");
	const markdown = await read("agent/blog/2024-06-09.md");
	for (const content of [html, markdown]) {
		assert.match(content, /2つ以上の記事を反映できるようにしたよ/);
		assert.match(content, /こんにちは/);
	}
	const json = /<script type="application\/ld\+json">(.*?)<\/script>/.exec(
		html,
	);
	assert.ok(json, "article JSON-LD is missing");
	assert.equal(JSON.parse(json[1])["@type"], "BlogPosting");
});

test("the sitemap and Markdown homepage point to the published blog", async () => {
	const sitemap = await read("sitemap.xml");
	const markdown = await read("agent/index.md");
	assert.match(sitemap, /https:\/\/www\.tesso\.dev\/blog\/2024-06-09/);
	assert.match(markdown, /https:\/\/www\.tesso\.dev\/blog\/2024-06-09/);
	assert.match(markdown, /バックエンドエンジニア/);
});

test("the generated 404 representations offer a way back", async () => {
	const html = await read("404.html");
	const markdown = await read("agent/404.md");
	assert.match(html, /ページが見つかりません/);
	assert.match(markdown, /ページが見つかりません/);
	assert.match(markdown, /sitemap\.xml/);
});

test("MDX components and Unicode slugs remain readable in generated Markdown", async () => {
	const root = new URL("../../", import.meta.url);
	const temp = await mkdtemp(join(tmpdir(), "home2-agent-content-"));
	try {
		await cp(new URL("src", root), join(temp, "src"), { recursive: true });
		await cp(new URL("scripts", root), join(temp, "scripts"), {
			recursive: true,
		});
		await cp(new URL("dist/assets", root), join(temp, "dist/assets"), {
			recursive: true,
		});
		await cp(new URL("vite.config.ts", root), join(temp, "vite.config.ts"));
		await symlink(
			new URL("node_modules", root).pathname,
			join(temp, "node_modules"),
			"dir",
		);
		await mkdir(join(temp, "src/assets/posts"), { recursive: true });
		await writeFile(
			join(temp, "src/assets/posts/agent-fixture.mdx"),
			`---\nslug: 新しい記事\ntitle: テスト記事\ndate: 2024-06-10\n---\n\nimport picture from '../trapstar.webp'\nexport const name = '世界'\n\nこんにちは <strong>{name}</strong>\n\n<img src={picture} alt="fixture" />\n`,
		);
		await promisify(execFile)(
			process.execPath,
			[join(temp, "scripts/generate-agent-content.mjs")],
			{ cwd: temp, env: { ...process.env, NODE_ENV: "production" } },
		);
		const markdown = await readFile(
			join(temp, "dist/agent/blog/新しい記事.md"),
			"utf8",
		);
		const sitemap = await readFile(join(temp, "dist/sitemap.xml"), "utf8");
		assert.match(markdown, /こんにちは/);
		assert.match(markdown, /<strong>世界<\/strong>/);
		assert.match(markdown, /\/assets\/trapstar-[^" ]+\.webp/);
		assert.match(sitemap, /%E6%96%B0%E3%81%97%E3%81%84%E8%A8%98%E4%BA%8B/);
	} finally {
		await rm(temp, { recursive: true, force: true });
	}
});
