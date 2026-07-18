import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NATO Phonetic Alphabet',
  description: 'Translate text into the NATO phonetic alphabet and vice versa.',
  alternates: {
    canonical: '/nato-phonetic-alphabet',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
