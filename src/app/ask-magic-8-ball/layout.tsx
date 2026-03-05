import type { Metadata } from 'next';
import { SITE_NAME } from '@/utils/seo';

export const metadata: Metadata = {
  title: `Magic 8-Ball | ${SITE_NAME}`,
  description: 'Ask the Magic 8-Ball a question and receive a mystical, randomized answer in a classic retro 8-bit style.',
};

export default function Magic8BallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}