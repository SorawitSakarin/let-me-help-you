import type { Metadata } from 'next';
import { SITE_NAME } from '@/utils/seo';

export const metadata: Metadata = {
  title: `Retro Sprite Maker & Pixel Art Creator | ${SITE_NAME}`,
  description: 'Design retro 8-bit game sprites and pixel art online. Export custom canvas drawings directly to high-quality crisp PNG, SVG code, CSS box shadows, or React components. Features sound effects and preset patterns.',
};

export default function RetroSpriteMakerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
