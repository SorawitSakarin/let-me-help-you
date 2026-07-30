import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cron Parser',
  description: 'Convert cron expressions into human readable descriptions.',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
