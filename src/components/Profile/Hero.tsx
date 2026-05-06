import { LiveClock } from "@/components/UI/LiveClock";
import type { Profile } from "@/lib/profile";
import styles from "./Hero.module.css";

type HeroProps = {
	profile: Profile;
};

export function Hero({ profile }: HeroProps) {
	return (
		<section className={styles.hero}>
			<div className={styles.role}>⌁ {profile.role}</div>
			<h1 className={styles.title}>
				<span>{profile.name}</span>
				<span className={styles.titleAccent}>.dev</span>
			</h1>

			<div className={styles.grid}>
				<aside className={styles.now} aria-label="現在地">
					<div className={styles.nowHeader}>
						<span className={styles.nowEyebrow}>📍 現在地 / NOW</span>
						<span className={styles.dot} />
					</div>
					<ul className={styles.nowList}>
						{profile.nowLines.map((line) => (
							<li key={line}>{line}</li>
						))}
					</ul>
					<div className={styles.clockRow}>
						<span className={styles.clockLabel}>TOKYO</span>
						<span className={styles.clock}>
							<LiveClock />
						</span>
					</div>
				</aside>
			</div>
		</section>
	);
}
