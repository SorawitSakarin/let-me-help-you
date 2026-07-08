import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Email Extractor',
  description: 'Extract email addresses from text quickly and easily.',
};

export default function ExtractEmailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
