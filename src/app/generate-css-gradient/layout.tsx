import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSS Gradient Generator',
  description: 'Create and preview beautiful CSS gradients for your web projects.',
};

export default function CSSGradientGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
