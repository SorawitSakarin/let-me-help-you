import type { Metadata } from 'next';
import { SITE_NAME } from '@/utils/seo';

export const metadata: Metadata = {
  title: `Retro Flexbox Playground | ${SITE_NAME}`,
  description: 'An interactive 8-bit themed CSS Flexbox playground. Toggle container options (direction, justify, align, wrap, gap) and customize child items to visualize Flexbox layouts live with retro game character sprites.',
};

export default function FlexboxPlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
