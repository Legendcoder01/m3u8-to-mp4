import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://m3u8-to-mp4.farhanabhatt.com/sitemap.xml',
    host: 'https://m3u8-to-mp4.farhanabhatt.com',
  };
}
