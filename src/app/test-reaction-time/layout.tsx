import type { Metadata } from 'next';
import { SITE_NAME } from '@/utils/seo';

export const metadata: Metadata = {
  title: `Reaction Time Test | ${SITE_NAME}`,
  description: 'Test your visual reaction speed. A simple and fun retro 8-bit style reflex test tool.',
};

export default function ReactionTimeTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
