export type Duration = {
	since: Date;
	until?: Date;
};
export const format = (date?: Date) =>
	date ? date.toISOString().slice(0, 10).replace(/-/g, "/") : "";

export function formatDuration(duration: Duration): string {
	const { since, until } = duration;
	return `${format(since)} ~ ${format(until)}`;
}
