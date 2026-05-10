import { Metadata } from 'next';
import { SITE_NAME, buildCanonical } from '@/utils/seo';

const title = `Joke Generator | ${SITE_NAME}`;
const description = 'Generate a random joke to lighten up your day. Features a fun 8-bit style interface.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: buildCanonical('/generate-joke'),
  },
  openGraph: {
    title,
    description,
    url: buildCanonical('/generate-joke'),
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}