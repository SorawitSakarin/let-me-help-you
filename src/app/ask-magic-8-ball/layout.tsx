import type { Metadata } from 'next';
import { SITE_NAME } from '@/utils/seo';

export const metadata: Metadata = {
  title: `Magic 8-Ball | ${SITE_NAME}`,
  description: 'Ask the Magic 8-Ball any yes or no question and reveal your fortune. Simple, fun, and fast retro 8-bit style.',
};

export default function AskMagic8BallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
