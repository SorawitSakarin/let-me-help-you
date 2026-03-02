"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function TextCaseConverter() {
  const [inputText, setInputText] = useState('');

  const handleCaseChange = (type: string) => {
    switch (type) {
      case 'upper':
        setInputText(inputText.toUpperCase());
        break;
      case 'lower':
        setInputText(inputText.toLowerCase());
        break;
      case 'title':
        setInputText(
          inputText.replace(
            /\w\S*/g,
            (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
          )
        );
        break;
      case 'camel':
        {
          const words = inputText.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) || [];
          setInputText(
            words.map((word, i) => i === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('')
          );
        }
        break;
      case 'snake':
        setInputText(
          inputText
            .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            ?.map(x => x.toLowerCase())
            .join('_') || ''
        );
        break;
      case 'kebab':
        setInputText(
          inputText
            .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            ?.map(x => x.toLowerCase())
            .join('-') || ''
        );
        break;
      case 'pascal':
        {
          const words = inputText.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) || [];
          setInputText(
            words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('')
          );
        }
        break;
      default:
        break;
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inputText);
      alert('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  const handleClear = () => {
    setInputText('');
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl flex items-center gap-3">
          <i className="nes-icon star is-medium"></i>
          Text Case Converter
        </h2>
        <Link href="/" className="nes-btn">Back</Link>
      </div>

      {/* Input Area */}
      <div className="nes-container with-title is-rounded bg-white">
        <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>Input Text</h3>
        <textarea
          className="nes-textarea w-full"
          rows={8}
          placeholder="Enter text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          aria-label="Input Text"
        />
      </div>

      {/* Conversion Actions */}
      <div className="nes-container with-title is-rounded bg-white">
        <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>Convert Case</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button type="button" className="nes-btn is-primary" onClick={() => handleCaseChange('upper')}>UPPERCASE</button>
          <button type="button" className="nes-btn is-primary" onClick={() => handleCaseChange('lower')}>lowercase</button>
          <button type="button" className="nes-btn is-primary" onClick={() => handleCaseChange('title')}>Title Case</button>
          <button type="button" className="nes-btn is-primary" onClick={() => handleCaseChange('camel')}>camelCase</button>
          <button type="button" className="nes-btn is-primary" onClick={() => handleCaseChange('snake')}>snake_case</button>
          <button type="button" className="nes-btn is-primary" onClick={() => handleCaseChange('kebab')}>kebab-case</button>
          <button type="button" className="nes-btn is-primary" onClick={() => handleCaseChange('pascal')}>PascalCase</button>
        </div>
      </div>

      {/* Utility Actions */}
      <div className="flex gap-4 justify-end">
        <button type="button" className="nes-btn is-error" onClick={handleClear}>Clear</button>
        <button type="button" className="nes-btn is-success" onClick={handleCopy}>Copy</button>
      </div>
    </div>
  );
}
