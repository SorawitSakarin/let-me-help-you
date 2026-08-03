import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'IP Extractor',
  description: 'Extract and deduplicate IP addresses (IPv4 and IPv6) from any text block quickly and easily.',
};

export default function ExtractIPsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
