type IconProps = {
	name: "arrow" | "arrowRight" | "close" | "github" | "mail" | "note" | "x";
	size?: number;
};

const iconPaths = {
	arrow: (
		<>
			<path d="M3 13 13 3" />
			<path d="M5 3h8v8" />
		</>
	),
	arrowRight: (
		<>
			<path d="M5 12h14" />
			<path d="m13 5 7 7-7 7" />
		</>
	),
	close: (
		<>
			<path d="M6 6l12 12" />
			<path d="M18 6 6 18" />
		</>
	),
	github: (
		<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
	),
	mail: (
		<>
			<rect x="3" y="5" width="18" height="14" rx="2" />
			<path d="m3 7 9 6 9-6" />
		</>
	),
	note: (
		<>
			<path d="M4 4h12l4 4v12H4z" />
			<path d="M16 4v4h4" />
			<path d="M8 12h8M8 16h6" />
		</>
	),
	x: (
		<path
			d="M18.244 2H21l-6.49 7.41L22 22h-6.79l-4.74-6.2L4.96 22H2.2l6.94-7.93L2 2h6.86l4.27 5.66L18.244 2Zm-2.39 18h1.88L8.27 4H6.27l9.585 16Z"
			fill="currentColor"
			stroke="none"
		/>
	),
};

export function Icon({ name, size = 18 }: IconProps) {
	return (
		<svg
			aria-hidden="true"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.7"
		>
			{iconPaths[name]}
		</svg>
	);
}

export function iconNameForLink(icon: string): IconProps["name"] {
	if (icon.includes("github")) return "github";
	if (icon.includes("twitter") || icon.includes("-x")) return "x";
	if (icon.includes("email")) return "mail";
	return "note";
}
