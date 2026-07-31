import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSS Filter Generator',
  description: 'Create and preview CSS filters for images easily.',
  alternates: {
    canonical: '/generate-css-filter',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
