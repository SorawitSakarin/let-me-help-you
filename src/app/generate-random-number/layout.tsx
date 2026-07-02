import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Random Number Generator',
  description: 'Generate random numbers within a specific range easily.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
