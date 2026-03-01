import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Press_Start_2P } from "next/font/google";
import "nes.css/css/nes.min.css";
import "./globals.css";
import FloatingSupportWidget from "@/components/FloatingSupportWidget";
import {
  DEFAULT_TITLE,
  SITE_DESCRIPTION,
  SEO_KEYWORDS,
  getMetadataBase,
  OG_IMAGE,
  SITE_NAME
} from "@/utils/seo";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start-2p",
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
      <body className={`${pressStart2P.variable} font-sans antialiased`}>
        {/* Floating Support Widget - Conditionally rendered internally */}
        <FloatingSupportWidget />

        <div className="container mx-auto p-4 min-h-screen flex flex-col max-w-5xl">
          <header className="mb-6 text-center flex flex-col items-center">
            <h1>
              <Link href="/" className="nes-text is-primary no-underline hover:underline flex items-center justify-center gap-3 text-lg md:text-2xl">
                <Image
                  src="/logo.png"
                  alt="Daily Task Tool Logo"
                  width={32}
                  height={32}
                  className="pixelated"
                  style={{ imageRendering: 'pixelated' }}
                />
                Daily Task Tool
              </Link>
            </h1>
          </header>

          <main className="flex-grow">
            {children}
            <Analytics />
            <SpeedInsights />
          </main>

          <footer className="mt-8 py-6 text-center text-xs text-gray-500 border-t border-gray-200 flex flex-col items-center gap-3">
            <p className="flex items-center gap-2 justify-center">
                <i className="nes-icon star is-small scale-75"></i>
                <span>Powered by Stooop. Made with Next.js</span>
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
