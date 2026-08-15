import type { Metadata } from 'next';
import { SITE_NAME, buildCanonical } from '@/utils/seo';

const title = `Number to Words Converter | ${SITE_NAME}`;
const description = 'Convert numerical values into their English word representation instantly.';
const path = '/convert-number-to-words';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: buildCanonical(path),
  },
  openGraph: {
    title,
    description,
    url: buildCanonical(path),
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}