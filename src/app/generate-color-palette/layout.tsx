import { Metadata } from 'next';
import { DEFAULT_TITLE, SITE_NAME } from '@/utils/seo';

export const metadata: Metadata = {
  title: 'Color Palette Generator',
  description: 'Generate beautiful random color palettes instantly. Copy HEX codes with a single click.',
  openGraph: {
    title: `Color Palette Generator | ${SITE_NAME}`,
    description: 'Generate beautiful random color palettes instantly. Copy HEX codes with a single click.',
    url: '/generate-color-palette',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}