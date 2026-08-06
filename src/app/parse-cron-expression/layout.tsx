import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Cron Expression Parser',
  description: 'Parse and explain Cron expressions in plain English, with next execution dates.',
};

export default function CronParserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
