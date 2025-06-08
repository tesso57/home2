import Works from "@/assets/data/works.json";
import type { Duration } from "./date";

export type Work = {
	title: string;
	description: string;
	tags: string[];
	link: string;
	imageUrl: string;
	duration: Duration;
};

const formatWorks = (): Work[] =>
	Works.map((work) => {
		const { title, description, tags, link, imageUrl, duration } = work;
		return {
			title,
			description,
			tags,
			link,
			imageUrl,
			duration: {
				since: new Date(duration.since),
				// keep `undefined` when `until` is not specified
				until: duration.until ? new Date(duration.until) : undefined,
			},
		};
	});

export const works: Work[] = formatWorks();
