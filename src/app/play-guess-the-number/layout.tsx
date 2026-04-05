import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guess the Number | Daily Task Tool',
  description: 'A fun number guessing game. Try to guess the hidden number between 1 and 100.',
  openGraph: {
    title: 'Guess the Number',
    description: 'A fun number guessing game. Try to guess the hidden number between 1 and 100.',
    url: '/play-guess-the-number',
  },
};

export default function GuessTheNumberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
