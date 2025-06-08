export type Duration = {
	since: Date;
	until?: Date;
};
export const format = (date?: Date) =>
	date ? date.toISOString().slice(0, 10).replace(/-/g, "/") : "";

export function formatDuration(
	duration: Duration,
	showTrailingTilde = false,
): string {
	const { since, until } = duration;
	const sinceText = format(since);
	const untilText = format(until);
	if (until) {
		return `${sinceText} ~ ${untilText}`;
	}
	return showTrailingTilde ? `${sinceText} ~` : sinceText;
}
