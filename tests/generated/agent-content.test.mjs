import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

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
