import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Password Strength Checker',
  description: 'Check the strength of your password in real-time.',
};

export default function CheckPasswordStrengthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}