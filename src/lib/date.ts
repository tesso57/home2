export type Duration = {
  since: Date;
  until?: Date;
};

export function formatDuration(duration: Duration): string {
  const { since, until } = duration;
  const format = (date?: Date) =>
    date ? date.toISOString().slice(0, 10).replace(/-/g, "/") : "";
  return `${format(since)} ~ ${format(until)}`;
}
