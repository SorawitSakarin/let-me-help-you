import type { Metadata } from 'next';
import { buildCanonical } from '@/utils/seo';

export const metadata: Metadata = {
  title: 'Memory Match',
  description: 'Play a classic game of Memory Match.',
  alternates: {
    canonical: buildCanonical('/play-memory-match'),
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
