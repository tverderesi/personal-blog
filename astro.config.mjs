import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import icon from 'astro-icon';
import compress from 'astro-compress';
import { remarkReadingTime } from './src/utils/frontmatter.js';
import { SITE } from './src/config.mjs';
import AstroPWA from '@vite-pwa/astro';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
	// Astro uses this full URL to generate your sitemap and canonical URLs in your final build
	site: SITE.origin,
	base: SITE.basePathname,
	trailingSlash: SITE.trailingSlash ? 'always' : 'never',
	output: 'static',
	integrations: [
		tailwind({
			applyBaseStyles: false,
		}),
		sitemap(),
		mdx() /* Disable this integration if you don't use Google Analytics (or other external script). */,
		partytown({
			config: {
				forward: ['dataLayer.push'],
			},
		}),
		icon({
			include: {
				'ant-design': ['*'],
				brandico: ['*'],
				carbon: ['*'],
				fluent: ['*'],
				ic: ['*'],
				la: ['*'],
				mdi: ['*'],
				ph: ['*'],
				tabler: ['*'],
			},
		}),
		compress({
			CSS: true,
			HTML: true,
			Image: false,
			JavaScript: true,
			SVG: false,
		}),
		AstroPWA({
			registerType: 'autoUpdate',
			mode: 'development',
		}),
	],
	markdown: {
		remarkPlugins: [remarkReadingTime],
	},
	vite: {
		resolve: {
			alias: {
				'~': path.resolve(__dirname, './src'),
			},
		},
	},
});
