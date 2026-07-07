import type { Metadata } from 'next';
import { SITE_NAME } from '@/utils/seo';

export const metadata: Metadata = {
  title: `Retro ASCII Art Generator | ${SITE_NAME}`,
  description: 'Convert text to retro ASCII banner art and images to stylized text blocks, matrices, or dots. Customize fonts, characters, and color palettes with chiptune sounds and dynamic crt terminal views.',
};

export default function AsciiArtLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
