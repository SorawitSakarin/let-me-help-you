import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HTML Tag Stripper',
  description: 'Remove all HTML tags from a text string easily.',
};

export default function HtmlTagStripperLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
