import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Leetspeak Generator',
  description: 'Convert text to leetspeak (1337 5p34k) instantly.',
};

export default function LeetspeakLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}