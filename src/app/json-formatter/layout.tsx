import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter - Validate & Minify",
  description: "Free online JSON formatter, validator, and minifier. Beautify your JSON code or compress it for production.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
