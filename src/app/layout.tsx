import type { Metadata } from "next";
import Link from "next/link";
import { Press_Start_2P } from "next/font/google";
import "nes.css/css/nes.min.css";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start-2p",
});

export const metadata: Metadata = {
  title: "Daily 8-bit Tools",
  description: "Make your daily tasks easier with fun 8-bit tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pressStart2P.variable} font-sans antialiased`}>
        <div className="container mx-auto p-4 min-h-screen flex flex-col">
          <header className="mb-8 text-center">
            <h1>
              <Link href="/" className="nes-text is-primary no-underline hover:underline">
                Daily 8-bit Tools
              </Link>
            </h1>
          </header>

          <main className="flex-grow">
            {children}
          </main>

          <footer className="mt-12 text-center text-sm nes-text is-disabled">
            <p>Made with Next.js & Nes.css</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
