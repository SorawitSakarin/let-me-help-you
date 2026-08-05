"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function PixelToRemConverterPage() {
  const [baseSize, setBaseSize] = useState("16");
  const [pixels, setPixels] = useState("");
  const [rem, setRem] = useState("");

  const handlePixelsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPixels(val);
    const numBase = parseFloat(baseSize) || 16;
    const numPx = parseFloat(val);
    if (!isNaN(numPx)) {
      setRem((numPx / numBase).toString());
    } else {
      setRem("");
    }
  };

  const handleRemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setRem(val);
    const numBase = parseFloat(baseSize) || 16;
    const numRem = parseFloat(val);
    if (!isNaN(numRem)) {
      setPixels((numRem * numBase).toString());
    } else {
      setPixels("");
    }
  };

  const handleBaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setBaseSize(val);
    const numBase = parseFloat(val);
    if (!isNaN(numBase) && numBase > 0 && pixels) {
      const numPx = parseFloat(pixels);
      setRem((numPx / numBase).toString());
    }
  };

  const handleClear = () => {
    setPixels("");
    setRem("");
    setBaseSize("16");
  };

  return (
    <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto p-4">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>

      <div className="nes-container with-title is-centered w-full">
        <h2 className="title">Pixel to REM Converter</h2>
        <p className="mb-8">Convert between Pixels and REM units easily based on the root font size.</p>

        <div className="flex flex-col gap-6">
          <div className="nes-field text-left">
            <label htmlFor="base_size_field">Base Font Size (px)</label>
            <input
              type="number"
              id="base_size_field"
              className="nes-input"
              value={baseSize}
              onChange={handleBaseChange}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="nes-field flex-1 text-left">
              <label htmlFor="pixels_field">Pixels</label>
              <input
                type="number"
                id="pixels_field"
                className="nes-input"
                value={pixels}
                onChange={handlePixelsChange}
                placeholder="px"
              />
            </div>

            <div className="nes-field flex-1 text-left">
              <label htmlFor="rem_field">REM</label>
              <input
                type="number"
                id="rem_field"
                className="nes-input"
                value={rem}
                onChange={handleRemChange}
                placeholder="rem"
              />
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <button type="button" className="nes-btn is-warning" onClick={handleClear}>
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}