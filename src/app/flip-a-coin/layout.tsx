import { Metadata } from 'next';
import { DEFAULT_TITLE } from '@/utils/seo';

export const metadata: Metadata = {
  title: `Coin Flipper | ${DEFAULT_TITLE}`,
  description: 'Flip a virtual coin for heads or tails.',
  alternates: {
    canonical: '/flip-a-coin',
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
