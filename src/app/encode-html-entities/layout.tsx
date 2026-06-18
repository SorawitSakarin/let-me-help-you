import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HTML Entity Encoder',
  description: 'Safely encode and decode HTML entities.',
};

export default function HtmlEntityEncoderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
