import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'MAC Address Generator',
  description: 'Generate random MAC addresses easily and quickly.',
};

export default function GenerateMacAddressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
