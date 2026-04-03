import type { Metadata } from 'next';
import { buildCanonical } from '@/utils/seo';

export const metadata: Metadata = {
  title: 'Guess the Number | Daily Task Tool',
  description: 'Play a retro-style Guess the Number game. Try to guess the hidden number between 1 and 100.',
  alternates: {
    canonical: buildCanonical('/play-guess-the-number'),
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
