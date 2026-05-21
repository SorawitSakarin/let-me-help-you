import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guess the Number',
  description: 'Can you guess the secret number? Test your intuition in this fun retro 8-bit game.',
};

export default function GuessTheNumberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
