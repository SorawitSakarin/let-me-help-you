import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSV to HTML Converter',
  description: 'Convert CSV data into an HTML table easily.',
  alternates: {
    canonical: '/convert-csv-to-html',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}