import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'URL Encoder & Decoder | Daily Task Tool',
  description: 'Easily encode and decode URLs to ensure safe transmission over the internet. Free, fast, and works instantly in your browser.',
};

export default function URLEncoderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
