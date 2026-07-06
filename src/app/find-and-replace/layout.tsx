import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find and Replace",
  description: "Find and replace text with options for match case.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
