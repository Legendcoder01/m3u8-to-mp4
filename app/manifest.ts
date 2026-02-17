import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'M3U8 to MP4 Converter',
    short_name: 'M3U8 to MP4',
    description: 'Convert M3U8/HLS streams to MP4 quickly and easily.',
    start_url: '/en',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#0f172a',
    icons: [
      {
        src: '/icon.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
      },
      {
        src: '/apple-icon.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
      },
    ],
  };
}
