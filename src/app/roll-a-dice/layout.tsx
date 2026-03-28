import type { Metadata } from 'next';
import { SITE_NAME } from '@/utils/seo';

export const metadata: Metadata = {
  title: `Roll a Dice | ${SITE_NAME}`,
  description: 'Roll a standard 6-sided die. Simple, fun, and fast retro 8-bit style.',
};

export default function RollADiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
