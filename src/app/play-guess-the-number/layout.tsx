import type { Metadata } from 'next';
import { getMetadataBase, buildCanonical, SITE_NAME } from '@/utils/seo';

const title = 'Guess the Number';
const description = 'Play a classic game of Guess the Number against the computer.';

export const metadata: Metadata = {
  title: `${title} | ${SITE_NAME}`,
  description,
  metadataBase: getMetadataBase(),
  alternates: {
    canonical: buildCanonical('/play-guess-the-number'),
  },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: buildCanonical('/play-guess-the-number'),
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
