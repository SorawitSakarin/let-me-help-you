import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Text Shadow Generator',
  description: 'Create and preview beautiful CSS text shadows for your web projects.',
};

export default function CSSTextShadowGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
