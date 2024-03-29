export const SITE = {
	name: 'Thomas Verderesi - Fullstack Software Engineer',
	favicon: '/favicon.ico',

	origin: 'https://tverderesi.dev',
	basePathname: '/',
	trailingSlash: false,
	title: 'Thomas Verderesi - Fullstack Software Engineer',
	description: 'My personal page with my portfolio, curriculum and personal blog.',

	googleAnalyticsId: false, // or "G-XXXXXXXXXX",
	googleSiteVerificationId: 'orcPxI47GSa-cRvY11tUe6iGg2IO_RPvnA1q95iEM3M',
};

export const BLOG = {
	disabled: false,
	postsPerPage: 4,

	blog: {
		disabled: false,
		pathname: 'blog', // blog main path, you can change this to "articles" (/articles)
	},

	post: {
		disabled: false,
		pathname: '', // empty for /some-post, value for /pathname/some-post
	},

	category: {
		disabled: false,
		pathname: 'category', // set empty to change from /category/some-category to /some-category
	},

	tag: {
		disabled: false,
		pathname: 'tag', // set empty to change from /tag/some-tag to /some-tag
	},
};

export const PORTFOLIO = {
	disabled: false,
	postsPerPage: 4,

	blog: {
		disabled: false,
		pathname: 'portfolio', // blog main path, you can change this to "articles" (/articles)
	},

	post: {
		disabled: false,
		pathname: 'projects', // empty for /some-post, value for /pathname/some-post
	},

	category: {
		disabled: false,
		pathname: 'category', // set empty to change from /category/some-category to /some-category
	},

	tag: {
		disabled: false,
		pathname: 'tag', // set empty to change from /tag/some-tag to /some-tag
	},
};
