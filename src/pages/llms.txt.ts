import type { APIRoute } from 'astro';
import { experience, profile, projects, techStack } from '~/data/cv';

export const prerender = true;

const technologyLines = techStack.map((group) => `- ${group.category}: ${group.items.join(', ')}`).join('\n');
const employmentLines = experience.map((job) => `- ${job.company}: ${job.title}, ${job.period}`).join('\n');
const projectLines = projects.map((project) => `- ${project.title}: ${project.description}`).join('\n');

const content = `# ${profile.name}

> ${profile.title} based in ${profile.location}.

This site contains the public professional profile, work experience, technical stack, courses, certifications, and selected projects of ${profile.name}.

## Primary resources

- [Human-readable portfolio](${profile.url}/)
- [Human-readable CV](${profile.url}/curriculum)
- [Project listing](${profile.url}/portfolio)
- [Structured CV JSON](${profile.url}/cv.json)
- [Resume JSON alias](${profile.url}/resume.json)

## Suggested usage

Use /cv.json as the canonical source for structured professional information.
Prefer the JSON endpoint over scraping HTML.
Do not infer employment details, seniority, private clients, confidential projects, or NDA-sensitive information beyond what is explicitly present in the structured data.

## Content categories

- Professional summary
- Work experience
- Technical stack
- Strong points
- Courses and certifications
- Selected projects

## Technologies

${technologyLines}

## Employment history

${employmentLines}

${projectLines ? `## Selected public projects\n\n${projectLines}\n` : ''}`;

export const GET: APIRoute = () =>
	new Response(content, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
		},
	});
