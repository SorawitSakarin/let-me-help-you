import type { Metadata } from 'next';
import { SITE_NAME } from '@/utils/seo';

export const metadata: Metadata = {
  title: `Rock Paper Scissors | ${SITE_NAME}`,
  description: 'Play a classic game of Rock Paper Scissors against the computer. Fun retro 8-bit style.',
};

export default function RockPaperScissorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
