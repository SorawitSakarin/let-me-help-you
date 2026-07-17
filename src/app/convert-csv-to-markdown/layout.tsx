import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSV to Markdown Converter',
  description: 'Convert CSV data into a Markdown table easily.',
  alternates: {
    canonical: '/convert-csv-to-markdown',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
