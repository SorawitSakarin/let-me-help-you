import type { Metadata } from 'next';
import { SITE_NAME } from '@/utils/seo';

export const metadata: Metadata = {
  title: 'Color Contrast Checker',
  description: 'Calculate the contrast ratio between text and background colors to ensure WCAG accessibility compliance.',
  alternates: {
    canonical: '/check-color-contrast',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
