import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'List Shuffler',
  description: 'Randomize and shuffle lines of text or lists of items.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
