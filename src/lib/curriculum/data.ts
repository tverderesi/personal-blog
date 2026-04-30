import { SITE } from '~/config';
import contactInfoData from '~/assets/curriculum/contactInfo.json';
import coursesData from '~/assets/curriculum/courses.json';
import educationData from '~/assets/curriculum/education.json';
import { type Language, languages } from './data/languages';
import techStackData from '~/assets/curriculum/techStack.json';
import workExperienceData from '~/assets/curriculum/workExperience.json';

export type Simplify<T> = {
	[K in keyof T]: T[K];
} & {};

export const curriculumLocales = ['en-us', 'pt-br'] as const;

export type CurriculumLocale = (typeof curriculumLocales)[number];

export type CurriculumLink = {
	label: string;
	url: string;
};

export type CurriculumProfile = {
	name: string;
	headline: string;
	location?: string;
	email?: string;
	links: CurriculumLink[];
	summary: string;
};

export type CurriculumExperience = {
	company: string;
	role: string;
	location?: string;
	period: string;
	summary?: string;
	bullets: string[];
	technologies: string[];
};

export type CurriculumProject = {
	name: string;
	description: string;
	company?: string;
	technologies: string[];
	url?: string;
};

export type CurriculumEducation = {
	title: string;
	place: string;
	time: string;
	description?: string;
};

export type CurriculumCourse = CurriculumEducation & {
	credentialID?: string;
};



type SourceTechStackGroup = {
	category: string;
	items: string[];
};

type SourceSelectedProject = {
	title: string;
	description: string;
	company?: string;
};

type SourceExperience = {
	title: string;
	company: string;
	period: string;
	location: string;
	area?: string;
	summary?: string;
	highlights?: string[];
	selectedProjects?: SourceSelectedProject[];
	tech: string[];
};

type SourceEducation = {
	title: string;
	place: string;
	time: string;
	description?: string;
};

type SourceCourse = SourceEducation & {
	credentialID?: string;
};

type SourceLanguage = {
	title: string;
	levelName: string;
};

export type Curriculum = {
	locale: CurriculumLocale;
	labels: {
		title: string;
		subject: string;
		contact: {
			name: string;
			title: string;
			location: string;
			email: string;
			website: string;
		};
		sections: {
			summary: string;
			experience: string;
			projects: string;
			skills: string;
			education: string;
			courses: string;
			languages: string;
			links: string;
		};
		technologies: string;
		link: string;
	};
	filename: string;
	profile: CurriculumProfile;
	experience: CurriculumExperience[];
	projects: CurriculumProject[];
	education: CurriculumEducation[];
	courses: CurriculumCourse[];
	skills: Record<string, string[]>;
	languages: Omit<Language, 'level'>[];
};

const techStack = techStackData as SourceTechStackGroup[];
const experience = workExperienceData as SourceExperience[];
const education = educationData as SourceEducation[];
const courses = coursesData as SourceCourse[];

const emailHref = contactInfoData.find((item) => item.href.startsWith('mailto:'))?.href;
const githubHref = contactInfoData.find((item) => item.href.includes('github.com'))?.href;
const linkedinHref = contactInfoData.find((item) => item.href.includes('linkedin.com'))?.href;

const profile = {
	name: 'Thomas B. Verderesi',
	title: 'Fullstack Software Engineer',
	location: 'Curitiba, Parana, Brazil',
	url: SITE.origin,
	email: emailHref?.replace('mailto:', ''),
	github: githubHref,
	linkedin: linkedinHref,
	summary:
		'Full-stack software engineer with experience designing, building, and modernizing complex web systems across backend, frontend, architecture, reporting, internal platforms, and data-heavy applications. I work with a senior engineering mindset: connecting implementation with product goals, clarifying trade-offs, improving service boundaries, reducing architectural debt, and building systems that are reliable, maintainable, and easier to evolve.',
};

const localizedSummary = {
	'en-us':
		profile.summary ||
		'Software engineer focused on web systems, technical product work, and AI tools for humans. I build web systems, refactor complex codebases, and turn product ideas into working software.',
	'pt-br':
		'Engenheiro de software focado em sistemas web, trabalho técnico de produto e ferramentas de IA para pessoas. Construo sistemas web, refatoro bases de código complexas e transformo ideias de produto em software funcional.',
} satisfies Record<CurriculumLocale, string>;

const labels = {
	'en-us': {
		title: 'Thomas Verderesi - Curriculum - EN-US',
		subject: 'Software Engineer Curriculum',
		contact: {
			name: 'Name',
			title: 'Title',
			location: 'Location',
			email: 'Email',
			website: 'Website',
		},
		sections: {
			summary: 'Professional Summary',
			experience: 'Experience',
			projects: 'Projects',
			skills: 'Skills',
			education: 'Education',
			courses: 'Courses and Certifications',
			languages: 'Languages',
			links: 'Links',
		},
		technologies: 'Technologies',
		link: 'Link',
	},
	'pt-br': {
		title: 'Thomas Verderesi - Currículo - PT-BR',
		subject: 'Currículo de Engenheiro de Software',
		contact: {
			name: 'Nome',
			title: 'Título',
			location: 'Localização',
			email: 'Email',
			website: 'Site',
		},
		sections: {
			summary: 'Resumo Profissional',
			experience: 'Experiência',
			projects: 'Projetos',
			skills: 'Competências',
			education: 'Educação',
			courses: 'Cursos e Certificações',
			languages: 'Idiomas',
			links: 'Links',
		},
		technologies: 'Tecnologias',
		link: 'Link',
	},
} satisfies Record<CurriculumLocale, Curriculum['labels']>;

const filenames = {
	'en-us': 'thomas-verderesi-curriculum-en-us.pdf',
	'pt-br': 'thomas-verderesi-curriculo-pt-br.pdf',
} satisfies Record<CurriculumLocale, string>;

const skillCategoryTranslations: Record<string, string> = {
	Languages: 'Linguagens',
	Frontend: 'Frontend',
	Backend: 'Backend',
	'Databases & Search': 'Bancos de Dados e Busca',
	Testing: 'Testes',
	'Infrastructure & Tooling': 'Infraestrutura e Ferramentas',
};

const languageTranslations: Record<string, string> = {
	Portuguese: 'Português',
	English: 'Inglês',
	French: 'Francês',
	Spanish: 'Espanhol',
};

const headlineByLocale = {
	'en-us': profile.title,
	'pt-br': 'Engenheiro de Software Full-stack',
} satisfies Record<CurriculumLocale, string>;

const normalizeUrl = (href?: string) => {
	if (!href) return undefined;
	return href.startsWith('mailto:') ? href.replace('mailto:', '') : href;
};

const profileLinks = [
	{ label: 'LinkedIn', url: profile.linkedin },
	{ label: 'GitHub', url: profile.github },
	{ label: 'Website', url: profile.url },
]
	.map(({ label, url }) => (url ? { label, url: normalizeUrl(url) ?? url } : undefined))
	.filter((link): link is CurriculumLink => Boolean(link?.url));

const buildKeywords = () =>
	Array.from(
		new Set([
			'Software Engineer',
			'Web Systems',
			'Technical Product Work',
			'AI Tools for Humans',
			'Astro',
			...techStack.flatMap((group) => group.items),
			...experience.flatMap((item) => item.tech),
		])
	);

export const curriculumKeywords = buildKeywords();

export const isCurriculumLocale = (value: string | undefined): value is CurriculumLocale => curriculumLocales.includes(value as CurriculumLocale);

export const getCurriculum = (locale: CurriculumLocale): Curriculum => ({
	locale,
	labels: labels[locale],
	filename: filenames[locale],
	profile: {
		name: profile.name,
		headline: headlineByLocale[locale],
		location: profile.location,
		email: profile.email,
		links: profileLinks,
		summary: localizedSummary[locale],
	},
	experience: experience.map((item) => ({
		company: item.company,
		role: item.title,
		location: item.location,
		period: item.period,
		summary: item.summary,
		bullets: item.highlights ?? [],
		technologies: item.tech,
	})),
	projects: experience.flatMap((item) =>
		(item.selectedProjects ?? []).map((project) => ({
			name: project.title,
			description: project.description,
			company: item.company,
			technologies: item.tech,
		}))
	),
	education,
	courses,
	skills: Object.fromEntries(
		techStack.map((group) => [locale === 'pt-br' ? skillCategoryTranslations[group.category] || group.category : group.category, group.items])
	),
	languages: languages.map(({ language, levelName }) => ({
		language: locale === 'pt-br' ? languageTranslations[language] || language : language,
		levelName: levelName.trim() as Language['levelName'],
	})),
});
