import type { Metadata } from 'next';
import { SITE_NAME } from '@/utils/seo';

export const metadata: Metadata = {
  title: `Guess the Number | ${SITE_NAME}`,
  description: 'Can you guess the secret number between 1 and 100? A simple and fun number guessing game.',
};

export default function GuessTheNumberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
