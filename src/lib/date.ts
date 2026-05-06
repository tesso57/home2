export type Duration = {
	since: Date;
	until?: Date;
};

const pad2 = (value: number) => String(value).padStart(2, "0");

export const format = (date?: Date) =>
	date
		? `${date.getFullYear()}/${pad2(date.getMonth() + 1)}/${pad2(date.getDate())}`
		: "";

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
