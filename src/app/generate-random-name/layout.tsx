import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Random Name Generator",
  description: "Generate random names with different options like male, female, or any gender.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}