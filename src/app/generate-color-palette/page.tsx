'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const generateRandomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
};

export default function ColorPaletteGenerator() {
  const [palette, setPalette] = useState<string[]>([]);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const generatePalette = useCallback(() => {
    const newPalette = Array.from({ length: 5 }, () => generateRandomColor());
    setPalette(newPalette);
  }, []);

  useEffect(() => {
    setIsMounted(true);
    generatePalette();
  }, [generatePalette]);

  const handleCopy = (color: string) => {
    navigator.clipboard.writeText(color).catch((err) => {
      console.error('Failed to copy to clipboard', err);
    });
    setCopyStatus(color);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  if (!isMounted) return null;

  return (
    <div className="flex flex-col items-center gap-6 p-4 max-w-6xl mx-auto w-full">
      <div className="w-full flex justify-start">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>

      <div className="nes-container with-title is-centered w-full">
        <h3 className="title">Color Palette Generator</h3>
        <p className="mb-6 text-sm">Generate random color palettes and click to copy HEX codes.</p>

        <div className="flex flex-col md:flex-row gap-4 w-full justify-center mb-6 h-64 md:h-96">
          {palette.map((color, index) => (
            <div
              key={index}
              className="flex-1 flex flex-col items-center justify-end p-4 rounded-md cursor-pointer transition-transform hover:scale-105"
              style={{ backgroundColor: color, border: '4px solid #000' }}
              onClick={() => handleCopy(color)}
            >
              <div className="bg-white p-2 border-2 border-black rounded text-center shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                <p className="text-xs md:text-sm font-bold mb-1">{color}</p>
                {copyStatus === color ? (
                  <span className="text-[10px] text-green-600">Copied!</span>
                ) : (
                  <span className="text-[10px] text-gray-500">Copy</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <button type="button" className="nes-btn is-primary" onClick={generatePalette}>
          Generate New Palette
        </button>
      </div>
    </div>
  );
}