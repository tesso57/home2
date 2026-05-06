import { SectionHeading } from "@/components/Layout/SectionHeading";
import type { Blog } from "@/lib/blog";
import styles from "./BlogList.module.css";
import { BlogRow } from "./BlogRow";

type BlogListProps = {
	blogs: Blog[];
};

export function BlogList({ blogs }: BlogListProps) {
	return (
		<section className={styles.section} id="blog">
			<SectionHeading eyebrow="04" title="Blog" sub="覚え書き" />
			<div className={styles.list}>
				{blogs.map((blog) => (
					<BlogRow blog={blog} key={blog.slug} />
				))}
			</div>
		</section>
	);
}
