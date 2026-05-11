import { Metadata } from 'next';
import { SITE_NAME, buildCanonical } from '@/utils/seo';

const title = `Guess the Number | ${SITE_NAME}`;
const description = 'Play a classic game of Guess the Number. Features 8-bit theme and statistics tracking.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: buildCanonical('/guess-the-number'),
  },
  openGraph: {
    title,
    description,
    url: buildCanonical('/guess-the-number'),
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}