import type { Metadata } from 'next';
import { SITE_NAME } from '@/utils/seo';

export const metadata: Metadata = {
  title: `Roll a Dice | ${SITE_NAME}`,
  description: 'A classic 6-sided virtual die for all your random decision and gaming needs. Retro 8-bit style.',
};

export default function RollADiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
