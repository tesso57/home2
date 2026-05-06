import type { ComponentType } from "react";

export type Blog = {
	slug: string;
	title: string;
	tags: string[];
	date: Date;
};

type BlogFrontmatter = {
	slug?: string;
	title?: string;
	date?: string;
	tags?: string[];
};

type ParsedPost = {
	blog: Blog;
	moduleId: string;
};

const FRONTMATTER_DELIMITER = "---";

const postSources = import.meta.glob("@/assets/posts/*.mdx", {
	eager: true,
	import: "default",
	query: "?raw",
}) as Record<string, string>;

const postBodies = import.meta.glob<{ default: ComponentType }>(
	"@/assets/posts/*.mdx",
);

const stripQuotes = (value: string): string => {
	if (
		(value.startsWith('"') && value.endsWith('"')) ||
		(value.startsWith("'") && value.endsWith("'"))
	) {
		return value.slice(1, -1);
	}
	return value;
};

const extractFrontmatterLines = (source: string): string[] => {
	const lines = source.split(/\r?\n/);
	if (lines[0]?.trim() !== FRONTMATTER_DELIMITER) {
		return [];
	}

	for (let i = 1; i < lines.length; i++) {
		if (lines[i]?.trim() === FRONTMATTER_DELIMITER) {
			return lines.slice(1, i);
		}
	}

	return [];
};

const parseInlineTags = (value: string): string[] => {
	const trimmed = value.trim();
	if (!trimmed.startsWith("[") || !trimmed.endsWith("]")) {
		return [];
	}

	return trimmed
		.slice(1, -1)
		.split(",")
		.map((tag) => stripQuotes(tag.trim()))
		.filter((tag) => tag.length > 0);
};

const parseFrontmatter = (source: string): BlogFrontmatter => {
	const frontmatter: BlogFrontmatter = {};
	const lines = extractFrontmatterLines(source);
	let inTags = false;

	for (const line of lines) {
		const keyValue = /^([A-Za-z0-9_-]+)\s*:\s*(.*)$/.exec(line);
		if (keyValue) {
			const key = keyValue[1];
			const rawValue = keyValue[2];
			if (!key || rawValue === undefined) {
				continue;
			}
			const value = rawValue.trim();
			inTags = false;

			if (key === "slug") {
				frontmatter.slug = stripQuotes(value);
			}

			if (key === "title") {
				frontmatter.title = stripQuotes(value);
			}

			if (key === "date") {
				frontmatter.date = stripQuotes(value);
			}

			if (key === "tags") {
				if (!value) {
					frontmatter.tags = [];
					inTags = true;
				} else {
					frontmatter.tags = parseInlineTags(value);
				}
			}

			continue;
		}

		if (!inTags) {
			continue;
		}

		const tagItem = /^\s*-\s*(.+)$/.exec(line);
		if (!tagItem) {
			continue;
		}

		const tagValue = tagItem[1];
		if (!tagValue) {
			continue;
		}

		frontmatter.tags ??= [];
		frontmatter.tags.push(stripQuotes(tagValue.trim()));
	}

	return frontmatter;
};

const createPost = (moduleId: string, source: string): ParsedPost | null => {
	if (!postBodies[moduleId]) {
		console.warn(`[blog] Missing MDX body module: ${moduleId}`);
		return null;
	}

	const frontmatter = parseFrontmatter(source);
	if (!frontmatter.slug) {
		console.warn(`[blog] Missing slug in frontmatter: ${moduleId}`);
		return null;
	}

	if (!frontmatter.title) {
		console.warn(`[blog] Missing title in frontmatter: ${moduleId}`);
		return null;
	}

	if (!frontmatter.date) {
		console.warn(`[blog] Missing date in frontmatter: ${moduleId}`);
		return null;
	}

	const date = new Date(frontmatter.date);
	if (Number.isNaN(date.getTime())) {
		console.warn(`[blog] Invalid date in frontmatter: ${moduleId}`);
		return null;
	}

	return {
		blog: {
			slug: frontmatter.slug,
			title: frontmatter.title,
			tags: frontmatter.tags ?? [],
			date,
		},
		moduleId,
	};
};

const parsedPosts = Object.entries(postSources)
	.map(([moduleId, source]) => createPost(moduleId, source))
	.filter((post): post is ParsedPost => post !== null)
	.sort((a, b) => b.blog.date.getTime() - a.blog.date.getTime());

const uniquePosts: ParsedPost[] = [];
const slugs = new Set<string>();
for (const post of parsedPosts) {
	if (slugs.has(post.blog.slug)) {
		console.warn(`[blog] Duplicate slug ignored: ${post.blog.slug}`);
		continue;
	}
	slugs.add(post.blog.slug);
	uniquePosts.push(post);
}

export const blogs: Blog[] = uniquePosts.map(({ blog }) => blog);

const postBodyLoadersBySlug = Object.fromEntries(
	uniquePosts.map(({ blog, moduleId }) => [blog.slug, postBodies[moduleId]]),
) as Record<string, (() => Promise<{ default: ComponentType }>) | undefined>;

export const loadPostBodyBySlug = async (slug: string) => {
	const loader = postBodyLoadersBySlug[slug];
	if (!loader) {
		return null;
	}

	const module = await loader();
	return module.default;
};
