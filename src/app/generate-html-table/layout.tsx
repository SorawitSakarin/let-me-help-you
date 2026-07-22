import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HTML Table Generator',
  description: 'Generate basic HTML table markup code quickly with customizable rows and columns.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}