import { BlogList } from "@/components/Blog/BlogList";
import { PageFooter } from "@/components/Layout/PageFooter";
import { SiteNav } from "@/components/Layout/SiteNav";
import { AboutSection } from "@/components/Profile/AboutSection";
import { BelongingTimeline } from "@/components/Profile/BelongingTimeline";
import { Hero } from "@/components/Profile/Hero";
import { LinksSection } from "@/components/Profile/LinksSection";
import { WorkList } from "@/components/Works/WorkList";
import { blogs } from "@/lib/blog";
import { profile } from "@/lib/profile";
import { works } from "@/lib/work";
import styles from "./Home.module.css";

export function Home() {
	return (
		<div className={styles.page}>
			<SiteNav />
			<main>
				<Hero profile={profile} />
				<AboutSection profile={profile} />
				<BelongingTimeline items={profile.belongings} />
				<WorkList works={works} />
				<BlogList blogs={blogs} />
				<LinksSection links={profile.links} />
			</main>
			<PageFooter />
		</div>
	);
}
