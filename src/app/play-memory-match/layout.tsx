import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Memory Match | Daily Task Tool",
  description: "Play a fun Memory Match game to test your memory.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
