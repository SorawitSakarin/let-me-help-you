import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'List Sorter',
  description: 'Sort lists alphabetically, by length, or remove duplicates.',
};

export default function SortListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
