import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Random Animal Generator',
  description: 'Discover a random animal, its emoji, and an interesting fact!',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
