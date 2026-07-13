import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'URL Extractor',
  description: 'Extract and deduplicate URLs from any text block quickly and easily.',
};

export default function ExtractURLsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
