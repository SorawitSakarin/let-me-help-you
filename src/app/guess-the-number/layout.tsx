import type { Metadata } from 'next';
import { SITE_NAME } from '@/utils/seo';

export const metadata: Metadata = {
  title: `Guess the Number | ${SITE_NAME}`,
  description: 'Play a classic high/low number guessing game. Simple, fun, and fast retro 8-bit style.',
};

export default function GuessTheNumberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
