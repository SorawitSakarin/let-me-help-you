import type { Metadata } from 'next';
import { SITE_NAME } from '@/utils/seo';

export const metadata: Metadata = {
  title: `Tic Tac Toe | ${SITE_NAME}`,
  description: 'Play a classic game of Tic Tac Toe against a friend. Simple, fun, and fast retro 8-bit style.',
};

export default function TicTacToeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
