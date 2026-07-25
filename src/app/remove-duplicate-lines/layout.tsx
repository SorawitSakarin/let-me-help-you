import type { Metadata } from 'next';
import { SITE_NAME, buildCanonical } from '@/utils/seo';

const title = `Remove Duplicate Lines | ${SITE_NAME}`;
const description = 'Quickly remove duplicate lines from a list of text. A free online utility tool to clean up text data.';
const path = '/remove-duplicate-lines';

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
