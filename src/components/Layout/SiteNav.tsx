import { Link } from "react-router";
import styles from "./SiteNav.module.css";

const links = [
	{ href: "/#about", label: "About" },
	{ href: "/#belonging", label: "Belonging" },
	{ href: "/#works", label: "Works" },
	{ href: "/#blog", label: "Blog" },
	{ href: "/#links", label: "Links" },
];

export function SiteNav() {
	return (
		<header className={styles.header}>
			<Link className={styles.brand} to="/">
				<span className={styles.mark}>t</span>
				<span className={styles.name}>
					<span className={styles.nameBase}>tesso</span>
					<span className={styles.nameSuffix}>.dev</span>
				</span>
			</Link>
			<nav className={styles.nav} aria-label="Primary">
				{links.map((link) => (
					<a className={styles.link} href={link.href} key={link.href}>
						{link.label}
					</a>
				))}
			</nav>
		</header>
	);
}
