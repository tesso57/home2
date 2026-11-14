import assert from "node:assert/strict";
import { mkdtemp, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";
import { after, before, test } from "node:test";
import { createServer } from "vite";

const marker = "outside-project-mdx-raw-security-test";
let server;
let baseUrl;
let temporaryDirectory;
let privateFile;
let privateMdxFile;
let linkedPost;
let linkCreated = false;

before(async () => {
	temporaryDirectory = await mkdtemp(join(tmpdir(), "home2-mdx-security-"));
	privateFile = join(temporaryDirectory, "private");
	privateMdxFile = join(temporaryDirectory, "private.mdx");
	linkedPost = join(
		process.cwd(),
		"src/assets/posts",
		`${basename(temporaryDirectory)}.mdx`,
	);
	await writeFile(privateFile, marker);
	await writeFile(privateMdxFile, marker);
	server = await createServer({
		logLevel: "silent",
		server: { host: "127.0.0.1", port: 0 },
	});
	await server.listen();
	baseUrl = `http://127.0.0.1:${server.httpServer.address().port}`;
});

after(async () => {
	await server?.close();
	if (linkCreated) {
		await rm(linkedPost, { force: true });
	}
	if (temporaryDirectory) {
		await rm(temporaryDirectory, { recursive: true, force: true });
	}
});

test("the dev server does not expose outside MDX files through a virtual module", async () => {
	const response = await fetch(
		`${baseUrl}/@id/__x00__mdx-raw:${privateMdxFile}?import`,
	);
	assert.equal(
		(await response.text()).includes(marker),
		false,
		"outside MDX contents leaked",
	);
});

test("a post symlink cannot expose an outside file", async () => {
	await symlink(privateMdxFile, linkedPost);
	linkCreated = true;
	const response = await fetch(
		`${baseUrl}/@id/__x00__mdx-raw:${linkedPost}?import`,
	);
	assert.equal(
		(await response.text()).includes(marker),
		false,
		"symlink target contents leaked",
	);
});

test("the dev server does not expose arbitrary files through a virtual MDX module", async () => {
	const response = await fetch(`${baseUrl}/@id/__x00__mdx-raw:${privateFile}`);
	const body = await response.text();
	assert.equal(body.includes(marker), false, "outside file contents leaked");
});

test("the dev server serves blog posts as raw MDX", async () => {
	const response = await fetch(
		`${baseUrl}/src/assets/posts/2024-06-09.mdx?raw`,
	);
	assert.equal(response.status, 200);
	assert.match(await response.text(), /slug:\s*2024-06-09/);
});
