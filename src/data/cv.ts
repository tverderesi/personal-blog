import { SITE } from '~/config';
import aboutMe from '~/assets/curriculum/aboutMe.json';
import contactInfoData from '~/assets/curriculum/contactInfo.json';
import coursesData from '~/assets/curriculum/courses.json';
import downloadLinksData from '~/assets/curriculum/downloadLinks.json';
import educationData from '~/assets/curriculum/education.json';
import languagesData from '~/assets/curriculum/languages.json';
import strengthsData from '~/assets/curriculum/strengths.json';
import techStackData from '~/assets/curriculum/techStack.json';
import workExperienceData from '~/assets/curriculum/workExperience.json';

export type Profile = {
	name: string;
	title: string;
	location: string;
	url: string;
	email?: string;
	github?: string;
	linkedin?: string;
	summary: string;
};

export type TechStackGroup = {
	category: string;
	items: string[];
};

export type SelectedProject = {
	title: string;
	description: string;
	company?: string;
};

export type ExperienceItem = {
	title: string;
	company: string;
	period: string;
	location: string;
	area?: string;
	summary?: string;
	highlights?: string[];
	notes: string[];
	selectedProjects?: SelectedProject[];
	tech: string[];
};

export type Course = {
	title: string;
	place: string;
	time: string;
	credentialID?: string;
	description?: string;
};

export type LanguageData = {
	language: string;
	level: 1 | 2 | 3 | 4 | 5 | 6;
	levelName: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
};

export const updatedAt = '2026-04-29';

export const summary = aboutMe;
export const strongPoints = strengthsData;
export const techStack = techStackData as TechStackGroup[];
export const courses = coursesData as Course[];
export const education = educationData;
export const languages = languagesData;
export const downloadLinks = downloadLinksData;
export const contactInfo = contactInfoData;

const emailHref = contactInfoData.find((item) => item.href.startsWith('mailto:'))?.href;
const githubHref = contactInfoData.find((item) => item.href.includes('github.com'))?.href;
const linkedinHref = contactInfoData.find((item) => item.href.includes('linkedin.com'))?.href;

export const profile: Profile = {
	name: 'Thomas B. Verderesi',
	title: 'Fullstack Software Engineer',
	location: 'Curitiba, Parana, Brazil',
	url: SITE.origin,
	email: emailHref?.replace('mailto:', ''),
	github: githubHref,
	linkedin: linkedinHref,
	summary: summary[0],
};

export const experience = (workExperienceData as Array<Omit<ExperienceItem, 'notes'> & { highlights?: string[] }>).map((item) => ({
	...item,
	notes: item.highlights ?? [],
})) satisfies ExperienceItem[];

export const projects = experience.flatMap((item) =>
	(item.selectedProjects ?? []).map((project) => ({
		...project,
		company: item.company,
	}))
);

export const address = {
	locality: 'Curitiba',
	region: 'PR',
	country: 'BR',
};
