"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { KERNEL_CODE } from './code-data';

export default function HackingScreen() {
  // Find a good stopping point after the header (approx 500 chars for safety, or search for the separator line)
  // We'll hardcode a safe guess or dynamically find the end of the ASCII art if needed.
  // The header is roughly 600 chars. Let's start at 0 but immediately set it on mount to avoid hydration mismatch if we used logic here.
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [isAutoHacking, setIsAutoHacking] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  // Initialize with header visible
  useEffect(() => {
    // Find index of the first real code block after the header (after the separator line)
    // The separator is "--------------------------------------------------"
    const headerEndIndex = KERNEL_CODE.indexOf("STARTING KERNEL DUMP...") + "STARTING KERNEL DUMP...".length + 60; // Approximate buffer
    setDisplayedIndex(headerEndIndex > 0 ? headerEndIndex : 600);
  }, []);
  const bottomRef = useRef<HTMLDivElement>(null);
  const footerTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll to bottom whenever text updates
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [displayedIndex]);

  // Handle manual typing simulation
  useEffect(() => {
    const handleKeyDown = () => {
      // If auto-hacking is on, manual typing might speed it up or just act normally
      setDisplayedIndex((prev) => {
        const increment = Math.floor(Math.random() * 5) + 3; // 3-8 chars
        return Math.min(prev + increment, KERNEL_CODE.length);
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle Auto-Hack Loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoHacking) {
      interval = setInterval(() => {
        setDisplayedIndex((prev) => {
          if (prev >= KERNEL_CODE.length) {
            setIsAutoHacking(false);
            return prev;
          }
          const increment = Math.floor(Math.random() * 8) + 2; // 2-10 chars
          return Math.min(prev + increment, KERNEL_CODE.length);
        });
      }, 50); // Speed of auto-typing
    }
    return () => clearInterval(interval);
  }, [isAutoHacking]);

  // Handle User Interaction (Show Footer)
  const handleInteraction = () => {
    setShowFooter(true);
    if (footerTimeoutRef.current) clearTimeout(footerTimeoutRef.current);

    footerTimeoutRef.current = setTimeout(() => {
      setShowFooter(false);
    }, 3000);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    window.addEventListener('click', handleInteraction);
    return () => {
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('click', handleInteraction);
      if (footerTimeoutRef.current) clearTimeout(footerTimeoutRef.current);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black text-[#0f0] overflow-y-auto overflow-x-hidden p-4 md:p-8 break-words whitespace-pre-wrap leading-tight ${showFooter ? 'cursor-auto' : 'cursor-none'}`}
      style={{ fontFamily: '"Courier New", monospace' }}
      onClick={() => {
        // Clicking can also trigger a chunk of code if desired,
        // but mainly we just want to ensure focus is here.
        handleInteraction();
      }}
    >
      {KERNEL_CODE.slice(0, displayedIndex)}

      {/* Cursor */}
      <span className="inline-block w-3 h-5 bg-[#0f0] ml-1 animate-pulse align-middle"></span>

      <div ref={bottomRef} className="h-20" /> {/* Spacer for scrolling */}

      {/* Footer Navigation */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-black/90 border-t border-[#0f0] p-4 flex justify-between items-center transition-opacity duration-500 ${showFooter ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ fontFamily: '"Courier New", monospace' }}
      >
        <Link href="/" className="text-[#0f0] hover:bg-[#0f0] hover:text-black px-4 py-2 border border-[#0f0] transition-colors uppercase text-sm font-bold no-underline">
          &lt; Back to Home
        </Link>

        <button
          onClick={() => setIsAutoHacking(!isAutoHacking)}
          className={`px-4 py-2 border border-[#0f0] transition-colors uppercase text-sm font-bold ${isAutoHacking ? 'bg-[#0f0] text-black' : 'text-[#0f0] hover:bg-[#0f0] hover:text-black'}`}
        >
          {isAutoHacking ? 'Stop Auto-Hack' : 'Start Auto-Hack'}
        </button>
      </div>
    </div>
  );
}
