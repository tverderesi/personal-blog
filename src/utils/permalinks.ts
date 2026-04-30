import slug from 'slug';

import { SITE, BLOG } from '~/config';

const trim = (str: string, ch: string) => {
	let start = 0;
	let end = str.length;

	while (start < end && str[start] === ch) ++start;
	while (end > start && str[end - 1] === ch) --end;

	return start > 0 || end < str.length ? str.substring(start, end) : str;
};

const trimSlash = (s: string) => trim(trim(s, '/'), '/');

const createPath = (...params: Array<string | undefined | null>) => {
	const paths = params.filter(Boolean).join('/');

	return '/' + paths + (SITE.trailingSlash && paths ? '/' : '');
};

const basePathname = trimSlash(SITE.basePathname ?? '');

export const cleanSlug = (text = '') => slug(trimSlash(text));

export const BLOG_BASE = cleanSlug(BLOG?.blog?.pathname);
export const POST_BASE = cleanSlug(BLOG?.post?.pathname);
export const CATEGORY_BASE = cleanSlug(BLOG?.category?.pathname);
export const TAG_BASE = cleanSlug(BLOG?.tag?.pathname);

/**
 * Absolute canonical URL for SEO/meta tags.
 * Do not use this for internal navigation links.
 */
export const getCanonical = (path = '') => new URL(path, SITE.origin);

/**
 * Page/route permalink builder.
 * Use this for actual pages, like blog routes.
 */
export const getPermalink = (path = '', type = 'page') => {
	const _path = cleanSlug(path);

	switch (type) {
		case 'category':
			return createPath(basePathname, CATEGORY_BASE, _path);

		case 'tag':
			return createPath(basePathname, TAG_BASE, _path);

		case 'post':
			return createPath(basePathname, POST_BASE, _path);

		case 'raw':
			return createPath(basePathname, trimSlash(path));

		case 'page':
		default:
			return createPath(basePathname, _path);
	}
};

/**
 * Homepage permalink.
 */
export const getHomePermalink = () => {
	const permalink = getPermalink();

	return permalink !== '/' ? `${permalink}/` : permalink;
};

/**
 * Same-page section link.
 * Example: #portfolio
 */
export const getSectionPermalink = (sectionId = '') => {
	const _sectionId = cleanSlug(sectionId);

	return _sectionId ? `#${_sectionId}` : '#';
};

/**
 * Homepage section link.
 * Example: /#portfolio
 *
 * Use this in global navigation, especially when the same nav appears on blog pages.
 */
export const getHomeSectionPermalink = (sectionId = '') => {
	const _sectionId = cleanSlug(sectionId);

	return _sectionId
		? `${getHomePermalink()}#${_sectionId}`
		: getHomePermalink();
};

/**
 * Blog remains a real route.
 */
export const getBlogPermalink = () => getPermalink(BLOG_BASE);

/**
 * Portfolio is now a homepage section, not its own page.
 */
export const getPortfolioPermalink = () => getHomeSectionPermalink('portfolio');

/**
 * Blog post/taxonomy helpers.
 */
export const getPostPermalink = (postSlug = '') => getPermalink(postSlug, 'post');

export const getCategoryPermalink = (categorySlug = '') =>
	getPermalink(categorySlug, 'category');

export const getTagPermalink = (tagSlug = '') => getPermalink(tagSlug, 'tag');