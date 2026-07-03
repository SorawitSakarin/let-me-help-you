import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSS Minifier',
  description: 'Minify CSS code easily and quickly.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
