import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Memory Match | Daily Task Tool',
  description: 'Play a classic 4x4 emoji memory match game. Test your memory and match all pairs!',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}