import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Subnet Calculator',
  description: 'Calculate network details, broadcast address, and usable hosts from an IP address and CIDR prefix.',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
