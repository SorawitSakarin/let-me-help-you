'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

export default function ImageToBase64() {
  const [base64, setBase64] = useState('');
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setBase64(reader.result);
        setCopied(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const copyToClipboard = () => {
    if (!base64) return;
    navigator.clipboard.writeText(base64);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearData = () => {
    setBase64('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto">
      <Link href="/" className="nes-btn">
        &lt; Back to Home
      </Link>

      <div className="nes-container with-title is-centered w-full">
        <h3 className="title">Image to Base64</h3>

        <div className="flex flex-col gap-6 p-4">
          <div className="nes-field text-left">
            <label htmlFor="file_upload">Upload Image</label>
            <input
              type="file"
              id="file_upload"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
            />
          </div>

          {base64 && (
            <>
              <div className="nes-container is-rounded text-center">
                <p>Preview</p>
                <img src={base64} alt="Uploaded preview" className="max-w-full max-h-64 object-contain mx-auto border-4 border-black" />
              </div>

              <div className="nes-field text-left">
                <label htmlFor="base64_output">Base64 Output</label>
                <textarea
                  id="base64_output"
                  className="nes-textarea"
                  value={base64}
                  readOnly
                  rows={5}
                />
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  type="button"
                  className={`nes-btn ${copied ? 'is-success' : 'is-primary'}`}
                  onClick={copyToClipboard}
                >
                  {copied ? 'Copied!' : 'Copy Base64'}
                </button>
                <button
                  type="button"
                  className="nes-btn is-error"
                  onClick={clearData}
                >
                  Clear
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}