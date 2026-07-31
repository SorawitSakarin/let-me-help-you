'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function CssFilterGenerator() {
  const [blur, setBlur] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [grayscale, setGrayscale] = useState(0);
  const [hueRotate, setHueRotate] = useState(0);
  const [invert, setInvert] = useState(0);
  const [opacity, setOpacity] = useState(100);
  const [saturate, setSaturate] = useState(100);
  const [sepia, setSepia] = useState(0);

  const filterString = `blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) hue-rotate(${hueRotate}deg) invert(${invert}%) opacity(${opacity}%) saturate(${saturate}%) sepia(${sepia}%)`;

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`filter: ${filterString};`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const handleReset = () => {
    setBlur(0);
    setBrightness(100);
    setContrast(100);
    setGrayscale(0);
    setHueRotate(0);
    setInvert(0);
    setOpacity(100);
    setSaturate(100);
    setSepia(0);
  };

  return (
    <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto w-full">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">&lt; Back to Home</Link>
      </div>

      <div className="nes-container with-title is-centered w-full">
        <h2 className="title flex items-center justify-center gap-3">
          <i className="nes-icon star is-medium"></i>
          CSS Filter Generator
        </h2>
        <p className="mb-8">Create and preview CSS filters for images easily.</p>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 flex flex-col gap-4">
            <div className="nes-field text-left">
              <label htmlFor="blur" className="text-sm">Blur: {blur}px</label>
              <input type="range" id="blur" min="0" max="20" value={blur} onChange={(e) => setBlur(parseInt(e.target.value))} style={{ width: '100%' }} />
            </div>
            <div className="nes-field text-left">
              <label htmlFor="brightness" className="text-sm">Brightness: {brightness}%</label>
              <input type="range" id="brightness" min="0" max="200" value={brightness} onChange={(e) => setBrightness(parseInt(e.target.value))} style={{ width: '100%' }} />
            </div>
            <div className="nes-field text-left">
              <label htmlFor="contrast" className="text-sm">Contrast: {contrast}%</label>
              <input type="range" id="contrast" min="0" max="200" value={contrast} onChange={(e) => setContrast(parseInt(e.target.value))} style={{ width: '100%' }} />
            </div>
            <div className="nes-field text-left">
              <label htmlFor="grayscale" className="text-sm">Grayscale: {grayscale}%</label>
              <input type="range" id="grayscale" min="0" max="100" value={grayscale} onChange={(e) => setGrayscale(parseInt(e.target.value))} style={{ width: '100%' }} />
            </div>
            <div className="nes-field text-left">
              <label htmlFor="hueRotate" className="text-sm">Hue Rotate: {hueRotate}deg</label>
              <input type="range" id="hueRotate" min="0" max="360" value={hueRotate} onChange={(e) => setHueRotate(parseInt(e.target.value))} style={{ width: '100%' }} />
            </div>
            <div className="nes-field text-left">
              <label htmlFor="invert" className="text-sm">Invert: {invert}%</label>
              <input type="range" id="invert" min="0" max="100" value={invert} onChange={(e) => setInvert(parseInt(e.target.value))} style={{ width: '100%' }} />
            </div>
            <div className="nes-field text-left">
              <label htmlFor="opacity" className="text-sm">Opacity: {opacity}%</label>
              <input type="range" id="opacity" min="0" max="100" value={opacity} onChange={(e) => setOpacity(parseInt(e.target.value))} style={{ width: '100%' }} />
            </div>
            <div className="nes-field text-left">
              <label htmlFor="saturate" className="text-sm">Saturate: {saturate}%</label>
              <input type="range" id="saturate" min="0" max="200" value={saturate} onChange={(e) => setSaturate(parseInt(e.target.value))} style={{ width: '100%' }} />
            </div>
            <div className="nes-field text-left">
              <label htmlFor="sepia" className="text-sm">Sepia: {sepia}%</label>
              <input type="range" id="sepia" min="0" max="100" value={sepia} onChange={(e) => setSepia(parseInt(e.target.value))} style={{ width: '100%' }} />
            </div>

            <div className="flex justify-center mt-4">
              <button type="button" className="nes-btn is-error" onClick={handleReset}>Reset</button>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <div className="nes-field flex-1 flex flex-col items-center justify-center text-left">
              <label className="w-full text-sm">Preview</label>
              <div
                style={{
                  width: '100%',
                  height: '300px',
                  backgroundImage: 'url("https://picsum.photos/400/300")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: filterString,
                  border: '4px solid black',
                }}
              />
            </div>

            <div className="nes-field text-left mt-4">
              <label htmlFor="output_field" className="text-sm">CSS Output</label>
              <textarea
                id="output_field"
                className="nes-textarea text-sm"
                rows={3}
                readOnly
                value={`filter: ${filterString};`}
              />
            </div>

            <div className="flex justify-center mt-2">
              <button
                type="button"
                className={`nes-btn ${copied ? 'is-success' : 'is-primary'}`}
                onClick={handleCopy}
              >
                {copied ? 'Copied!' : 'Copy CSS'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
