import type { Metadata } from 'next';
import { SITE_NAME } from '@/utils/seo';

export const metadata: Metadata = {
  title: `Coin Flipper | ${SITE_NAME}`,
  description: 'Flip a virtual coin to make decisions or settle bets. Simple, fun, and fast retro 8-bit style.',
};

export default function FlipACoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
