import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chmod Calculator',
  description: 'Calculate Unix permissions and generate chmod commands.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
