import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unit Converter',
  description: 'Convert weight, length, and temperature instantly.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
