import { Metadata } from 'next';
import { buildCanonical } from '@/utils/seo';

export const metadata: Metadata = {
  title: 'Vaporwave Text Generator',
  description: 'Convert normal text into fullwidth aesthetic vaporwave text instantly.',
  alternates: {
    canonical: buildCanonical('/generate-vaporwave-text'),
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
