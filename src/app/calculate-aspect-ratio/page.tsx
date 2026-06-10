'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AspectRatioCalculator() {
  const [origW, setOrigW] = useState<string>('1920');
  const [origH, setOrigH] = useState<string>('1080');
  const [newW, setNewW] = useState<string>('1280');
  const [newH, setNewH] = useState<string>('720');

  useEffect(() => {
    calculateNewHeight(newW);
  }, [origW, origH]);

  const calculateNewHeight = (w: string) => {
    const ow = parseFloat(origW);
    const oh = parseFloat(origH);
    const nw = parseFloat(w);
    if (ow > 0 && oh > 0 && nw > 0) {
      setNewH(Math.round((nw * oh) / ow).toString());
    } else {
      setNewH('');
    }
  };

  const calculateNewWidth = (h: string) => {
    const ow = parseFloat(origW);
    const oh = parseFloat(origH);
    const nh = parseFloat(h);
    if (ow > 0 && oh > 0 && nh > 0) {
      setNewW(Math.round((nh * ow) / oh).toString());
    } else {
      setNewW('');
    }
  };

  const handleOrigWChange = (e: React.ChangeEvent<HTMLInputElement>) => setOrigW(e.target.value);
  const handleOrigHChange = (e: React.ChangeEvent<HTMLInputElement>) => setOrigH(e.target.value);

  const handleNewWChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewW(e.target.value);
    calculateNewHeight(e.target.value);
  };

  const handleNewHChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewH(e.target.value);
    calculateNewWidth(e.target.value);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl flex items-center gap-3">
          <i className="nes-icon star is-medium"></i>
          Aspect Ratio
        </h2>
        <Link href="/" className="nes-btn">Back</Link>
      </div>

      <div className="nes-container with-title is-rounded bg-white">
        <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>Original Size</h3>
        <div className="flex gap-4">
          <div className="nes-field w-full">
            <label htmlFor="orig_w">Width (px)</label>
            <input type="number" id="orig_w" className="nes-input" value={origW} onChange={handleOrigWChange} />
          </div>
          <div className="nes-field w-full">
            <label htmlFor="orig_h">Height (px)</label>
            <input type="number" id="orig_h" className="nes-input" value={origH} onChange={handleOrigHChange} />
          </div>
        </div>
      </div>

      <div className="nes-container with-title is-rounded bg-white">
        <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>New Size</h3>
        <div className="flex gap-4">
          <div className="nes-field w-full">
            <label htmlFor="new_w">Width (px)</label>
            <input type="number" id="new_w" className="nes-input" value={newW} onChange={handleNewWChange} />
          </div>
          <div className="nes-field w-full">
            <label htmlFor="new_h">Height (px)</label>
            <input type="number" id="new_h" className="nes-input" value={newH} onChange={handleNewHChange} />
          </div>
        </div>
      </div>
    </div>
  );
}
