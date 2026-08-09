"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function CsvToHtmlPage() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleConvert = () => {
    if (!inputText.trim()) {
      setOutputText("");
      setError("");
      return;
    }
    try {
      const lines = inputText.trim().split(/\r?\n/);
      if (lines.length === 0) return;

      const headers = lines[0].split(",").map(h => h.trim());
      let html = "<table>\n  <thead>\n    <tr>\n";
      headers.forEach(h => {
        html += `      <th>${h}</th>\n`;
      });
      html += "    </tr>\n  </thead>\n  <tbody>\n";

      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(",").map(c => c.trim());
        html += "    <tr>\n";
        row.forEach(c => {
           html += `      <td>${c}</td>\n`;
        });
        html += "    </tr>\n";
      }

      html += "  </tbody>\n</table>";

      setOutputText(html);
      setError("");
      setCopied(false);
    } catch (err) {
      setError("Failed to parse CSV. Please check your input format.");
      console.error(err);
    }
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
    setError("");
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
      <h2 className="title mb-6">CSV to HTML Converter</h2>
      <p className="mb-8">Convert CSV data into an HTML table easily.</p>

      <div className="nes-container with-title is-centered mb-8">
        <p className="title">Input (CSV)</p>
        <div className="nes-field">
          <textarea
            className="nes-textarea"
            rows={6}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="column1,column2\nvalue1,value2"
          />
        </div>
        <div className="flex gap-4 justify-center mt-4 flex-wrap">
          <button
            type="button"
            className="nes-btn is-primary text-xs sm:text-sm"
            onClick={handleConvert}
          >
            Convert
          </button>
          <button
            type="button"
            className="nes-btn is-warning text-xs sm:text-sm"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
        {error && (
          <div className="nes-text is-error text-center mt-4">
            {error}
          </div>
        )}
      </div>

      <div className="nes-container with-title is-centered">
        <p className="title">Output (HTML Table)</p>
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