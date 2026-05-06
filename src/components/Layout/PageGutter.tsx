import { forwardRef, type HTMLAttributes } from "react";
import styles from "./PageGutter.module.css";

type PageGutterProps = HTMLAttributes<HTMLDivElement>;

export const PageGutter = forwardRef<HTMLDivElement, PageGutterProps>(
	({ className, ...props }, ref) => (
		<div
			className={className ? `${styles.gutter} ${className}` : styles.gutter}
			ref={ref}
			{...props}
		/>
	),
);

PageGutter.displayName = "PageGutter";
