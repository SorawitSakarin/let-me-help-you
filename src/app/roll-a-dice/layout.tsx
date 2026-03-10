import { Metadata } from 'next';
import { DEFAULT_TITLE, SITE_DESCRIPTION } from '@/utils/seo';

export const metadata: Metadata = {
  title: 'Roll a Dice',
  description: `Roll a virtual 6-sided dice. ${SITE_DESCRIPTION}`,
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}