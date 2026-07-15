import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Whitespace Cleaner',
  description: 'Quickly clean up and format your text by removing extra spaces, line breaks, or all whitespace.',
  alternates: {
    canonical: '/remove-whitespace',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}