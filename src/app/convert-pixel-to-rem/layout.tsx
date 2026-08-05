import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Pixel to REM Converter',
  description: 'Convert between Pixels and REM units easily based on the root font size.',
};

export default function PixelToRemConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}