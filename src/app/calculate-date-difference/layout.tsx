import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Date Difference Calculator",
  description: "Calculate the exact difference between two dates in years, months, and days.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}