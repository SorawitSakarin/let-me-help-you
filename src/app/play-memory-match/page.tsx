import { Metadata } from 'next';
import MemoryMatchClient from './MemoryMatchClient';

export const metadata: Metadata = {
  title: 'Memory Match',
  description: 'Play a classic game of Memory Match with emojis.',
};

export default function MemoryMatchPage() {
  return <MemoryMatchClient />;
}
