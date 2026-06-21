import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to CSV Converter",
  description: "Convert JSON data into CSV format easily.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}