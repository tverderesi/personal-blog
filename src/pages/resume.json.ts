import type { APIRoute } from 'astro';
import { getCvPayload, jsonHeaders } from '~/lib/cvPayload';

export const prerender = true;

export const GET: APIRoute = () =>
	new Response(JSON.stringify(getCvPayload(), null, 2), {
		headers: jsonHeaders,
	});
