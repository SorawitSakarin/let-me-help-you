import { Metadata } from 'next';
import MemoryMatchClient from './MemoryMatchClient';

export const metadata: Metadata = {
  title: 'Memory Match | Daily Task Tool',
  description: 'Play a fun memory match card game with emojis. Test your memory in 8-bit style!',
  keywords: ['memory match', 'game', 'emoji game', 'daily task tool', 'fun'],
};

export default function MemoryMatchPage() {
  return <MemoryMatchClient />;
}
