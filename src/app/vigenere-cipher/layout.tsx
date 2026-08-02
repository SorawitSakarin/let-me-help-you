import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vigenère Cipher',
  description: 'Encode and decode text using the Vigenère cipher algorithm.',
};

export default function VigenereCipherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}