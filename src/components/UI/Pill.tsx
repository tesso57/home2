import type { ReactNode } from "react";
import styles from "./Pill.module.css";

type PillProps = {
	children: ReactNode;
	tone?: "peach" | "ink" | "paper";
};

export function Pill({ children, tone = "peach" }: PillProps) {
	return (
		<span className={`${styles.pill} ${styles[tone] ?? ""}`}>{children}</span>
	);
}
