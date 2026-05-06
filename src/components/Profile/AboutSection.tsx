import { PageGutter } from "@/components/Layout/PageGutter";
import { SectionHeading } from "@/components/Layout/SectionHeading";
import { Pill } from "@/components/UI/Pill";
import type { Profile } from "@/lib/profile";
import styles from "./AboutSection.module.css";

type AboutSectionProps = {
	profile: Profile;
};

export function AboutSection({ profile }: AboutSectionProps) {
	const sortedSkills = [...profile.skills].sort((a, b) => b.level - a.level);

	return (
		<section className={styles.section} id="about">
			<PageGutter>
				<div className={styles.grid}>
					<div>
						<SectionHeading eyebrow="01" title="About" sub="自己紹介" />
					</div>
					<div className={styles.content}>
						<p className={styles.body}>{profile.about}</p>
						<div className={styles.blocks}>
							<div>
								<div className={styles.label}>SKILLS / 得意なもの</div>
								<div className={styles.skills}>
									{sortedSkills.map((skill) => (
										<div className={styles.skill} key={skill.name}>
											<span className={styles.skillName}>{skill.name}</span>
											<span className={styles.meter}>
												<span
													className={styles.meterFill}
													style={{ width: `${(skill.level / 5) * 100}%` }}
												/>
											</span>
										</div>
									))}
								</div>
							</div>
							<div>
								<div className={styles.label}>LIKES / 好きなもの</div>
								<div className={styles.likes}>
									{profile.likes.map((like) => (
										<Pill key={like}>{like}</Pill>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</PageGutter>
		</section>
	);
}
