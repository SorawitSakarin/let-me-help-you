"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function JsonToTypescriptPage() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const jsonToTs = (jsonObj: any, rootName = "Root"): string => {
    const interfaces: string[] = [];

    const parseObject = (obj: any, name: string): string => {
      if (obj === null) return "any";
      if (Array.isArray(obj)) {
        if (obj.length > 0) {
          return `${parseObject(obj[0], name + "Item")}[]`;
        }
        return "any[]";
      }
      if (typeof obj === "object") {
        let iface = `export interface ${name} {\n`;
        for (const key in obj) {
          const val = obj[key];
          const typeName = typeof val === "object" && val !== null ? name + key.charAt(0).toUpperCase() + key.slice(1) : "";
          const type = parseObject(val, typeName);
          iface += `  ${key}: ${type};\n`;
        }
        iface += "}\n";
        interfaces.push(iface);
        return name;
      }
      return typeof obj;
    };

    try {
        const type = parseObject(jsonObj, rootName);
        if (interfaces.length === 0) {
            return `type ${rootName} = ${type};`;
        }
        return interfaces.reverse().join("\n");
    } catch (e) {
        return "";
    }
  };

  const handleConvert = () => {
    setError("");
    setCopied(false);
    if (!inputText.trim()) {
      setOutputText("");
      return;
    }
    try {
      const parsed = JSON.parse(inputText);
      const ts = jsonToTs(parsed, "RootObject");
      setOutputText(ts);
    } catch (e: any) {
      setError("Invalid JSON: " + e.message);
      setOutputText("");
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
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto p-4">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>
      <div className="nes-container with-title w-full">
        <h2 className="title flex items-center gap-3">
            <i className="nes-icon star is-medium"></i>
            JSON to TS
        </h2>

        <div className="mb-6">
            <p className="mb-4">Convert JSON objects to TypeScript interfaces instantly.</p>
            <p className="title text-sm bg-white">Input JSON</p>
            <textarea
                className="nes-textarea w-full min-h-[300px]"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder='{"key": "value"}'
                spellCheck={false}
            />
            {error && (
              <span className="nes-text is-error text-xs block mt-2 break-all">{error}</span>
            )}
        </div>

        <div className="flex gap-4 mb-8">
          <button
            type="button"
            className="nes-btn is-primary"
            onClick={handleConvert}
          >
            Convert
          </button>
          <button type="button" className="nes-btn is-warning" onClick={handleClear}>
            Clear
          </button>
        </div>

        <div className="nes-container with-title w-full bg-gray-50">
            <p className="title text-sm bg-gray-50">TypeScript Interfaces</p>
            <div className="nes-field mb-4">
            <textarea className="nes-textarea w-full min-h-[300px] bg-gray-50" value={outputText} readOnly spellCheck={false} />
            </div>
            <button
            type="button"
            className={`nes-btn ${copied ? "is-success" : "is-primary"}`}
            onClick={copyToClipboard}
            disabled={!outputText}
            >
            {copied ? "Copied!" : "Copy Result"}
            </button>
        </div>
      </div>
    </div>
  );
}
