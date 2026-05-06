import { useMemo, useState } from "react";
import { SectionHeading } from "@/components/Layout/SectionHeading";
import type { Work } from "@/lib/work";
import { WorkCard } from "./WorkCard";
import styles from "./WorkList.module.css";
import { WorkModal } from "./WorkModal";

type WorkListProps = {
	works: Work[];
};

const assetUrls = import.meta.glob<string>("../../assets/*.{svg,png,gif}", {
	eager: true,
	import: "default",
});

const getImageUrl = (imageName: string) =>
	assetUrls[`../../assets/${imageName}`];

const cellClassForIndex = (index: number) => {
	if (index === 0) return `${styles.cell} ${styles.cellLarge}`;
	if (index === 2 || index === 3) return `${styles.cell} ${styles.cellMedium}`;
	return styles.cell;
};

export function WorkList({ works }: WorkListProps) {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	const selectedWork = selectedIndex === null ? null : works[selectedIndex];
	const selectedImage =
		selectedWork && selectedIndex !== null
			? getImageUrl(selectedWork.imageUrl)
			: undefined;

	const entries = useMemo(
		() =>
			works.map((work, index) => ({
				work,
				imageUrl: getImageUrl(work.imageUrl),
				index,
			})),
		[works],
	);

	return (
		<section className={styles.section} id="works">
			<div className={styles.header}>
				<SectionHeading eyebrow="03" title="Works" sub="制作物" />
			</div>
			<div className={styles.grid}>
				{entries.map(({ work, imageUrl, index }) => (
					<div className={cellClassForIndex(index)} key={work.title}>
						<WorkCard
							work={work}
							imageUrl={imageUrl}
							index={index}
							total={works.length}
							onOpen={() => setSelectedIndex(index)}
						/>
					</div>
				))}
			</div>
			{selectedWork && selectedIndex !== null ? (
				<WorkModal
					work={selectedWork}
					imageUrl={selectedImage}
					index={selectedIndex}
					onClose={() => setSelectedIndex(null)}
				/>
			) : null}
		</section>
	);
}
