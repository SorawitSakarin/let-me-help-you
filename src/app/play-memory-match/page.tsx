import { Metadata } from 'next';
import MemoryMatchClient from './MemoryMatchClient';

export const metadata: Metadata = {
  title: 'Memory Match',
  description: 'Play a fun 8-bit memory match game.',
  keywords: ['memory match', 'game', '8-bit', 'puzzle']
};

export default function MemoryMatchPage() {
  return <MemoryMatchClient />;
}
