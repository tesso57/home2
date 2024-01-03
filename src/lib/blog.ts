import Blogs from "@/assets/data/blogs.json";

export type Blog = {
  title: string;
  tags: string[];
  date: Date;
};


const formatBlogs = (): Blog[] =>
  Blogs.map((blog) => {
    const { title, tags, date } = blog;
    return {
      title,
      tags,
      date: new Date(date),
    };
  });

export const blogs: Blog[] = formatBlogs();