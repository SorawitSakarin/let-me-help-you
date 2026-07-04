"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ColorContrastChecker() {
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [contrastRatio, setContrastRatio] = useState<number>(21);

  // Helper to convert hex to RGB
  const hexToRgb = (hex: string) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  // Helper to calculate relative luminance
  const getLuminance = (r: number, g: number, b: number) => {
    const a = [r, g, b].map(function (v) {
      v /= 255;
      return v <= 0.03928
        ? v / 12.92
        : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  useEffect(() => {
    const fgRgb = hexToRgb(foregroundColor);
    const bgRgb = hexToRgb(backgroundColor);

    if (fgRgb && bgRgb) {
      const l1 = getLuminance(fgRgb.r, fgRgb.g, fgRgb.b);
      const l2 = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
      const lightest = Math.max(l1, l2);
      const darkest = Math.min(l1, l2);
      const ratio = (lightest + 0.05) / (darkest + 0.05);
      setContrastRatio(parseFloat(ratio.toFixed(2)));
    }
  }, [foregroundColor, backgroundColor]);

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl flex items-center gap-3">
          <i className="nes-icon star is-medium"></i>
          Contrast Checker
        </h2>
        <Link href="/" className="nes-btn">Back</Link>
      </div>

      <div className="nes-container with-title is-rounded bg-white">
        <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>Input Colors</h3>
        <div className="flex flex-col md:flex-row gap-6 mt-4">
          <div className="flex-1">
            <label htmlFor="foreground" className="mb-2 block">Text (Foreground)</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                id="foreground"
                value={foregroundColor}
                onChange={(e) => setForegroundColor(e.target.value)}
                className="nes-input"
                style={{ height: '50px', padding: '0.2rem', width: '60px' }}
              />
              <input
                type="text"
                value={foregroundColor}
                onChange={(e) => setForegroundColor(e.target.value)}
                className="nes-input"
              />
            </div>
          </div>
          <div className="flex-1">
            <label htmlFor="background" className="mb-2 block">Background</label>
             <div className="flex items-center gap-2">
              <input
                type="color"
                id="background"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="nes-input"
                style={{ height: '50px', padding: '0.2rem', width: '60px' }}
              />
              <input
                type="text"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="nes-input"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="nes-container with-title is-rounded bg-white">
         <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>Preview</h3>
         <div
           className="p-8 mt-4 border-2 border-black rounded flex items-center justify-center text-center flex-col gap-4"
           style={{ backgroundColor, color: foregroundColor }}
         >
           <h2 className="text-3xl m-0 font-bold" style={{ color: foregroundColor }}>Large Text Example</h2>
           <p className="text-sm m-0" style={{ color: foregroundColor }}>This is an example of normal text to show how it looks against the background.</p>
         </div>
      </div>

       <div className="nes-container with-title is-rounded bg-white">
         <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>Results</h3>
         <div className="mt-4 text-center">
            <div className="text-4xl mb-4 font-bold">{contrastRatio}:1</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-4 text-left">
              <div className={`p-4 border-2 border-black ${contrastRatio >= 4.5 ? 'bg-green-100' : 'bg-red-100'}`}>
                <strong>Normal Text</strong><br/>
                WCAG AA (4.5:1)<br/>
                {contrastRatio >= 4.5 ? 'Pass' : 'Fail'}
              </div>
               <div className={`p-4 border-2 border-black ${contrastRatio >= 7 ? 'bg-green-100' : 'bg-red-100'}`}>
                <strong>Normal Text</strong><br/>
                WCAG AAA (7.0:1)<br/>
                {contrastRatio >= 7 ? 'Pass' : 'Fail'}
              </div>
              <div className={`p-4 border-2 border-black ${contrastRatio >= 3 ? 'bg-green-100' : 'bg-red-100'}`}>
                <strong>Large Text</strong><br/>
                WCAG AA (3.0:1)<br/>
                {contrastRatio >= 3 ? 'Pass' : 'Fail'}
              </div>
               <div className={`p-4 border-2 border-black ${contrastRatio >= 4.5 ? 'bg-green-100' : 'bg-red-100'}`}>
                <strong>Large Text</strong><br/>
                WCAG AAA (4.5:1)<br/>
                {contrastRatio >= 4.5 ? 'Pass' : 'Fail'}
              </div>
            </div>
         </div>
      </div>
    </div>
  );
}