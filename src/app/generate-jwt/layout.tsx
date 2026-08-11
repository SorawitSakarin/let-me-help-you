import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JWT Generator',
  description: 'Generate and sign JSON Web Tokens (JWT) locally in your browser.',
};

export default function JwtGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}