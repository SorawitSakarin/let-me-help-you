import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Credit Card Validator',
  description: 'Validate credit card numbers using the Luhn algorithm.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
