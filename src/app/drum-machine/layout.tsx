import { Metadata } from 'next';
import { buildCanonical } from '@/utils/seo';

export const metadata: Metadata = {
  title: 'Drum Machine | Daily Task Tool',
  description: 'A retro 8-bit drum machine/sequencer to create simple beats.',
  alternates: {
    canonical: buildCanonical('/drum-machine'),
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}