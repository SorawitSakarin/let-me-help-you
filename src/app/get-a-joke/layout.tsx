import { Metadata } from 'next';
import { buildCanonical } from '@/utils/seo';

export const metadata: Metadata = {
  title: 'Random Joke Generator | Daily Task Tool',
  description: 'Get a random joke to brighten your day.',
  alternates: {
    canonical: buildCanonical('/get-a-joke'),
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
