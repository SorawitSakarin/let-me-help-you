import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSS Grid Generator',
  description: 'Generate, customize, and preview CSS Grid layouts easily.',
};

export default function CssGridGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
