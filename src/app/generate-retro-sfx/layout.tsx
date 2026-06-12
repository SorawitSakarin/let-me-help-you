import type { Metadata } from 'next';
import { SITE_NAME } from '@/utils/seo';

export const metadata: Metadata = {
  title: `Retro SFX Generator | ${SITE_NAME}`,
  description: 'Generate, customize, and download 8-bit retro sound effects (Laser, Explosion, Jump, Coin) for games or web projects using the Web Audio API. Export as WAV or copy JS code.',
};

export default function RetroSFXLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
