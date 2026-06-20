"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ConvertCsvToJson() {
  const [csvInput, setCsvInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleConvert = () => {
    setError("");
    setJsonOutput("");
    setCopied(false);

    if (!csvInput.trim()) {
      setError("Please enter some CSV data.");
      return;
    }

    try {
      const lines = csvInput.trim().split("\n");
      if (lines.length < 2) {
         setError("CSV must contain headers and at least one row of data.");
         return;
      }
      const headers = lines[0].split(",").map((h) => h.trim());
      const result = [];

      for (let i = 1; i < lines.length; i++) {
        const obj: Record<string, string> = {};
        const currentline = lines[i].split(",");

        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j] ? currentline[j].trim() : "";
        }
        result.push(obj);
      }

      setJsonOutput(JSON.stringify(result, null, 2));
    } catch (e) {
      setError("Failed to parse CSV.");
    }
  };

  const handleCopy = () => {
    if (!jsonOutput) return;
    navigator.clipboard.writeText(jsonOutput).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleClear = () => {
    setCsvInput("");
    setJsonOutput("");
    setError("");
    setCopied(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl flex items-center gap-3">
          <i className="nes-icon star is-medium"></i>
          CSV to JSON Converter
        </h2>
        <Link href="/" className="nes-btn">Back</Link>
      </div>

      <div className="nes-container with-title is-rounded bg-white">
        <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>Input CSV</h3>
        <textarea
          className="nes-textarea w-full"
          rows={8}
          value={csvInput}
          onChange={(e) => setCsvInput(e.target.value)}
          placeholder="id,name,age\n1,John,30\n2,Jane,25"
        ></textarea>
      </div>

      {error && <p className="nes-text is-error text-center">{error}</p>}

      <div className="flex gap-4 justify-center mt-4">
        <button type="button" className="nes-btn is-primary" onClick={handleConvert}>Convert</button>
        <button type="button" className="nes-btn" onClick={handleClear}>Clear</button>
      </div>

      {jsonOutput && (
        <div className="nes-container with-title is-rounded bg-white">
          <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>Output JSON</h3>
          <textarea
            className="nes-textarea w-full bg-white"
            rows={12}
            value={jsonOutput}
            readOnly
          ></textarea>
          <div className="flex gap-4 justify-center mt-4">
            <button type="button" className={`nes-btn ${copied ? "is-success" : ""}`} onClick={handleCopy}>
              {copied ? "Copied!" : "Copy to Clipboard"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}