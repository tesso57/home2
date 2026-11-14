import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";
import React from "react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { createServer } from "vite";

const siteUrl = "https://www.tesso.dev";
const outputDir = "dist";
const template = await readFile(join(outputDir, "index.html"), "utf8");
const assets = await readdir(join(outputDir, "assets"));

// Vite's SSR loader uses source asset URLs; map them to the production assets.
function productionAssetUrls(html) {
	return html.replace(
		/(src|href)="\/src\/assets\/([^"?#]+)"/g,
		(_, attr, path) => {
			const extension = extname(path);
			const name = basename(path, extension);
			const candidates = assets.filter(
				(asset) => asset.startsWith(`${name}-`) && asset.endsWith(extension),
			);
			if (candidates.length !== 1) {
				throw new Error(`Cannot identify built asset for ${path}`);
			}
			return `${attr}="/assets/${candidates[0]}"`;
		},
	);
}

function jsonLd(data) {
	return `<script type="application/ld+json">${JSON.stringify(data).replaceAll("<", "\\u003c")}</script>`;
}

function escapeHtml(value) {
	return String(value)
		.replaceAll("&", "&amp;")
		.replaceAll('"', "&quot;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;");
}

function pageHtml(content, url, structuredData, title, stylesheet) {
	if (!template.includes('<div id="app"></div>')) {
		throw new Error("Could not find the app root in the built HTML");
	}
	let html = template.replace(
		'<div id="app"></div>',
		`<div id="app">${content}</div>`,
	);
	html = html.replace(
		/<meta property="og:url" content="[^"]*"\s*\/>/,
		url ? `<meta property="og:url" content="${escapeHtml(url)}" />` : "",
	);
	if (title) {
		html = html.replace(
			/<title>[^<]*<\/title>/,
			`<title>${escapeHtml(title)} | tesso.dev</title>`,
		);
		html = html.replace(
			/<meta property="og:title" content="[^"]*"\s*\/>/,
			`<meta property="og:title" content="${escapeHtml(title)}" />`,
		);
	}
	const extraHead = `${url ? `<link rel="canonical" href="${escapeHtml(url)}" />` : '<meta name="robots" content="noindex" />'}${stylesheet ? `<link rel="stylesheet" href="${escapeHtml(stylesheet)}" />` : ""}${structuredData ? jsonLd(structuredData) : ""}`;
	return html.replace("</head>", `${extraHead}</head>`);
}

const server = await createServer({
	appType: "custom",
	logLevel: "silent",
	mode: "production",
	server: { middlewareMode: true },
});

try {
	const [
		{ Home },
		{ NotFound },
		{ blogs, loadPostBodyBySlug },
		{ profile },
		{ format },
		styles,
	] = await Promise.all([
		server.ssrLoadModule("/src/views/Home.tsx"),
		server.ssrLoadModule("/src/views/NotFound.tsx"),
		server.ssrLoadModule("/src/lib/blog.ts"),
		server.ssrLoadModule("/src/lib/profile.ts"),
		server.ssrLoadModule("/src/lib/date.ts"),
		server.ssrLoadModule("/src/components/Blog/BlogPost.module.css"),
	]);
	const person = {
		"@type": "Person",
		"@id": `${siteUrl}/#person`,
		name: profile.name,
		jobTitle: profile.role,
		description: profile.about,
		url: `${siteUrl}/`,
		sameAs: profile.links
			.map((link) => link.url)
			.filter((url) => url.startsWith("https://")),
	};
	const homeData = {
		"@context": "https://schema.org",
		"@graph": [
			person,
			{
				"@type": "WebSite",
				"@id": `${siteUrl}/#website`,
				name: "tesso.dev",
				url: `${siteUrl}/`,
				inLanguage: "ja",
				author: { "@id": person["@id"] },
			},
		],
	};
	const home = productionAssetUrls(
		renderToString(
			React.createElement(
				StaticRouter,
				{ location: "/" },
				React.createElement(Home),
			),
		),
	);
	await writeFile(
		join(outputDir, "index.html"),
		pageHtml(home, `${siteUrl}/`, homeData),
	);
	const notFound = renderToString(
		React.createElement(
			StaticRouter,
			{ location: "/404" },
			React.createElement(NotFound),
		),
	);
	await writeFile(
		join(outputDir, "404.html"),
		pageHtml(notFound, "", null, "ページが見つかりません"),
	);

	const blogCss = assets.filter((asset) => /^BlogPost-.*\.css$/.test(asset));
	if (blogs.length > 0 && blogCss.length !== 1) {
		throw new Error("Cannot identify the built blog stylesheet");
	}
	for (const blog of blogs) {
		if (!/^(?!\.{1,2}$)[^/\\?#%\p{Cc}]+$/u.test(blog.slug)) {
			throw new Error(`Invalid blog slug: ${blog.slug}`);
		}
		const Body = await loadPostBodyBySlug(blog.slug);
		if (!Body) throw new Error(`Cannot load blog post ${blog.slug}`);
		const element = React.createElement(
			"main",
			{ className: styles.page },
			React.createElement(
				"article",
				{ className: styles.article },
				React.createElement(
					"a",
					{ className: styles.back, href: "/#blog" },
					"記事一覧へ戻る",
				),
				React.createElement(
					"header",
					{ className: styles.header },
					React.createElement("h1", { className: styles.title }, blog.title),
					React.createElement(
						"div",
						{ className: styles.meta },
						React.createElement("span", null, format(blog.date)),
						React.createElement("span", null, blog.tags.join(" / ")),
					),
				),
				React.createElement(
					"div",
					{ className: styles.body },
					React.createElement(Body),
				),
			),
		);
		const url = `${siteUrl}/blog/${encodeURIComponent(blog.slug)}`;
		const data = {
			"@context": "https://schema.org",
			"@type": "BlogPosting",
			headline: blog.title,
			datePublished: blog.date.toISOString(),
			inLanguage: "ja",
			url,
			author: person,
			isPartOf: { "@id": `${siteUrl}/#website` },
		};
		const page = pageHtml(
			productionAssetUrls(renderToStaticMarkup(element)),
			url,
			data,
			blog.title,
			`/assets/${blogCss[0]}`,
		);
		const directory = join(outputDir, "blog", blog.slug);
		await mkdir(directory, { recursive: true });
		await writeFile(join(directory, "index.html"), page);
	}
} finally {
	await server.close();
}
