"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function ColorConverter() {
  const [hex, setHex] = useState('#000000');
  const [rgb, setRgb] = useState('rgb(0, 0, 0)');

  const hexToRgb = (hex: string) => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex.substring(1, 3), 16);
      g = parseInt(hex.substring(3, 5), 16);
      b = parseInt(hex.substring(5, 7), 16);
    }
    return `rgb(${r}, ${g}, ${b})`;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase();
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHex(value);
    if (/^#([0-9A-F]{3}){1,2}$/i.test(value)) {
      setRgb(hexToRgb(value));
    }
  };

  const handleRgbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRgb(value);
    const match = value.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (match) {
      const r = Math.min(255, parseInt(match[1]));
      const g = Math.min(255, parseInt(match[2]));
      const b = Math.min(255, parseInt(match[3]));
      setHex(rgbToHex(r, g, b));
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl flex items-center gap-3">
          <i className="nes-icon star is-medium"></i>
          Color Converter
        </h2>
        <Link href="/" className="nes-btn">Back</Link>
      </div>

      <div className="nes-container with-title is-rounded bg-white">
        <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>Color Preview</h3>
        <div style={{ backgroundColor: hex, height: '100px', width: '100%', border: '4px solid black' }}></div>
      </div>

      <div className="nes-container with-title is-rounded bg-white">
        <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>Convert</h3>
        <div className="flex flex-col gap-4">
          <div className="nes-field">
            <label htmlFor="hex_field">HEX</label>
            <input type="text" id="hex_field" className="nes-input" value={hex} onChange={handleHexChange} />
          </div>
          <div className="nes-field">
            <label htmlFor="rgb_field">RGB</label>
            <input type="text" id="rgb_field" className="nes-input" value={rgb} onChange={handleRgbChange} />
          </div>
        </div>
      </div>
    </div>
  );
}
