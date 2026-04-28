import type { Metadata } from 'next';
import { SITE_NAME } from '@/utils/seo';

export const metadata: Metadata = {
  title: `Memory Match | ${SITE_NAME}`,
  description: 'Play a fun 8-bit style Memory Match game.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}