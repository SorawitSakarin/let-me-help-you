import { Metadata } from 'next';
import { buildCanonical, SITE_NAME } from '@/utils/seo';

const title = `Roll a Dice | ${SITE_NAME}`;
const description = 'Roll virtual dice for games, decisions, or fun. Choose the number of dice and roll instantly with this simple, 8-bit themed dice roller.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: buildCanonical('/roll-a-dice'),
  },
  openGraph: {
    title,
    description,
    url: buildCanonical('/roll-a-dice'),
  },
};

export default function RollADiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
