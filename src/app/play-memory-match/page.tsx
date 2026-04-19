import React from 'react';
import { Metadata } from 'next';
import MemoryMatchClient from './MemoryMatchClient';

export const metadata: Metadata = {
  title: 'Play Memory Match | Daily Task Tool',
  description: 'Play a fun memory match game with emojis. Test your memory in retro 8-bit style.',
};

export default function MemoryMatchPage() {
  return <MemoryMatchClient />;
}
