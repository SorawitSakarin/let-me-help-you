import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meta Tag Generator",
  description: "Generate standard, Open Graph, and Twitter standard meta tags easily.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
