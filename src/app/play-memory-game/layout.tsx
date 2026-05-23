import { Metadata } from 'next';
import { DEFAULT_TITLE, SITE_NAME } from '@/utils/seo';

export const metadata: Metadata = {
  title: `Memory Game | ${SITE_NAME}`,
  description: 'Match pairs of cards in this classic memory game.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}