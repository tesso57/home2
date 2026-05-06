import { Link, useParams } from "react-router";
import { blogs, postBodiesBySlug } from "@/lib/blog";
import { format } from "@/lib/date";
import styles from "./BlogPost.module.css";

export function BlogPost() {
	const { slug } = useParams();
	const blog = blogs.find((entry) => entry.slug === slug);
	const Body = slug ? postBodiesBySlug[slug] : undefined;

	return (
		<main className={styles.page}>
			<article className={styles.article}>
				<Link className={styles.back} to="/#blog">
					記事一覧へ戻る
				</Link>
				{blog && Body ? (
					<>
						<header className={styles.header}>
							<h1 className={styles.title}>{blog.title}</h1>
							<div className={styles.meta}>
								<span>{format(blog.date)}</span>
								<span>{blog.tags.join(" / ")}</span>
							</div>
						</header>
						<div className={styles.body}>
							<Body />
						</div>
					</>
				) : (
					<p className={styles.error}>記事の読み込みに失敗しました。</p>
				)}
			</article>
		</main>
	);
}
