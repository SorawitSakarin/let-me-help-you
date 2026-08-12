import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Device Info Checker',
  description: 'Check your browser, screen, and device information instantly.',
};

export default function CheckDeviceInfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
