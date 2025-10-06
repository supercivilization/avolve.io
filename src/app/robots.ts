import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
        crawlDelay: 2,
      },
      {
        // AI crawlers - allow more frequent access
        userAgent: ['GPTBot', 'ChatGPT-User', 'Claude-Web', 'anthropic-ai', 'PerplexityBot', 'Amazonbot'],
        allow: '/',
        disallow: ['/api/', '/admin/'],
        crawlDelay: 1,
      },
    ],
    sitemap: 'https://avolve.io/sitemap.xml',
  };
}
