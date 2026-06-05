"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function ParseUrl() {
  const [url, setUrl] = useState('');
  const [parsedUrl, setParsedUrl] = useState<URL | null>(null);
  const [error, setError] = useState('');

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    try {
      const parsed = new URL(value);
      setParsedUrl(parsed);
      setError('');
        } catch {
      setParsedUrl(null);
      if (value) setError('Invalid URL');
      else setError('');
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl flex items-center gap-3">
          <i className="nes-icon star is-medium"></i>
          URL Parser
        </h2>
        <Link href="/" className="nes-btn">Back</Link>
      </div>

      <div className="nes-container with-title is-rounded bg-white">
        <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>Input URL</h3>
        <div className="nes-field">
          <input
            type="text"
            className={`nes-input ${error ? 'is-error' : ''}`}
            placeholder="https://example.com/path?query=1"
            value={url}
            onChange={handleUrlChange}
          />
          {error && <span className="nes-text is-error text-xs mt-1 block">{error}</span>}
        </div>
      </div>

      {parsedUrl && (
        <div className="nes-container with-title is-rounded bg-white">
          <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>Parsed Details</h3>
          <div className="nes-table-responsive">
            <table className="nes-table is-bordered is-centered w-full">
              <tbody>
                <tr>
                  <td>Protocol</td>
                  <td>{parsedUrl.protocol}</td>
                </tr>
                <tr>
                  <td>Hostname</td>
                  <td>{parsedUrl.hostname}</td>
                </tr>
                <tr>
                  <td>Port</td>
                  <td>{parsedUrl.port || '(default)'}</td>
                </tr>
                <tr>
                  <td>Pathname</td>
                  <td>{parsedUrl.pathname}</td>
                </tr>
                <tr>
                  <td>Search (Query)</td>
                  <td>{parsedUrl.search || '(none)'}</td>
                </tr>
                <tr>
                  <td>Hash</td>
                  <td>{parsedUrl.hash || '(none)'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {parsedUrl && parsedUrl.searchParams.toString() && (
        <div className="nes-container with-title is-rounded bg-white">
          <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>Query Parameters</h3>
          <div className="nes-table-responsive">
            <table className="nes-table is-bordered is-centered w-full">
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {Array.from(parsedUrl.searchParams.entries()).map(([key, value], i) => (
                  <tr key={i}>
                    <td>{key}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
