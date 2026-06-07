import type { Metadata } from 'next';
import { SITE_NAME } from '@/utils/seo';

export const metadata: Metadata = {
  title: `RegEx Tester | ${SITE_NAME}`,
  description: 'Test, validate, and debug regular expressions in real-time with highlighted matches, capture groups, preset examples, and a cheat sheet. Built in retro 8-bit style.',
};

export default function RegExTesterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
