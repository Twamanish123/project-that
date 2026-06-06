import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return rss({
    title: 'Project-that',
    description: 'Slow writing on the ground of experience of Advaita Vedanta.',
    site: context.site,
    items: posts
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map((post) => ({
        title: post.data.title,
        description: post.data.subtitle || '',
        pubDate: post.data.date,
        link: `/blog/${post.id}/`,
      })),
  });
}
