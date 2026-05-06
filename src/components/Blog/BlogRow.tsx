import { Link } from "react-router";
import type { Blog } from "@/lib/blog";
import { format } from "@/lib/date";
import styles from "./BlogRow.module.css";

type BlogRowProps = {
	blog: Blog;
};

export function BlogRow({ blog }: BlogRowProps) {
	return (
		<Link className={styles.row} to={`/blog/${blog.slug}`}>
			<span className={styles.date}>{format(blog.date)}</span>
			<h3 className={styles.title}>{blog.title}</h3>
			<span className={styles.tag}>{blog.tags.join(" / ") || "note"}</span>
		</Link>
	);
}
