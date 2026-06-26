import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Border Radius Generator',
  description: 'Create and preview beautiful CSS border radii for your web projects.',
};

export default function BorderRadiusGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
