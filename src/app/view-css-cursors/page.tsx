'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const cursors = [
  'alias', 'all-scroll', 'auto', 'cell', 'context-menu', 'col-resize',
  'copy', 'crosshair', 'default', 'e-resize', 'ew-resize', 'grab',
  'grabbing', 'help', 'move', 'n-resize', 'ne-resize', 'nesw-resize',
  'ns-resize', 'nw-resize', 'nwse-resize', 'no-drop', 'none',
  'not-allowed', 'pointer', 'progress', 'row-resize', 's-resize',
  'se-resize', 'sw-resize', 'text', 'vertical-text', 'w-resize',
  'wait', 'zoom-in', 'zoom-out'
];

export default function ViewCssCursors() {
  const [copied, setCopied] = useState('');

  const handleCopy = (cursor: string) => {
    navigator.clipboard.writeText(`cursor: ${cursor};`).then(() => {
      setCopied(cursor);
      setTimeout(() => setCopied(''), 2000);
    }).catch(console.error);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl flex items-center gap-3">
          <i className="nes-icon star is-medium"></i>
          CSS Cursor Viewer
        </h2>
        <Link href="/" className="nes-btn">Back</Link>
      </div>
      <div className="nes-container with-title is-rounded bg-white">
        <p className="title text-sm bg-white mb-4">Hover to view, click to copy</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {cursors.map((cursor) => (
            <div
              key={cursor}
              className={`nes-btn w-full p-2 text-center text-xs break-all ${copied === cursor ? 'is-success' : ''}`}
              style={{ cursor, textTransform: 'none' }}
              onClick={() => handleCopy(cursor)}
              title={`cursor: ${cursor};`}
            >
              {copied === cursor ? 'Copied!' : cursor}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
