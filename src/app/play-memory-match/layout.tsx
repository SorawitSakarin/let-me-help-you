import type { Metadata } from 'next';
import { SITE_NAME } from '@/utils/seo';

export const metadata: Metadata = {
  title: `Memory Match | ${SITE_NAME}`,
  description: 'Test your memory by matching pairs of cards. Fun and engaging retro 8-bit style card game.',
};

export default function MemoryMatchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
