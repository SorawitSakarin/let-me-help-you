import type { Metadata } from 'next';
import { SITE_NAME, buildCanonical } from '@/utils/seo';

const title = `Text Case Converter | ${SITE_NAME}`;
const description = 'Convert text to UPPERCASE, lowercase, Title Case, camelCase, snake_case, and more. Free online text case converter tool.';
const path = '/convert-text-case';

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
