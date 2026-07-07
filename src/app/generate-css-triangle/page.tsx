'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

type Direction = 'top' | 'right' | 'bottom' | 'left' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export default function CSSTriangleGenerator() {
  const [direction, setDirection] = useState<Direction>('top');
  const [color, setColor] = useState('#000000');
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);

  const cssCode = useMemo(() => {
    let borderCode = '';
    const w = width / 2;
    const h = height / 2;

    switch (direction) {
      case 'top':
        borderCode = `border-left: ${w}px solid transparent;\n  border-right: ${w}px solid transparent;\n  border-bottom: ${height}px solid ${color};`;
        break;
      case 'right':
        borderCode = `border-top: ${h}px solid transparent;\n  border-bottom: ${h}px solid transparent;\n  border-left: ${width}px solid ${color};`;
        break;
      case 'bottom':
        borderCode = `border-left: ${w}px solid transparent;\n  border-right: ${w}px solid transparent;\n  border-top: ${height}px solid ${color};`;
        break;
      case 'left':
        borderCode = `border-top: ${h}px solid transparent;\n  border-bottom: ${h}px solid transparent;\n  border-right: ${width}px solid ${color};`;
        break;
      case 'top-left':
        borderCode = `border-top: ${height}px solid ${color};\n  border-right: ${width}px solid transparent;`;
        break;
      case 'top-right':
        borderCode = `border-top: ${height}px solid ${color};\n  border-left: ${width}px solid transparent;`;
        break;
      case 'bottom-left':
        borderCode = `border-bottom: ${height}px solid ${color};\n  border-right: ${width}px solid transparent;`;
        break;
      case 'bottom-right':
        borderCode = `border-bottom: ${height}px solid ${color};\n  border-left: ${width}px solid transparent;`;
        break;
    }

    return `.triangle {\n  width: 0;\n  height: 0;\n  ${borderCode}\n}`;
  }, [direction, color, width, height]);

  const previewStyle = useMemo(() => {
    let borderCode = {};
    const w = width / 2;
    const h = height / 2;

    switch (direction) {
      case 'top':
        borderCode = { borderLeft: `${w}px solid transparent`, borderRight: `${w}px solid transparent`, borderBottom: `${height}px solid ${color}` };
        break;
      case 'right':
        borderCode = { borderTop: `${h}px solid transparent`, borderBottom: `${h}px solid transparent`, borderLeft: `${width}px solid ${color}` };
        break;
      case 'bottom':
        borderCode = { borderLeft: `${w}px solid transparent`, borderRight: `${w}px solid transparent`, borderTop: `${height}px solid ${color}` };
        break;
      case 'left':
        borderCode = { borderTop: `${h}px solid transparent`, borderBottom: `${h}px solid transparent`, borderRight: `${width}px solid ${color}` };
        break;
      case 'top-left':
        borderCode = { borderTop: `${height}px solid ${color}`, borderRight: `${width}px solid transparent` };
        break;
      case 'top-right':
        borderCode = { borderTop: `${height}px solid ${color}`, borderLeft: `${width}px solid transparent` };
        break;
      case 'bottom-left':
        borderCode = { borderBottom: `${height}px solid ${color}`, borderRight: `${width}px solid transparent` };
        break;
      case 'bottom-right':
        borderCode = { borderBottom: `${height}px solid ${color}`, borderLeft: `${width}px solid transparent` };
        break;
    }

    return {
      width: 0,
      height: 0,
      ...borderCode
    };
  }, [direction, color, width, height]);

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode).catch(console.error);
  };

  const directions: {label: string, value: Direction}[] = [
    { label: 'Top', value: 'top' },
    { label: 'Right', value: 'right' },
    { label: 'Bottom', value: 'bottom' },
    { label: 'Left', value: 'left' },
    { label: 'Top Left', value: 'top-left' },
    { label: 'Top Right', value: 'top-right' },
    { label: 'Bottom Left', value: 'bottom-left' },
    { label: 'Bottom Right', value: 'bottom-right' },
  ];

  return (
    <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>

      <div className="nes-container with-title is-centered w-full">
        <h2 className="title">CSS Triangle Generator</h2>
        <p className="mb-8">Generate CSS to create shapes using borders.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4 text-left">
            <div className="field">
              <label htmlFor="direction_select">Direction</label>
              <div className="nes-select">
                <select
                  required
                  id="direction_select"
                  value={direction}
                  onChange={(e) => setDirection(e.target.value as Direction)}
                >
                  {directions.map(dir => (
                    <option key={dir.value} value={dir.value}>{dir.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field">
              <label htmlFor="width_input">Width (px)</label>
              <input
                type="number"
                id="width_input"
                className="nes-input"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                min="0"
              />
            </div>

            <div className="field">
              <label htmlFor="height_input">Height (px)</label>
              <input
                type="number"
                id="height_input"
                className="nes-input"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                min="0"
              />
            </div>

            <div className="field">
              <label htmlFor="color_input">Color</label>
              <input
                type="color"
                id="color_input"
                className="nes-input h-[50px] p-1 cursor-pointer"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="nes-container is-rounded flex justify-center items-center min-h-[250px] bg-gray-100 dark:bg-gray-800">
               <div style={previewStyle}></div>
            </div>
            <div className="field relative text-left">
                <label>CSS Code</label>
                <textarea
                  className="nes-textarea text-sm"
                  readOnly
                  rows={6}
                  value={cssCode}
                />
                 <button
                  type="button"
                  className="nes-btn is-primary mt-4 w-full"
                  onClick={handleCopy}
                >
                  Copy CSS
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
