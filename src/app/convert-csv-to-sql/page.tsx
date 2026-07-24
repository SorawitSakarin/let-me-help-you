"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function CsvToSqlPage() {
  const [inputText, setInputText] = useState("");
  const [tableName, setTableName] = useState("my_table");
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
      if (headers.length === 0) return;

      let sql = "";
      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(",").map(c => c.trim().replace(/'/g, "''"));
        if (row.length !== headers.length) continue; // Skip malformed rows

        sql += `INSERT INTO ${tableName} (${headers.join(", ")}) VALUES ('${row.join("', '")}');\n`;
      }

      if (!sql) {
        throw new Error("No valid data rows found to convert.");
      }

      setOutputText(sql);
      setError("");
      setCopied(false);
    } catch (err: any) {
      setError(err.message || "Failed to parse CSV. Please check your input format.");
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
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl flex items-center gap-3">
          <i className="nes-icon star is-medium"></i>
          CSV to SQL
        </h2>
        <Link href="/" className="nes-btn">Back</Link>
      </div>
      <p className="mb-8">Convert CSV data into SQL INSERT statements easily.</p>

      <div className="nes-container with-title is-centered mb-8">
        <p className="title">Input (CSV)</p>
        <div className="nes-field mb-4">
          <label htmlFor="tableName">Table Name</label>
          <input
            type="text"
            id="tableName"
            className="nes-input"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
          />
        </div>
        <div className="nes-field">
          <textarea
            className="nes-textarea"
            rows={6}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={"id,name,age\n1,John,30\n2,Jane,25"}
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
        <p className="title">Output (SQL)</p>
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