import type { Metadata } from 'next';
import { SITE_NAME } from '@/utils/seo';

export const metadata: Metadata = {
  title: `Roll a Dice | ${SITE_NAME}`,
  description: 'Roll a virtual 6-sided dice in a fun retro 8-bit style.',
};

export default function RollADiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}