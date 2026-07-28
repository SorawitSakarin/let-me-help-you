import type { Metadata } from 'next';
import { SITE_NAME, buildCanonical } from '@/utils/seo';

const title = `JSON to TypeScript | ${SITE_NAME}`;
const description = 'Convert JSON objects to TypeScript interfaces instantly. Free online developer tool.';
const path = '/convert-json-to-typescript';

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
