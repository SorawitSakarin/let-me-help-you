import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV to JSON Converter",
  description: "Convert CSV data into JSON format easily.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}