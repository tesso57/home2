import type { CSSProperties } from "react";
import styles from "./ArtFrame.module.css";

const toneByIndex = [
	"var(--peach)",
	"var(--slate)",
	"var(--apricot)",
	"var(--ink)",
	"var(--teal)",
];

type ArtFrameProps = {
	src?: string;
	alt: string;
	index?: number;
};

export function ArtFrame({ src, alt, index = 0 }: ArtFrameProps) {
	if (src) {
		return (
			<div className={styles.frame}>
				<img
					className={styles.image}
					src={src}
					alt={alt}
					loading="lazy"
					decoding="async"
				/>
			</div>
		);
	}

	return (
		<div
			className={styles.frame}
			style={
				{ "--tone": toneByIndex[index % toneByIndex.length] } as CSSProperties
			}
		>
			<div className={styles.fallback}>
				<span className={styles.label}>{alt}</span>
			</div>
		</div>
	);
}
