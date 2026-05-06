import type { AnchorHTMLAttributes, ReactNode } from "react";

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
	children: ReactNode;
	href: string;
};

export function ExternalLink({ children, href, ...props }: ExternalLinkProps) {
	const isExternal = /^https?:\/\//.test(href);

	return (
		<a
			href={href}
			rel={isExternal ? "noreferrer" : props.rel}
			target={isExternal ? "_blank" : props.target}
			{...props}
		>
			{children}
		</a>
	);
}
