import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cron Parser",
  description: "Translate Cron expressions into human-readable text.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
