'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function MetaTagGenerator() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [keywords, setKeywords] = useState('');
  const [author, setAuthor] = useState('');
  const [copyMessage, setCopyMessage] = useState('');

  const generatedTags = `
<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}" />
<meta name="description" content="${description}" />
<meta name="keywords" content="${keywords}" />
<meta name="author" content="${author}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:image" content="${imageUrl}" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:title" content="${title}" />
<meta property="twitter:description" content="${description}" />
<meta property="twitter:image" content="${imageUrl}" />
`.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedTags).then(() => {
      setCopyMessage('Copied to clipboard!');
      setTimeout(() => setCopyMessage(''), 2000);
    }).catch((err) => {
      console.error('Failed to copy text: ', err);
      setCopyMessage('Failed to copy');
      setTimeout(() => setCopyMessage(''), 2000);
    });
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl flex items-center gap-3">
          <i className="nes-icon star is-medium"></i>
          Meta Tag Generator
        </h2>
        <Link href="/" className="nes-btn">Back</Link>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="nes-container with-title is-rounded bg-white flex-1">
          <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>Input Data</h3>

          <div className="nes-field text-left mb-4 mt-2">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" className="nes-input" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="nes-field text-left mb-4">
            <label htmlFor="description">Description</label>
            <textarea id="description" className="nes-textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>

          <div className="nes-field text-left mb-4">
            <label htmlFor="imageUrl">Image URL</label>
            <input type="text" id="imageUrl" className="nes-input" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          </div>

          <div className="nes-field text-left mb-4">
            <label htmlFor="keywords">Keywords</label>
            <input type="text" id="keywords" className="nes-input" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
          </div>

          <div className="nes-field text-left">
            <label htmlFor="author">Author</label>
            <input type="text" id="author" className="nes-input" value={author} onChange={(e) => setAuthor(e.target.value)} />
          </div>
        </div>

        <div className="nes-container with-title is-rounded bg-white flex-1 flex flex-col">
          <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>Generated Tags</h3>
          <textarea className="nes-textarea w-full bg-gray-50 flex-grow mt-2 text-xs" readOnly value={generatedTags}></textarea>
          <div className="flex justify-center mt-4">
            <button type="button" className={`nes-btn ${copyMessage ? "is-success" : "is-primary"}`} onClick={handleCopy}>
              {copyMessage || "Copy Tags"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
