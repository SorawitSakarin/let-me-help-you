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
      className="
        fixed z-50
        flex items-center
        bg-yellow-400 border-black shadow-lg
        hover:bg-yellow-300 transition-colors group
        rounded-none rounded-l-lg border-r-0
        p-1

        /* Mobile: Bottom Right, Button Style */
        top-18 right-0
        flex-row gap-2
        border-4 rounded-lg

        /* Desktop: Middle Right, Tab Style */
        md:bottom-auto md:top-1/2 md:right-0
        md:-translate-y-1/2
        md:flex-col md:gap-1
        md:border-l-4 md:border-t-4 md:border-b-4
        md:p-2
      "
      aria-label="Support me by buying a coffee"
    >
      <i className="nes-icon coin is-small group-hover:animate-spin"></i>

      {/* Mobile Text: Horizontal */}
      <span className="hidden md:flex text-xs font-bold text-black uppercase tracking-widest md:hidden">
        Support
      </span>

      {/* Desktop Text: Vertical */}
      <span
        className="hidden md:block text-[10px] font-bold text-black uppercase tracking-widest writing-vertical-rl transform rotate-180"
        style={{ writingMode: 'vertical-rl' }}
      >
        Support
      </span>
    </a>
  );
}
