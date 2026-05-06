import ProfileData from "@/assets/data/profile.json";

export type BelongingCategory = "edu" | "work" | "community";

export type Belonging = {
	name: string;
	link: string;
	since: string;
	until?: string;
	category?: BelongingCategory;
	note?: string;
};

export type Skill = {
	name: string;
	level: number;
};

export type ProfileLink = {
	name: string;
	type: "icon" | "img";
	icon: string;
	url: string;
	color: string;
	folder?: string;
};

export type Profile = {
	name: string;
	id: string;
	role: string;
	introLead: string;
	introSub: string;
	introTag: string;
	nowLines: string[];
	belongings: Belonging[];
	about: string;
	skills: Skill[];
	likes: string[];
	links: ProfileLink[];
};

export const profile = ProfileData as Profile;
