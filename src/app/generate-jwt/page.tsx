'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function JwtGenerator() {
  const [header, setHeader] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}');
  const [payload, setPayload] = useState('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022\n}');
  const [secret, setSecret] = useState('your-256-bit-secret');
  const [jwt, setJwt] = useState('');
  const [error, setError] = useState('');
  const [copyStatus, setCopyStatus] = useState<'copied' | null>(null);

  const base64UrlEncode = (str: string) => {
    return btoa(unescape(encodeURIComponent(str)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  };

  const generateJwt = async () => {
    try {
      const parsedHeader = JSON.parse(header);
      const parsedPayload = JSON.parse(payload);

      if (parsedHeader.alg !== 'HS256') {
         setError('Currently only HS256 is supported.');
         setJwt('');
         return;
      }
      setError('');

      const encodedHeader = base64UrlEncode(JSON.stringify(parsedHeader));
      const encodedPayload = base64UrlEncode(JSON.stringify(parsedPayload));
      const dataToSign = `${encodedHeader}.${encodedPayload}`;

      const enc = new TextEncoder();
      const algorithm = { name: 'HMAC', hash: 'SHA-256' };
      const key = await window.crypto.subtle.importKey(
        'raw',
        enc.encode(secret),
        algorithm,
        false,
        ['sign']
      );

      const signature = await window.crypto.subtle.sign(algorithm.name, key, enc.encode(dataToSign));
      const signatureStr = Array.from(new Uint8Array(signature))
        .map(b => String.fromCharCode(b))
        .join('');

      const encodedSignature = btoa(signatureStr)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

      setJwt(`${dataToSign}.${encodedSignature}`);
    } catch (err: any) {
      setError(err.name === 'SyntaxError' ? 'Invalid JSON format in Header or Payload.' : 'Error generating JWT.');
      setJwt('');
    }
  };

  useEffect(() => {
    generateJwt();
  }, [header, payload, secret]);

  const handleCopy = () => {
    if (!jwt) return;
    navigator.clipboard.writeText(jwt).catch(() => {});
    setCopyStatus('copied');
    setTimeout(() => setCopyStatus(null), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Link href="/" className="nes-btn is-primary">
          &larr; Back to Tools
        </Link>
      </div>

      <div className="nes-container with-title is-centered mb-8">
        <p className="title">JWT Generator</p>
        <p className="mb-4">Generate and sign JSON Web Tokens (HS256) locally in your browser.</p>

        {error && (
          <div className="nes-text is-error mb-4">{error}</div>
        )}

        <div className="flex flex-col gap-6 text-left">
          <div className="nes-field">
            <label htmlFor="header">Header (JSON)</label>
            <textarea
              id="header"
              className="nes-textarea font-mono h-32"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
            />
          </div>

          <div className="nes-field">
            <label htmlFor="payload">Payload (JSON)</label>
            <textarea
              id="payload"
              className="nes-textarea font-mono h-48"
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
            />
          </div>

          <div className="nes-field">
            <label htmlFor="secret">Secret Key</label>
            <input
              type="text"
              id="secret"
              className="nes-input"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
            />
          </div>

          <div className="nes-field">
            <label htmlFor="jwt">Generated JWT</label>
            <textarea
              id="jwt"
              className="nes-textarea font-mono h-32 bg-gray-100"
              value={jwt}
              readOnly
            />
            <button
              className={`nes-btn w-full mt-4 ${copyStatus === 'copied' ? 'is-success' : 'is-primary'}`}
              onClick={handleCopy}
              disabled={!jwt}
            >
              {copyStatus === 'copied' ? 'Copied!' : 'Copy JWT'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}