import styles from "./SectionHeading.module.css";

type SectionHeadingProps = {
	eyebrow: string;
	title: string;
	sub?: string;
};

export function SectionHeading({ eyebrow, title, sub }: SectionHeadingProps) {
	return (
		<div className={styles.heading}>
			<div className={styles.eyebrowRow}>
				<span className={styles.eyebrow}>{eyebrow}</span>
				<h2 className={styles.title}>{title}</h2>
			</div>
			{sub ? <p className={styles.sub}>{sub}</p> : null}
		</div>
	);
}
