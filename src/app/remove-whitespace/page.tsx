"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function WhitespaceCleanerPage() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleRemoveExtraSpaces = () => {
    setOutputText(inputText.replace(/\s+/g, " ").trim());
    setCopied(false);
  };

  const handleRemoveLineBreaks = () => {
    setOutputText(inputText.replace(/[\r\n]+/g, " "));
    setCopied(false);
  };

  const handleRemoveAllWhitespace = () => {
    setOutputText(inputText.replace(/\s+/g, ""));
    setCopied(false);
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText).catch(console.error);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="mb-4">
        <Link href="/" className="nes-btn text-xs">
          &lt; Back to Home
        </Link>
      </div>
      <h2 className="title mb-6">Whitespace Cleaner</h2>
      <p className="mb-8">Quickly clean up and format your text by removing extra spaces, line breaks, or all whitespace.</p>

      <div className="nes-container with-title is-centered mb-8">
        <p className="title">Input</p>
        <div className="nes-field">
          <textarea
            className="nes-textarea"
            rows={6}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your messy text here..."
          />
        </div>
        <div className="flex gap-4 justify-center mt-4 flex-wrap">
          <button
            type="button"
            className="nes-btn is-primary text-xs sm:text-sm"
            onClick={handleRemoveExtraSpaces}
          >
            Remove Extra Spaces
          </button>
          <button
            type="button"
            className="nes-btn is-success text-xs sm:text-sm"
            onClick={handleRemoveLineBreaks}
          >
            Remove Line Breaks
          </button>
          <button
            type="button"
            className="nes-btn is-error text-xs sm:text-sm"
            onClick={handleRemoveAllWhitespace}
          >
            Remove All Whitespace
          </button>
          <button type="button" className="nes-btn is-warning text-xs sm:text-sm" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>

      <div className="nes-container with-title is-centered">
        <p className="title">Output</p>
        <div className="nes-field mb-4">
          <textarea className="nes-textarea" rows={6} value={outputText} readOnly />
        </div>
        <button
          type="button"
          className={`nes-btn ${copied ? "is-success" : "is-primary"} text-xs sm:text-sm`}
          onClick={copyToClipboard}
          disabled={!outputText}
        >
          {copied ? "Copied!" : "Copy Result"}
        </button>
      </div>
    </div>
  );
}