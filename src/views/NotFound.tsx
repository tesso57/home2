import { Link } from "react-router";
import styles from "./NotFound.module.css";

export function NotFound() {
	return (
		<main className={styles.page}>
			<div className={styles.box}>
				<h1 className={styles.title}>404</h1>
				<p className={styles.text}>ページが見つかりませんでした。</p>
				<Link className={styles.link} to="/">
					Homeへ戻る
				</Link>
			</div>
		</main>
	);
}
