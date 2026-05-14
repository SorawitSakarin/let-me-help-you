import type { Metadata } from 'next';
import { SITE_NAME } from '@/utils/seo';

export const metadata: Metadata = {
  title: `Guess the Number | ${SITE_NAME}`,
  description: 'Play a classic Guess the Number game. A fun and interactive 8-bit retro style game.',
};

export default function GuessTheNumberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}