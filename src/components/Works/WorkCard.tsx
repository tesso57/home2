import { ArtFrame } from "@/components/UI/ArtFrame";
import { Icon } from "@/components/UI/Icon";
import { Pill } from "@/components/UI/Pill";
import { formatWorkDate, type Work } from "@/lib/work";
import styles from "./WorkCard.module.css";

type WorkCardProps = {
	work: Work;
	imageUrl?: string;
	index: number;
	total: number;
	onOpen: () => void;
};

export function WorkCard({
	work,
	imageUrl,
	index,
	total,
	onOpen,
}: WorkCardProps) {
	const isLongTitle = work.title.length > 24;

	return (
		<button
			className={styles.card}
			type="button"
			onClick={onOpen}
			aria-label={`${work.title} の詳細を開く`}
		>
			<div className={styles.media}>
				<ArtFrame src={imageUrl} alt={work.title} index={index} />
				<span className={styles.index}>
					{String(index + 1).padStart(2, "0")} /{" "}
					{String(total).padStart(2, "0")}
				</span>
				<span className={styles.openIcon}>
					<Icon name="arrow" size={14} />
				</span>
			</div>
			<div className={styles.content}>
				<h3
					className={`${styles.title} ${
						isLongTitle ? styles.titleCompact : ""
					}`}
				>
					{work.title}
				</h3>
				<p className={styles.date}>{formatWorkDate(work, true)}</p>
				<div className={styles.tags}>
					{work.tags.map((tag) => (
						<Pill key={tag} tone="paper">
							{tag}
						</Pill>
					))}
				</div>
			</div>
		</button>
	);
}
