import { Metadata } from 'next';
import { buildCanonical, SITE_NAME } from '@/utils/seo';

const title = `Roll a Dice | ${SITE_NAME}`;
const description = 'Roll an 8-bit style virtual 6-sided dice instantly.';
const url = buildCanonical('/roll-a-dice');

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: url,
  },
  openGraph: {
    title,
    description,
    url,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
