import { type ComponentType, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { blogs, loadPostBodyBySlug } from "@/lib/blog";
import { format } from "@/lib/date";
import styles from "./BlogPost.module.css";

export function BlogPost() {
	const { slug } = useParams();
	const blog = blogs.find((entry) => entry.slug === slug);
	const [Body, setBody] = useState<ComponentType | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		let isActive = true;
		setBody(null);
		setIsLoaded(false);

		if (!slug) {
			setIsLoaded(true);
			return () => {
				isActive = false;
			};
		}

		loadPostBodyBySlug(slug)
			.then((body) => {
				if (!isActive) {
					return;
				}
				setBody(() => body);
			})
			.finally(() => {
				if (isActive) {
					setIsLoaded(true);
				}
			});

		return () => {
			isActive = false;
		};
	}, [slug]);

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
				) : isLoaded ? (
					<p className={styles.error}>記事の読み込みに失敗しました。</p>
				) : null}
			</article>
		</main>
	);
}
