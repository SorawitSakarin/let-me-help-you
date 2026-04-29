import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Memory Match',
  description: 'Play a fun 8-bit memory match card game.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
