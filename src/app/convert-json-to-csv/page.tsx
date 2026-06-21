"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ConvertJsonToCsv() {
  const [jsonInput, setJsonInput] = useState("");
  const [csvOutput, setCsvOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleConvert = () => {
    setError("");
    setCsvOutput("");
    setCopied(false);

    if (!jsonInput.trim()) {
      setError("Please enter some JSON data.");
      return;
    }

    try {
      const parsedJson = JSON.parse(jsonInput);
      const arrayData = Array.isArray(parsedJson) ? parsedJson : [parsedJson];

      if (arrayData.length === 0) {
        setError("JSON array is empty.");
        return;
      }

      const headers = Object.keys(arrayData[0]);
      const csvRows = [];
      csvRows.push(headers.join(","));

      for (const row of arrayData) {
        const values = headers.map((header) => {
          const value = row[header] ?? "";
          const stringValue = typeof value === "object" ? JSON.stringify(value) : String(value);
          // Escape quotes and wrap in quotes if contains comma
          if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
              return `"${stringValue.replace(/"/g, '""')}"`;
          }
          return stringValue;
        });
        csvRows.push(values.join(","));
      }

      setCsvOutput(csvRows.join("\n"));
    } catch (e) {
      setError("Failed to parse JSON.");
    }
  };

  const handleCopy = () => {
    if (!csvOutput) return;
    navigator.clipboard.writeText(csvOutput).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleClear = () => {
    setJsonInput("");
    setCsvOutput("");
    setError("");
    setCopied(false);
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="title mb-0">JSON to CSV Converter</h2>
        <Link href="/" className="nes-btn">Back</Link>
      </div>

      <div className="nes-container with-title is-centered mb-8">
        <p className="title">Input JSON</p>
        <textarea
          className="nes-textarea w-full"
          rows={8}
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='[\n  {"id": 1, "name": "John"},\n  {"id": 2, "name": "Jane"}\n]'
        ></textarea>
      </div>

      {error && <p className="nes-text is-error text-center mb-4">{error}</p>}

      <div className="flex gap-4 justify-center mb-8">
        <button type="button" className="nes-btn is-primary" onClick={handleConvert}>Convert</button>
        <button type="button" className="nes-btn" onClick={handleClear}>Clear</button>
      </div>

      {csvOutput && (
        <div className="nes-container with-title is-centered mb-8">
          <p className="title">Output CSV</p>
          <textarea
            className="nes-textarea w-full"
            rows={12}
            value={csvOutput}
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
