import { ArtFrame } from "@/components/UI/ArtFrame";
import { ExternalLink } from "@/components/UI/ExternalLink";
import { Icon } from "@/components/UI/Icon";
import { Modal } from "@/components/UI/Modal";
import { Pill } from "@/components/UI/Pill";
import { formatWorkDate, type Work } from "@/lib/work";
import styles from "./WorkModal.module.css";

type WorkModalProps = {
	work: Work;
	imageUrl?: string;
	index: number;
	onClose: () => void;
};

export function WorkModal({ work, imageUrl, index, onClose }: WorkModalProps) {
	return (
		<Modal onClose={onClose}>
			<div className={styles.media}>
				<ArtFrame src={imageUrl} alt={work.title} index={index} />
				<button
					className={styles.close}
					type="button"
					onClick={onClose}
					aria-label="閉じる"
				>
					<Icon name="close" size={16} />
				</button>
			</div>
			<div className={styles.body}>
				<div className={styles.header}>
					<h3 className={styles.title}>{work.title}</h3>
					<span className={styles.date}>{formatWorkDate(work, true)}</span>
				</div>
				<div className={styles.tags}>
					{work.tags.map((tag) => (
						<Pill key={tag}>{tag}</Pill>
					))}
				</div>
				<p className={styles.description}>{work.description}</p>
				<ExternalLink className={styles.link} href={work.link}>
					リンクへ <Icon name="arrow" size={14} />
				</ExternalLink>
			</div>
		</Modal>
	);
}
