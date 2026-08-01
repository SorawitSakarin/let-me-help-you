import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSS Cursor Viewer',
  description: 'View and copy all available CSS cursor properties.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
