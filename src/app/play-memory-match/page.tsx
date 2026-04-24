import { Metadata } from 'next';
import MemoryMatchClient from './MemoryMatchClient';

export const metadata: Metadata = {
  title: 'Memory Match | Daily Task Tool',
  description: 'Play a classic game of Memory Match with fun emojis.',
};

export default function MemoryMatchPage() {
  return (
    <div className="container mx-auto max-w-2xl">
      <div className="nes-container with-title is-rounded mb-8">
        <h1 className="title text-xl">Memory Match</h1>
        <p className="mb-4">Find all the matching pairs!</p>
        <MemoryMatchClient />
      </div>
    </div>
  );
}
