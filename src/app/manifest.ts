import { MetadataRoute } from 'next';
import { SITE_DESCRIPTION, SITE_NAME } from '@/utils/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Task Tool",
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/let-me-help-you-logo.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}
