import { courses, experience, profile, projects, strongPoints, summary, techStack, updatedAt } from '~/data/cv';

export const getCvPayload = () => ({
	schemaVersion: '1.0',
	type: 'ProfessionalProfile',
	profile,
	summary,
	strongPoints,
	techStack,
	experience,
	courses,
	projects,
	updatedAt,
});

export const jsonHeaders = {
	'Content-Type': 'application/json; charset=utf-8',
};
