import { useMemo, useState } from "react";
import noteIcon from "@/assets/note.svg";
import sizuIcon from "@/assets/sizu.svg";
import speakerdeckIcon from "@/assets/speakerdeck.svg";
import zennIcon from "@/assets/zenn.svg";
import { SectionHeading } from "@/components/Layout/SectionHeading";
import { ExternalLink } from "@/components/UI/ExternalLink";
import { Icon, iconNameForLink } from "@/components/UI/Icon";
import type { ProfileLink } from "@/lib/profile";
import styles from "./LinksSection.module.css";

type LinksSectionProps = {
	links: ProfileLink[];
};

const folderIcon = (folder: string) => {
	if (folder === "Code") return "{ }";
	if (folder === "Writing") return "✎";
	if (folder === "Social") return "@";
	return "★";
};

const imageIcons: Record<string, string> = {
	"note.svg": noteIcon,
	"sizu.svg": sizuIcon,
	"speakerdeck.svg": speakerdeckIcon,
	"zenn.svg": zennIcon,
};

const linkIcon = (link: ProfileLink) => {
	const imageIcon = imageIcons[link.icon];
	if (link.type === "img" && imageIcon) {
		return <img alt="" src={imageIcon} />;
	}

	return <Icon name={iconNameForLink(link.icon)} size={14} />;
};

export function LinksSection({ links }: LinksSectionProps) {
	const grouped = useMemo(() => {
		const map = new Map<string, ProfileLink[]>();
		for (const link of links) {
			const folder = link.folder ?? "Other";
			map.set(folder, [...(map.get(folder) ?? []), link]);
		}
		return map;
	}, [links]);

	const folderNames = [...grouped.keys()];
	const [activeFolder, setActiveFolder] = useState(folderNames[0] ?? "Other");
	const activeLinks = grouped.get(activeFolder) ?? [];

	return (
		<section className={styles.section} id="links">
			<SectionHeading eyebrow="05" title="Links" sub="リンク集" />
			<div className={styles.bar}>
				<div className={styles.chrome}>
					<div className={styles.lights} aria-hidden="true">
						<span className={styles.lightRed} />
						<span className={styles.lightYellow} />
						<span className={styles.lightGreen} />
					</div>
					<div className={styles.address}>⌂ tesso.dev / links</div>
					<span className={styles.count}>{links.length} ITEMS</span>
				</div>
				<div className={styles.folders}>
					{folderNames.map((folder) => {
						const isActive = activeFolder === folder;
						return (
							<button
								className={`${styles.folder} ${isActive ? styles.folderActive : ""}`}
								key={folder}
								type="button"
								onClick={() => setActiveFolder(folder)}
							>
								<span className={styles.folderIcon}>{folderIcon(folder)}</span>
								<span>{folder}</span>
								<span className={styles.folderCount}>
									{grouped.get(folder)?.length ?? 0}
								</span>
							</button>
						);
					})}
				</div>
				<div className={styles.items}>
					{activeLinks.map((link) => (
						<ExternalLink
							className={styles.item}
							href={link.url}
							key={link.url}
						>
							<span className={styles.itemIcon}>{linkIcon(link)}</span>
							<span>
								<span className={styles.itemName}>{link.name}</span>
								<span className={styles.itemUrl}>{link.url}</span>
							</span>
							<span className={styles.arrow}>
								<Icon name="arrow" size={14} />
							</span>
						</ExternalLink>
					))}
				</div>
			</div>
		</section>
	);
}
