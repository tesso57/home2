import type { Duration } from "./date";
import Works from "@/assets/data/works.json";

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
        until: new Date(duration?.until ?? Date.now()),
      },
    };
  });

export const works: Work[] = formatWorks();
