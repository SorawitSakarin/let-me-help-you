import type { Metadata } from 'next';
import { DEFAULT_TITLE, SITE_DESCRIPTION, buildCanonical, getMetadataBase } from '@/utils/seo';

const title = `Memory Match | ${DEFAULT_TITLE}`;
const description = 'Test your memory with a fun emoji matching game.';

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title,
  description,
  openGraph: {
    title,
    description,
    url: buildCanonical('/play-memory-match'),
    type: 'website',
  },
  alternates: {
    canonical: buildCanonical('/play-memory-match'),
  },
};

export default function MemoryMatchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}