import type { Metadata } from 'next';
import { SITE_NAME } from '@/utils/seo';

export const metadata: Metadata = {
  title: `Coin Flipper | ${SITE_NAME}`,
  description: 'Flip a coin instantly to make a quick decision. Features a classic 8-bit aesthetic and pseudo-random results.',
};

export default function FlipACoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
