import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unix Timestamp Converter",
  description: "Convert Unix timestamps to human-readable dates and vice versa.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
