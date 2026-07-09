import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Text to Hex Converter',
  description: 'Convert text to Hexadecimal format and vice versa.',
};

export default function TextToHexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}