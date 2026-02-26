'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface KeyInfo {
  key: string;
  code: string;
  keyCode: number;
  which: number;
  location: number;
  shiftKey: boolean;
  ctrlKey: boolean;
  altKey: boolean;
  metaKey: boolean;
}

export default function KeycodeInfoClient() {
  const [keyInfo, setKeyInfo] = useState<KeyInfo | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent scrolling for common keys
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
      }

      setKeyInfo({
        key: e.key,
        code: e.code,
        keyCode: e.keyCode,
        which: e.which,
        location: e.location,
        shiftKey: e.shiftKey,
        ctrlKey: e.ctrlKey,
        altKey: e.altKey,
        metaKey: e.metaKey,
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto p-4">
      {/* Back Button */}
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>

      <div className="nes-container with-title is-centered w-full">
        <h2 className="title">Keycode Info</h2>

        {!keyInfo ? (
            <div className="py-12 flex flex-col items-center animate-pulse">
                <i className="nes-icon is-large star mb-4"></i>
                <p className="text-xl">Press any key to see info...</p>
            </div>
        ) : (
            <div className="flex flex-col gap-6 w-full">
                <div className="nes-container is-rounded is-dark text-center py-8">
                    <p className="text-sm mb-2">event.key</p>
                    <h1 className="text-4xl md:text-6xl text-primary break-all">
                        {keyInfo.key === ' ' ? '(Space)' : keyInfo.key}
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="nes-container with-title is-rounded">
                        <p className="title">Event Data</p>
                        <div className="lists text-left">
                            <ul className="nes-list is-disc">
                                <li>code: <span className="text-primary">{keyInfo.code}</span></li>
                                <li>keyCode: <span className="text-primary">{keyInfo.keyCode}</span></li>
                                <li>which: <span className="text-primary">{keyInfo.which}</span></li>
                                <li>location: <span className="text-primary">{keyInfo.location}</span></li>
                            </ul>
                        </div>
                    </div>

                    <div className="nes-container with-title is-rounded">
                        <p className="title">Modifiers</p>
                        <div className="lists text-left">
                             <ul className="nes-list is-circle">
                                <li>Shift: <span className={keyInfo.shiftKey ? "text-success" : "text-error"}>{keyInfo.shiftKey ? 'YES' : 'NO'}</span></li>
                                <li>Ctrl: <span className={keyInfo.ctrlKey ? "text-success" : "text-error"}>{keyInfo.ctrlKey ? 'YES' : 'NO'}</span></li>
                                <li>Alt: <span className={keyInfo.altKey ? "text-success" : "text-error"}>{keyInfo.altKey ? 'YES' : 'NO'}</span></li>
                                <li>Meta: <span className={keyInfo.metaKey ? "text-success" : "text-error"}>{keyInfo.metaKey ? 'YES' : 'NO'}</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>

      <div className="nes-container is-dark w-full mt-4">
        <p>This tool captures keyboard events and displays their properties. Useful for debugging input handling in games and apps.</p>
      </div>
    </div>
  );
}
