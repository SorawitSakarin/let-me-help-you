import { Metadata } from 'next';
import { DEFAULT_TITLE, SITE_DESCRIPTION, buildCanonical } from '@/utils/seo';

export const metadata: Metadata = {
  title: `Memory Match | ${DEFAULT_TITLE}`,
  description: 'Play a classic game of Memory Match with 8-bit retro styling. ' + SITE_DESCRIPTION,
  alternates: {
    canonical: buildCanonical('/play-memory-match'),
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
