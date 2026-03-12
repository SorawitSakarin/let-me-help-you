import { Metadata } from 'next';
import { buildCanonical } from '@/utils/seo';

export const metadata: Metadata = {
  title: 'Coin Flipper | Daily Task Tool',
  description: 'Flip a virtual coin instantly. A fun 8-bit style coin toss simulation with heads and tails statistics.',
  alternates: {
    canonical: buildCanonical('/flip-a-coin'),
  },
};

export default function FlipACoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
