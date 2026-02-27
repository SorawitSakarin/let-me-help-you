import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Binary Translator",
  description: "Convert text to binary code and binary to text instantly.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
