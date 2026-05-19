import type { Metadata } from 'next';
import { SITE_NAME } from '@/utils/seo';

export const metadata: Metadata = {
  title: `Guess the Number | ${SITE_NAME}`,
  description: 'Play a fun Guess the Number game. Try to guess the secret number between 1 and 100 in the fewest attempts.',
};

export default function GuessTheNumberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
