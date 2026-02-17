const SITE_NAME = "Daily 8-bit Tools";

const DEFAULT_TITLE =
  "Daily 8-bit Tools | Retro Utilities for Everyday Tasks";

const SITE_DESCRIPTION =
  "A collection of fun, 8-bit styled utility tools including a QR Code Generator, Random Slot Machine, and Text-to-Speech converter.";

const SEO_KEYWORDS = [
  "Daily 8-bit Tools",
  "QR Code Generator",
  "Slot Machine",
  "Text to Speech",
  "Retro UI",
  "Nes.css",
  "Next.js Tools",
  "8-bit utilities",
];

const OG_IMAGE = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "Daily 8-bit Tools Landing Page",
};

const ensureLeadingSlash = (path = "/") =>
  path.startsWith("/") ? path : `/${path}`;

const normalizeHost = (host?: string) => {
  if (!host) return undefined;
  if (host.startsWith("http://") || host.startsWith("https://")) return host;
  return `https://${host}`;
};

export const getSiteUrl = () =>
  normalizeHost(process.env.NEXT_PUBLIC_SITE_URL) ?? "http://localhost:3000";

export const getMetadataBase = () => new URL(getSiteUrl());

export const buildCanonical = (path = "/") =>
  new URL(ensureLeadingSlash(path), getSiteUrl()).toString();

export { DEFAULT_TITLE, OG_IMAGE, SEO_KEYWORDS, SITE_DESCRIPTION, SITE_NAME };
