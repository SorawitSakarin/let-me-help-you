import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ROT13 Encoder",
  description: "Encode and decode text using the ROT13 cipher.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
