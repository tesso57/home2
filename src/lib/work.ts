import type { Duration } from "./date";

export type Work = {
  title: string;
  description: string;
  tags: string[];
  link: string;
  imageUrl: string;
  duration: Duration;
};
