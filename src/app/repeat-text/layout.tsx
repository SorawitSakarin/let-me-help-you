import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Text Repeater',
  description: 'Repeat text multiple times easily and quickly.',
};

export default function RepeatTextLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}