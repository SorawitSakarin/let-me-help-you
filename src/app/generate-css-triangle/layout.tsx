import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSS Triangle Generator',
  description: 'Generate CSS for various triangles instantly.',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
