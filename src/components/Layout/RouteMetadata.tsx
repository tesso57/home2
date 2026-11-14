import { useEffect } from "react";
import { useLocation, useMatch } from "react-router";
import { blogs } from "@/lib/blog";
import { profile } from "@/lib/profile";

const siteUrl = "https://www.tesso.dev";
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

function updateMeta(
	selector: string,
	attribute: string,
	name: string,
	value: string | null,
) {
	let element = document.head.querySelector<HTMLMetaElement>(selector);
	if (value === null) {
		element?.remove();
		return;
	}
	if (!element) {
		element = document.createElement("meta");
		element.setAttribute(attribute, name);
		document.head.appendChild(element);
	}
	element.content = value;
}

export function RouteMetadata() {
	const { pathname } = useLocation();
	const match = useMatch("/blog/:slug");
	const blog = blogs.find((item) => item.slug === match?.params.slug);
	const isHome = ["/", "/blog", "/blogs", "/works"].includes(
		pathname.replace(/\/$/, "") || "/",
	);

	useEffect(() => {
		const url = blog
			? `${siteUrl}/blog/${encodeURIComponent(blog.slug)}`
			: isHome
				? `${siteUrl}/`
				: null;
		const title = blog
			? `${blog.title} | tesso.dev`
			: isHome
				? "tesso.dev"
				: "ページが見つかりません | tesso.dev";
		document.title = title;
		updateMeta(
			'meta[property="og:title"]',
			"property",
			"og:title",
			blog?.title ?? (isHome ? "tesso's portfolio" : "ページが見つかりません"),
		);
		updateMeta('meta[property="og:url"]', "property", "og:url", url);
		updateMeta('meta[name="robots"]', "name", "robots", url ? null : "noindex");

		let canonical = document.head.querySelector<HTMLLinkElement>(
			'link[rel="canonical"]',
		);
		if (!url) {
			canonical?.remove();
		} else {
			if (!canonical) {
				canonical = document.createElement("link");
				canonical.rel = "canonical";
				document.head.appendChild(canonical);
			}
			canonical.href = url;
		}

		let script = document.head.querySelector<HTMLScriptElement>(
			'script[type="application/ld+json"]',
		);
		if (!url) {
			script?.remove();
			return;
		}
		if (!script) {
			script = document.createElement("script");
			script.type = "application/ld+json";
			document.head.appendChild(script);
		}
		script.textContent = JSON.stringify(
			blog
				? {
						"@context": "https://schema.org",
						"@type": "BlogPosting",
						headline: blog.title,
						datePublished: blog.date.toISOString(),
						inLanguage: "ja",
						url,
						author: person,
						isPartOf: { "@id": `${siteUrl}/#website` },
					}
				: {
						"@context": "https://schema.org",
						"@graph": [
							person,
							{
								"@type": "WebSite",
								"@id": `${siteUrl}/#website`,
								name: "tesso.dev",
								url,
								inLanguage: "ja",
								author: { "@id": person["@id"] },
							},
						],
					},
		);
	}, [blog, isHome]);

	return null;
}
