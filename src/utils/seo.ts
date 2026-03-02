const SITE_NAME = "Daily Task Tool";

const DEFAULT_TITLE =
  "Daily Task Tool | Utilities for Everyday Tasks";

const SITE_DESCRIPTION =
  "A collection of simple and useful utility tools including a QR Code Generator, Random Slot Machine, Text-to-Speech converter, Password Generator, Unit Converter, Focus Timer, Word Counter, Binary Translator, Base64 Encoder, UUID Generator, URL Encoder, and Text Case Converter.";

const SEO_KEYWORDS = [
  "Daily Task Tool",
  "QR Code Generator",
  "Slot Machine",
  "Text to Speech",
  "Password Generator",
  "Unit Converter",
  "Focus Timer",
  "Pomodoro Timer",
  "Word Counter",
  "Character Counter",
  "Text Statistics",
  "Binary Translator",
  "Binary Converter",
  "Text to Binary",
  "Base64 Encoder",
  "Base64 Decoder",
  "Base64 Converter",
  "UUID Generator",
  "GUID Generator",
  "Random UUID",
  "v4 UUID",
  "URL Encoder",
  "URL Decoder",
  "Text Case Converter",
  "Uppercase Converter",
  "Lowercase Converter",
  "Utilities",
  "Productivity",
  "Next.js Tools",
  "Daily tasks",
];

const OG_IMAGE = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "Daily Task Tool Landing Page",
};

const ensureLeadingSlash = (path = "/") =>
  path.startsWith("/") ? path : `/${path}`;

export const normalizeHost = (host?: string) => {
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
