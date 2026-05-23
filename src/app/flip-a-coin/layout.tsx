import { Metadata } from 'next';
import { SITE_NAME, buildCanonical } from '@/utils/seo';

const title = `Coin Flipper | ${SITE_NAME}`;
const description = 'Flip a virtual coin for heads or tails. Features 8-bit animations and statistics tracking.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: buildCanonical('/flip-a-coin'),
  },
  openGraph: {
    title,
    description,
    url: buildCanonical('/flip-a-coin'),
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
