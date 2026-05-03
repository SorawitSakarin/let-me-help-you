import type { Metadata } from 'next';
import { SITE_NAME } from '@/utils/seo';

export const metadata: Metadata = {
  title: `Memory Match | ${SITE_NAME}`,
  description: 'Play a fun memory match card game. Test your memory by matching emoji pairs.',
};

export default function MemoryMatchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
