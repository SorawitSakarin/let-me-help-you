import { Metadata } from 'next';
import { buildCanonical, SITE_NAME } from '@/utils/seo';

const title = `Roll a Dice | ${SITE_NAME}`;
const description = 'Roll a virtual 6-sided die online. A simple and fun dice roller with a retro 8-bit aesthetic.';

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
  twitter: {
    title,
    description,
  },
};

export default function RollADiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
