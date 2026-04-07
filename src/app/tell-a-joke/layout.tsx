import { Metadata } from 'next';
import { buildCanonical, SITE_NAME } from '@/utils/seo';

const title = `Tell a Joke | ${SITE_NAME}`;
const description = 'Generate random jokes to brighten your day. A simple, fun, and free joke generator with a retro 8-bit aesthetic.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: buildCanonical('/tell-a-joke'),
  },
  openGraph: {
    title,
    description,
    url: buildCanonical('/tell-a-joke'),
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
