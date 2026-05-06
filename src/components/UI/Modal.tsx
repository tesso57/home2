import type { ReactNode } from "react";
import { useEffect } from "react";
import styles from "./Modal.module.css";

type ModalProps = {
	children: ReactNode;
	onClose: () => void;
};

export function Modal({ children, onClose }: ModalProps) {
	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") onClose();
		};
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", onKeyDown);
		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener("keydown", onKeyDown);
		};
	}, [onClose]);

	return (
		<div className={styles.backdrop}>
			<button
				aria-label="閉じる"
				className={styles.backdropButton}
				type="button"
				onClick={onClose}
			/>
			<div className={styles.panel} role="dialog" aria-modal="true">
				{children}
			</div>
		</div>
	);
}
