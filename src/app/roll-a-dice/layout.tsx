import { Metadata } from 'next';
import { DEFAULT_TITLE, SITE_NAME } from '@/utils/seo';

export const metadata: Metadata = {
  title: `Roll a Dice | ${SITE_NAME}`,
  description: 'A simple, fun 8-bit style dice roller.',
  openGraph: {
    title: `Roll a Dice | ${SITE_NAME}`,
    description: 'A simple, fun 8-bit style dice roller.',
    url: '/roll-a-dice',
    siteName: SITE_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Roll a Dice | ${SITE_NAME}`,
    description: 'A simple, fun 8-bit style dice roller.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
