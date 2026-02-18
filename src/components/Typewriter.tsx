"use client";
import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
}

export default function Typewriter({ text, speed = 40, delay = 500 }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let i = 0;

    const startTyping = () => {
      setDisplayedText(''); // Reset

      const type = () => {
        if (i < text.length) {
          setDisplayedText(prev => prev + text.charAt(i));
          i++;
          timeoutId = setTimeout(type, speed);
        }
      };
      type();
    };

    if (delay > 0) {
      timeoutId = setTimeout(startTyping, delay);
    } else {
      startTyping();
    }

    return () => clearTimeout(timeoutId);
  }, [text, speed, delay]);

  // Cursor blink
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span>
      {displayedText}
      <span
        className={`inline-block w-3 h-5 bg-black align-middle ml-1 transition-opacity duration-100 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
        aria-hidden="true"
      ></span>
    </span>
  );
}
