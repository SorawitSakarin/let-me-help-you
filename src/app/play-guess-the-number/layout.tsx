import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guess the Number | Daily Task Tool',
  description: 'Play a classic game of Guess the Number against the computer.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
