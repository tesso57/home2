import type { Belonging } from "@/lib/profile";

export const timelineLaneMeta = {
	edu: { label: "教育", color: "var(--peach)" },
	work: { label: "仕事", color: "var(--apricot)" },
	community: { label: "コミュニティ", color: "var(--teal)" },
} as const;

export type TimelineLaneKey = keyof typeof timelineLaneMeta;

export type TimelineBar = Belonging & {
	category: TimelineLaneKey;
	index: number;
	left: number;
	width: number;
	ongoing: boolean;
	period: string;
};

export type TimelineLaneBar = TimelineBar & {
	row: number;
};

export type TimelineLane = {
	key: TimelineLaneKey;
	label: string;
	color: string;
	bars: TimelineLaneBar[];
	rows: number;
};

type TimelineModel = {
	lanes: TimelineLane[];
	years: number[];
	nowX: number;
	endYear: number;
	startYear: number;
};

const TIMELINE_START_YEAR = 2020;
const MIN_TIMELINE_END_YEAR = 2027;
const MIN_BAR_WIDTH = 7;
const ROW_COLLISION_GAP = 0.35;

const toYearFraction = (value?: string) => {
	if (!value) return null;

	const [yearText, monthText = "1"] = value.split("-");
	const year = Number(yearText);
	const month = Number(monthText);
	if (!Number.isFinite(year) || !Number.isFinite(month)) return null;

	return year + (month - 1) / 12;
};

const formatPeriod = (item: Belonging) => {
	const start = toYearFraction(item.since);
	const end = toYearFraction(item.until);
	const format = (year: number | null) =>
		year === null ? "" : `'${String(Math.floor(year)).slice(2)}`;
	const startText = format(start);
	const endText = item.until ? format(end) : "now";

	return startText && endText ? `${startText} – ${endText}` : startText;
};

const normalizeCategory = (category: Belonging["category"]): TimelineLaneKey =>
	category ?? "work";

const getPercent = (year: number, startYear: number, endYear: number) =>
	((year - startYear) / (endYear - startYear)) * 100;

const splitIntoRows = (bars: TimelineBar[]): TimelineLaneBar[] => {
	const rowEnds: number[] = [];

	return [...bars]
		.sort((a, b) => a.left - b.left || a.index - b.index)
		.map((bar) => {
			const right = bar.left + bar.width;
			const row = rowEnds.findIndex(
				(end) => end <= bar.left + ROW_COLLISION_GAP,
			);
			const nextRow = row === -1 ? rowEnds.length : row;
			rowEnds[nextRow] = right;

			return { ...bar, row: nextRow };
		})
		.sort((a, b) => a.index - b.index);
};

export const getTimelinePercent = (
	year: number,
	startYear: number,
	endYear: number,
) => getPercent(year, startYear, endYear);

export const createTimelineModel = (
	items: Belonging[],
	now = new Date(),
): TimelineModel => {
	const nowFloat = now.getFullYear() + now.getMonth() / 12;
	const startYear = TIMELINE_START_YEAR;
	const endYear = Math.max(MIN_TIMELINE_END_YEAR, Math.ceil(nowFloat) + 1);

	const bars: TimelineBar[] = items.map((item, index) => {
		const start = toYearFraction(item.since) ?? startYear;
		const end = toYearFraction(item.until) ?? endYear;
		const left = getPercent(start, startYear, endYear);
		const right = getPercent(end, startYear, endYear);

		return {
			...item,
			category: normalizeCategory(item.category),
			index,
			left,
			width: Math.max(right - left, MIN_BAR_WIDTH),
			ongoing: !item.until,
			period: formatPeriod(item),
		};
	});

	const years = Array.from(
		{ length: endYear - startYear + 1 },
		(_, index) => startYear + index,
	);

	const lanes = Object.entries(timelineLaneMeta).map(([key, meta]) => {
		const laneBars = splitIntoRows(bars.filter((bar) => bar.category === key));

		return {
			key: key as TimelineLaneKey,
			...meta,
			bars: laneBars,
			rows: Math.max(1, ...laneBars.map((bar) => bar.row + 1)),
		};
	});

	return {
		lanes,
		years,
		nowX: getPercent(nowFloat, startYear, endYear),
		endYear,
		startYear,
	};
};
