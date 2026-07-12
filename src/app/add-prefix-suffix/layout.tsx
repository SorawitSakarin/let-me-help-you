import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Add Prefix & Suffix',
  description: 'Add a prefix and/or suffix to each line of a given text block easily and quickly.',
};

export default function AddPrefixSuffixLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}