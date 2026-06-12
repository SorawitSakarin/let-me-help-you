import { Metadata } from 'next';
import { SITE_NAME, buildCanonical } from '@/utils/seo';

const title = `BPM Tapper | ${SITE_NAME}`;
const description = 'Calculate Beats Per Minute (BPM) by tapping a button. Features real-time average BPM calculation.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: buildCanonical('/calculate-bpm'),
  },
  openGraph: {
    title,
    description,
    url: buildCanonical('/calculate-bpm'),
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}