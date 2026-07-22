'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HtmlTableGenerator() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [output, setOutput] = useState('');
  const [copyStatus, setCopyStatus] = useState<'copied' | null>(null);

  const handleGenerate = () => {
    let html = '<table>\n';
    for (let r = 0; r < rows; r++) {
      html += '  <tr>\n';
      for (let c = 0; c < cols; c++) {
        if (r === 0) {
          html += '    <th>Header</th>\n';
        } else {
          html += `    <td>Row ${r} Col ${c + 1}</td>\n`;
        }
      }
      html += '  </tr>\n';
    }
    html += '</table>';
    setOutput(html);
    setCopyStatus(null);
  };

  const handleClear = () => {
    setRows(3);
    setCols(3);
    setOutput('');
    setCopyStatus(null);
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output).catch(err => console.error("Failed to copy:", err));
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus(null), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4 max-w-4xl mx-auto w-full">
      <div className="w-full flex justify-start">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>

      <div className="nes-container with-title is-centered w-full">
        <h3 className="title">HTML Table Generator</h3>

        <p className="mb-6 text-sm">Generate simple HTML table structures quickly.</p>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="field">
              <label htmlFor="rows_field">Rows (including header)</label>
              <input
                type="number"
                id="rows_field"
                className="nes-input w-32"
                value={rows}
                onChange={(e) => setRows(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
              />
            </div>
            <div className="field">
              <label htmlFor="cols_field">Columns</label>
              <input
                type="number"
                id="cols_field"
                className="nes-input w-32"
                value={cols}
                onChange={(e) => setCols(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
              />
            </div>
          </div>

          <div className="flex gap-4 justify-center mt-4">
            <button type="button" className="nes-btn is-primary" onClick={handleGenerate}>Generate</button>
            <button type="button" className="nes-btn is-error" onClick={handleClear}>Clear</button>
          </div>
        </div>

        {output && (
          <div className="mt-8">
            <h4 className="mb-2">Output Code</h4>
            <div className="relative">
              <textarea
                className="nes-textarea w-full h-64 bg-gray-50 font-mono text-sm"
                value={output}
                readOnly
                spellCheck={false}
              ></textarea>
            </div>
            <div className="flex justify-end mt-4">
               <button
                type="button"
                className={`nes-btn ${copyStatus === 'copied' ? 'is-success' : ''}`}
                onClick={handleCopy}
               >
                 {copyStatus === 'copied' ? 'Copied!' : 'Copy Code'}
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}