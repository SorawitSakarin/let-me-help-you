import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Sparkles } from "lucide-react";
import "./globals.css";
import {
  DEFAULT_TITLE,
  SITE_DESCRIPTION,
  SEO_KEYWORDS,
  getMetadataBase,
  OG_IMAGE,
  SITE_NAME
} from "@/utils/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${DEFAULT_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  openGraph: {
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-gray-50 text-gray-900 flex flex-col min-h-screen`}>
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-8 h-8 overflow-hidden rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-200">
                 <Image
                  src="/logo.png"
                  alt="Daily Task Tool Logo"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <span className="font-bold text-lg tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors">
                Daily Task Tool
              </span>
            </Link>
            {/* Optional: Add navigation links here if needed later */}
          </div>
        </header>

        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="border-t border-gray-200 bg-white py-8 mt-auto">
          <div className="container mx-auto px-4 text-center text-sm text-gray-500">
            <p className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Powered by Stooop. Made with Next.js</span>
            </p>
            <p className="text-gray-400 text-xs">
              © {new Date().getFullYear()} Daily Task Tool. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
