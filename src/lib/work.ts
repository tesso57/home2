import Works from "@/assets/data/works.json";
import { type Duration, format, formatDuration } from "./date";

type WorkDateMode = "period" | "date";

export type Work = {
	title: string;
	description: string;
	tags: string[];
	link: string;
	imageUrl: string;
	dateMode: WorkDateMode;
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
			dateMode: work.dateMode === "date" ? "date" : "period",
			duration: {
				since: new Date(duration.since),
				// keep `undefined` when `until` is not specified
				until: duration.until ? new Date(duration.until) : undefined,
			},
		};
	});

export const works: Work[] = formatWorks();

export const formatWorkDate = (work: Work, showTrailingTilde = false) =>
	work.dateMode === "date"
		? format(work.duration.since)
		: formatDuration(work.duration, showTrailingTilde);
