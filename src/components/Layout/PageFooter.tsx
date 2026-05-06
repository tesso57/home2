import { PageGutter } from "@/components/Layout/PageGutter";
import { LiveClock } from "@/components/UI/LiveClock";
import styles from "./PageFooter.module.css";

export function PageFooter() {
	return (
		<footer className={styles.footer}>
			<PageGutter className={styles.inner}>
				<span>© 2026 tesso.dev</span>
				<span>
					東京 / Tokyo · <LiveClock />
				</span>
			</PageGutter>
		</footer>
	);
}
