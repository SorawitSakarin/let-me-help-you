import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Box Shadow Generator',
  description: 'Create and preview beautiful CSS box shadows for your web projects.',
};

export default function CSSBoxShadowGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}