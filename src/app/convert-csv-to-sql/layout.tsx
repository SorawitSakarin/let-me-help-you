import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV to SQL Converter",
  description: "Convert CSV data into SQL INSERT statements easily.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}