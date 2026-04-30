import type { APIRoute, GetStaticPaths } from 'astro';
import { curriculumLocales, getCurriculum, isCurriculumLocale } from '~/lib/curriculum/data';
import { generateCurriculumPdf } from '~/lib/curriculum/pdf';

export const prerender = true;

export const getStaticPaths: GetStaticPaths = () => curriculumLocales.map((locale) => ({ params: { locale } }));

export const GET: APIRoute = async ({ params }) => {
	const locale = params.locale?.replace(/\.pdf$/, '');

	if (!isCurriculumLocale(locale)) {
		return new Response('Unsupported curriculum locale.', { status: 404 });
	}

	try {
		const curriculum = getCurriculum(locale);
		const pdf = await generateCurriculumPdf(curriculum);

		return new Response(new Uint8Array(pdf), {
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': `attachment; filename="${curriculum.filename}"`,
				'Cache-Control': 'public, max-age=3600',
			},
		});
	} catch (error) {
		console.error(`Failed to generate ${locale} curriculum PDF`, error);
		return new Response('Failed to generate curriculum PDF.', { status: 500 });
	}
};
