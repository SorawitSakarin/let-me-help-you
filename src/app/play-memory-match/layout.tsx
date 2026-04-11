import type { Metadata } from 'next';
import { SITE_NAME } from '@/utils/seo';

export const metadata: Metadata = {
  title: `Memory Match | ${SITE_NAME}`,
  description: 'Play a classic game of Memory Match. Test your memory with this fun 8-bit style card game.',
};

export default function MemoryMatchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
