import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Caesar Cipher',
  description: 'Encode and decode text using the classic Caesar cipher algorithm.',
};

export default function CaesarCipherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
