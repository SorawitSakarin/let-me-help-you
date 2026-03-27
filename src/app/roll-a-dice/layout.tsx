import { Metadata } from 'next';
import { getMetadataBase } from '@/utils/seo';

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: 'Roll a Dice | Daily Task Tool',
  description: 'A simple and fun online tool to roll a 6-sided die. Perfect for games, decisions, and random number generation.',
  openGraph: {
    title: 'Roll a Dice | Daily Task Tool',
    description: 'A simple and fun online tool to roll a 6-sided die.',
  },
  twitter: {
    title: 'Roll a Dice | Daily Task Tool',
    description: 'A simple and fun online tool to roll a 6-sided die.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
