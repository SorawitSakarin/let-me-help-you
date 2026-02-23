"use client";

import React from 'react';
import { usePathname } from 'next/navigation';

export default function FloatingSupportWidget() {
  const pathname = usePathname();

  // Do not render on the landing page ('/')
  if (pathname === '/') {
    return null;
  }

  return (
    <a
      href="https://buymeacoffee.com/stooop"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center bg-yellow-400 border-l-4 border-t-4 border-b-4 border-black p-2 shadow-lg hover:bg-yellow-300 transition-colors group"
      style={{ borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }}
      aria-label="Support me by buying a coffee"
    >
      <i className="nes-icon coin is-small mb-1 group-hover:animate-spin"></i>
      <span className="text-[10px] font-bold text-black writing-vertical-rl transform rotate-180 uppercase tracking-widest" style={{ writingMode: 'vertical-rl' }}>
        Support
      </span>
    </a>
  );
}
