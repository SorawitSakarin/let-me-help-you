import type { Metadata } from 'next';
import { SITE_NAME } from '@/utils/seo';

export const metadata: Metadata = {
  title: `Memory Match | ${SITE_NAME}`,
  description: 'Test your memory with a fun emoji matching game.',
};

export default function MemoryMatchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}