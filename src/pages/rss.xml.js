import { createRss } from '@astrojs/rss';

return createRss({
  title: 'tverderesi.dev - RSS Feed',
  description: SITE.description,
  site: import.meta.env.SITE,
  items: posts.map((post) => ({
    link: getPermalink(post.slug, 'post'),
    title: post.title,
    description: post.description,
    publishDate: post.publishDate,
  })),
});
