"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

interface DiffLine {
  type: "added" | "removed" | "unchanged";
  value: string;
  originalLineNum?: number;
  modifiedLineNum?: number;
}

interface SideBySideRow {
  left?: {
    lineNum?: number;
    value: string;
    type: "unchanged" | "removed";
  };
  right?: {
    lineNum?: number;
    value: string;
    type: "unchanged" | "added";
  };
}

// Preset examples
const EXAMPLES = {
  js: {
    title: "JS Code",
    original: `function calculateTotal(items, taxRate) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total * (1 + taxRate);
}`,
    modified: `// Calculate total price with tax and discount
function calculateTotal(items, taxRate, discount = 0) {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const totalWithTax = subtotal * (1 + taxRate);
  return totalWithTax - discount;
}`,
  },
  config: {
    title: "Config File",
    original: `PORT=3000
DATABASE_URL=mongodb://localhost:27017/dev
ENABLE_ANALYTICS=true
SESSION_SECRET=super_secret_key
MAX_RETRIES=3`,
    modified: `PORT=8080
DATABASE_URL=postgresql://db_user:password@localhost:5432/prod
ENABLE_ANALYTICS=false
SESSION_SECRET=another_super_secret_key
MAX_RETRIES=5
DEBUG_MODE=true`,
  },
  text: {
    title: "Simple Text",
    original: `Let Me Help You
This is a simple, retro-themed utility collection.
It contains games, calculations, converters, and more.
Have fun and boost your daily productivity!`,
    modified: `Let Me Help You!
This is an awesome, retro-themed utility collection.
It contains fun games, calculations, converters, and developer utilities.
Boost your productivity with modern tools!`,
  },
};

export default function CompareTextPage() {
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");
  const [viewMode, setViewMode] = useState<"side-by-side" | "inline">("side-by-side");
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [wordWrap, setWordWrap] = useState(true);
  const [copyStatus, setCopyStatus] = useState<"diff" | "a" | "b" | null>(null);

  // Clear inputs
  const handleClear = () => {
    setOriginal("");
    setModified("");
  };

  // Swap original and modified
  const handleSwap = () => {
    const temp = original;
    setOriginal(modified);
    setModified(temp);
  };

  // Load preset example
  const handleLoadExample = (key: keyof typeof EXAMPLES) => {
    setOriginal(EXAMPLES[key].original);
    setModified(EXAMPLES[key].modified);
  };

  // Handle file uploading
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result && typeof event.target.result === "string") {
        setter(event.target.result);
      }
    };
    reader.readAsText(file);
    // Reset file input value so upload can be triggered again for the same file if needed
    e.target.value = "";
  };

  // Compute diffs
  const diffResult = useMemo(() => {
    const originalLines = original.split(/\r?\n/);
    const modifiedLines = modified.split(/\r?\n/);

    const normOriginal = originalLines.map((line) => {
      let l = line;
      if (ignoreWhitespace) l = l.trim();
      if (ignoreCase) l = l.toLowerCase();
      return l;
    });

    const normModified = modifiedLines.map((line) => {
      let l = line;
      if (ignoreWhitespace) l = l.trim();
      if (ignoreCase) l = l.toLowerCase();
      return l;
    });

    const M = normOriginal.length;
    const N = normModified.length;

    // LCS dynamic programming table
    const dp: number[][] = Array.from({ length: M + 1 }, () => new Array(N + 1).fill(0));

    for (let i = 1; i <= M; i++) {
      for (let j = 1; j <= N; j++) {
        if (normOriginal[i - 1] === normModified[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }

    // Backtrack to build the diff
    let i = M;
    let j = N;
    const diff: DiffLine[] = [];

    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && normOriginal[i - 1] === normModified[j - 1]) {
        diff.unshift({
          type: "unchanged",
          value: originalLines[i - 1],
          originalLineNum: i,
          modifiedLineNum: j,
        });
        i--;
        j--;
      } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
        diff.unshift({
          type: "added",
          value: modifiedLines[j - 1],
          modifiedLineNum: j,
        });
        j--;
      } else {
        diff.unshift({
          type: "removed",
          value: originalLines[i - 1],
          originalLineNum: i,
        });
        i--;
      }
    }

    return diff;
  }, [original, modified, ignoreCase, ignoreWhitespace]);

  // Statistics
  const stats = useMemo(() => {
    let additions = 0;
    let deletions = 0;
    let unchanged = 0;

    diffResult.forEach((line) => {
      if (line.type === "added") additions++;
      else if (line.type === "removed") deletions++;
      else unchanged++;
    });

    const totalLines = original.split(/\r?\n/).length + modified.split(/\r?\n/).length;
    const similarity =
      totalLines > 0 ? Math.round((unchanged * 2 * 100) / totalLines) : 100;

    return { additions, deletions, unchanged, similarity };
  }, [diffResult, original, modified]);

  // Generate Side-by-Side rows
  const sideBySideRows = useMemo(() => {
    const rows: SideBySideRow[] = [];
    let k = 0;
    const n = diffResult.length;

    while (k < n) {
      if (diffResult[k].type === "unchanged") {
        rows.push({
          left: {
            lineNum: diffResult[k].originalLineNum,
            value: diffResult[k].value,
            type: "unchanged",
          },
          right: {
            lineNum: diffResult[k].modifiedLineNum,
            value: diffResult[k].value,
            type: "unchanged",
          },
        });
        k++;
      } else {
        const removals: DiffLine[] = [];
        const additions: DiffLine[] = [];

        while (k < n && diffResult[k].type !== "unchanged") {
          if (diffResult[k].type === "removed") {
            removals.push(diffResult[k]);
          } else {
            additions.push(diffResult[k]);
          }
          k++;
        }

        const maxLen = Math.max(removals.length, additions.length);
        for (let i = 0; i < maxLen; i++) {
          const row: SideBySideRow = {};
          if (i < removals.length) {
            row.left = {
              lineNum: removals[i].originalLineNum,
              value: removals[i].value,
              type: "removed",
            };
          }
          if (i < additions.length) {
            row.right = {
              lineNum: additions[i].modifiedLineNum,
              value: additions[i].value,
              type: "added",
            };
          }
          rows.push(row);
        }
      }
    }

    return rows;
  }, [diffResult]);

  // Copy standard patch diff format
  const handleCopyDiff = () => {
    const patch = diffResult
      .map((line) => {
        if (line.type === "added") return `+ ${line.value}`;
        if (line.type === "removed") return `- ${line.value}`;
        return `  ${line.value}`;
      })
      .join("\n");

    navigator.clipboard.writeText(patch);
    setCopyStatus("diff");
    setTimeout(() => setCopyStatus(null), 2000);
  };

  const handleCopyInput = (type: "a" | "b", text: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(type);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full pb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl md:text-2xl flex items-center gap-3">
          <i className="nes-icon star is-medium"></i>
          Text Diff Viewer
        </h2>
        <Link href="/" className="nes-btn">
          Back
        </Link>
      </div>

      {/* Preset Examples */}
      <div className="nes-container with-title is-rounded bg-white">
        <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>
          Load Presets
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="nes-btn is-primary text-xs"
            onClick={() => handleLoadExample("js")}
          >
            JavaScript Example
          </button>
          <button
            type="button"
            className="nes-btn is-success text-xs"
            onClick={() => handleLoadExample("config")}
          >
            Config Example
          </button>
          <button
            type="button"
            className="nes-btn is-warning text-xs"
            onClick={() => handleLoadExample("text")}
          >
            Text Example
          </button>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="nes-container with-title is-rounded bg-white">
        <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>
          Inputs
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Version A */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label htmlFor="original_text" className="text-sm font-bold">
                Original Text (A)
              </label>
              <div className="flex gap-2">
                <label className="nes-btn is-primary text-xs cursor-pointer px-2 py-1 flex items-center">
                  Upload
                  <input
                    type="file"
                    accept=".txt,.json,.js,.ts,.html,.css,.md,.xml,.env,.yml,.yaml"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, setOriginal)}
                  />
                </label>
                <button
                  type="button"
                  className="nes-btn text-xs px-2 py-1"
                  onClick={() => handleCopyInput("a", original)}
                  disabled={!original}
                >
                  {copyStatus === "a" ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
            <textarea
              id="original_text"
              className="nes-textarea w-full font-mono text-xs p-2 border-4 border-black"
              value={original}
              onChange={(e) => setOriginal(e.target.value)}
              placeholder="Paste original text here or upload a file..."
              style={{ minHeight: "220px", fontFamily: "monospace" }}
              spellCheck={false}
            ></textarea>
            <div className="text-right text-[10px] text-gray-500">
              Lines: {original ? original.split(/\r?\n/).length : 0} | Chars:{" "}
              {original.length}
            </div>
          </div>

          {/* Version B */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label htmlFor="modified_text" className="text-sm font-bold">
                Modified Text (B)
              </label>
              <div className="flex gap-2">
                <label className="nes-btn is-primary text-xs cursor-pointer px-2 py-1 flex items-center">
                  Upload
                  <input
                    type="file"
                    accept=".txt,.json,.js,.ts,.html,.css,.md,.xml,.env,.yml,.yaml"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, setModified)}
                  />
                </label>
                <button
                  type="button"
                  className="nes-btn text-xs px-2 py-1"
                  onClick={() => handleCopyInput("b", modified)}
                  disabled={!modified}
                >
                  {copyStatus === "b" ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
            <textarea
              id="modified_text"
              className="nes-textarea w-full font-mono text-xs p-2 border-4 border-black"
              value={modified}
              onChange={(e) => setModified(e.target.value)}
              placeholder="Paste modified text here or upload a file..."
              style={{ minHeight: "220px", fontFamily: "monospace" }}
              spellCheck={false}
            ></textarea>
            <div className="text-right text-[10px] text-gray-500">
              Lines: {modified ? modified.split(/\r?\n/).length : 0} | Chars:{" "}
              {modified.length}
            </div>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mt-6 pt-4 border-t-4 border-dashed border-gray-200">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Ignore casing */}
            <label className="flex items-center gap-2 cursor-pointer text-xs select-none">
              <input
                type="checkbox"
                className="nes-checkbox"
                checked={ignoreCase}
                onChange={() => setIgnoreCase(!ignoreCase)}
              />
              <span>Ignore Case</span>
            </label>

            {/* Ignore whitespace */}
            <label className="flex items-center gap-2 cursor-pointer text-xs select-none">
              <input
                type="checkbox"
                className="nes-checkbox"
                checked={ignoreWhitespace}
                onChange={() => setIgnoreWhitespace(!ignoreWhitespace)}
              />
              <span>Ignore Whitespace</span>
            </label>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <button
              type="button"
              className="nes-btn is-warning flex-1 md:flex-none text-xs"
              onClick={handleSwap}
              disabled={!original && !modified}
            >
              Swap (A ⇄ B)
            </button>
            <button
              type="button"
              className="nes-btn is-error flex-1 md:flex-none text-xs"
              onClick={handleClear}
              disabled={!original && !modified}
            >
              Clear All
            </button>
          </div>
        </div>
      </div>

      {/* Diffs Output */}
      {(original || modified) && (
        <div className="nes-container with-title is-rounded bg-white">
          <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>
            Comparison Results
          </h3>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-center">
            <div className="nes-container is-rounded p-2 bg-gray-50 flex flex-col justify-center">
              <span className="text-[10px] text-gray-500 block mb-1">SIMILARITY</span>
              <span className="text-sm font-bold">{stats.similarity}%</span>
            </div>
            <div className="nes-container is-rounded p-2 bg-red-50 flex flex-col justify-center border-red-500">
              <span className="text-[10px] text-red-500 block mb-1">DELETIONS</span>
              <span className="text-sm font-bold text-red-600">-{stats.deletions}</span>
            </div>
            <div className="nes-container is-rounded p-2 bg-green-50 flex flex-col justify-center border-green-500">
              <span className="text-[10px] text-green-500 block mb-1">ADDITIONS</span>
              <span className="text-sm font-bold text-green-600">+{stats.additions}</span>
            </div>
            <div className="nes-container is-rounded p-2 bg-gray-50 flex flex-col justify-center">
              <span className="text-[10px] text-gray-500 block mb-1">UNCHANGED</span>
              <span className="text-sm font-bold">{stats.unchanged}</span>
            </div>
          </div>

          {/* Diff Controls */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4 pb-4 border-b-4 border-dashed border-gray-200">
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <button
                type="button"
                className={`nes-btn text-xs ${
                  viewMode === "side-by-side" ? "is-primary" : ""
                }`}
                onClick={() => setViewMode("side-by-side")}
              >
                Side-by-Side
              </button>
              <button
                type="button"
                className={`nes-btn text-xs ${
                  viewMode === "inline" ? "is-primary" : ""
                }`}
                onClick={() => setViewMode("inline")}
              >
                Inline (Unified)
              </button>
            </div>

            <div className="flex items-center justify-between gap-4 w-full md:w-auto">
              <label className="flex items-center gap-2 cursor-pointer text-xs select-none">
                <input
                  type="checkbox"
                  className="nes-checkbox"
                  checked={wordWrap}
                  onChange={() => setWordWrap(!wordWrap)}
                />
                <span>Wrap Lines</span>
              </label>

              <button
                type="button"
                className={`nes-btn ${
                  copyStatus === "diff" ? "is-success" : ""
                } text-xs`}
                onClick={handleCopyDiff}
              >
                {copyStatus === "diff" ? "Copied Patch!" : "Copy Patch"}
              </button>
            </div>
          </div>

          {/* Diff Display Screen */}
          <div className="w-full border-4 border-black bg-gray-50 overflow-hidden">
            {viewMode === "side-by-side" ? (
              /* Side by Side View */
              <div className="grid grid-cols-2 divide-x-4 divide-black text-xs font-mono">
                {/* Left Side (Original) */}
                <div className="flex flex-col overflow-x-auto min-w-0">
                  <div className="bg-gray-200 p-2 font-bold border-b-4 border-black text-center sticky top-0">
                    Original (Version A)
                  </div>
                  <div className="flex flex-col min-w-max md:min-w-0">
                    {sideBySideRows.map((row, index) => {
                      const hasVal = !!row.left;
                      const isRemoved = row.left?.type === "removed";
                      const rowBg = isRemoved
                        ? "bg-red-100 text-red-900 font-semibold"
                        : hasVal
                        ? "bg-white text-gray-800"
                        : "bg-gray-100";
                      const contentVal = row.left?.value ?? "";

                      return (
                        <div
                          key={`left-${index}`}
                          className={`flex items-start border-b border-gray-100 ${rowBg} min-h-[1.5rem]`}
                        >
                          {/* Line Number */}
                          <div className="w-10 select-none text-right pr-2 text-gray-400 bg-gray-50 border-r border-gray-200 py-0.5 font-sans">
                            {row.left?.lineNum ?? ""}
                          </div>
                          {/* Prefix */}
                          <div className="w-6 select-none text-center font-bold text-red-500 py-0.5">
                            {isRemoved ? "-" : hasVal ? " " : ""}
                          </div>
                          {/* Code Content */}
                          <pre
                            className={`flex-grow px-2 py-0.5 font-mono text-[11px] leading-5 ${
                              wordWrap ? "whitespace-pre-wrap break-all" : "whitespace-pre"
                            }`}
                            style={{ fontFamily: "monospace" }}
                          >
                            {contentVal || (isRemoved ? " " : "")}
                          </pre>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Side (Modified) */}
                <div className="flex flex-col overflow-x-auto min-w-0">
                  <div className="bg-gray-200 p-2 font-bold border-b-4 border-black text-center sticky top-0">
                    Modified (Version B)
                  </div>
                  <div className="flex flex-col min-w-max md:min-w-0">
                    {sideBySideRows.map((row, index) => {
                      const hasVal = !!row.right;
                      const isAdded = row.right?.type === "added";
                      const rowBg = isAdded
                        ? "bg-green-100 text-green-900 font-semibold"
                        : hasVal
                        ? "bg-white text-gray-800"
                        : "bg-gray-100";
                      const contentVal = row.right?.value ?? "";

                      return (
                        <div
                          key={`right-${index}`}
                          className={`flex items-start border-b border-gray-100 ${rowBg} min-h-[1.5rem]`}
                        >
                          {/* Line Number */}
                          <div className="w-10 select-none text-right pr-2 text-gray-400 bg-gray-50 border-r border-gray-200 py-0.5 font-sans">
                            {row.right?.lineNum ?? ""}
                          </div>
                          {/* Prefix */}
                          <div className="w-6 select-none text-center font-bold text-green-600 py-0.5">
                            {isAdded ? "+" : hasVal ? " " : ""}
                          </div>
                          {/* Code Content */}
                          <pre
                            className={`flex-grow px-2 py-0.5 font-mono text-[11px] leading-5 ${
                              wordWrap ? "whitespace-pre-wrap break-all" : "whitespace-pre"
                            }`}
                            style={{ fontFamily: "monospace" }}
                          >
                            {contentVal || (isAdded ? " " : "")}
                          </pre>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              /* Inline (Unified) View */
              <div className="flex flex-col overflow-x-auto text-xs font-mono">
                {diffResult.map((line, index) => {
                  const isAdded = line.type === "added";
                  const isRemoved = line.type === "removed";
                  const rowBg = isAdded
                    ? "bg-green-100 text-green-900 font-semibold"
                    : isRemoved
                    ? "bg-red-100 text-red-900 font-semibold"
                    : "bg-white text-gray-800";
                  const prefix = isAdded ? "+" : isRemoved ? "-" : " ";
                  const prefixColor = isAdded
                    ? "text-green-600"
                    : isRemoved
                    ? "text-red-500"
                    : "text-gray-300";

                  return (
                    <div
                      key={`inline-${index}`}
                      className={`flex items-start border-b border-gray-100 ${rowBg} min-h-[1.5rem]`}
                    >
                      {/* Original Line Number */}
                      <div className="w-10 select-none text-right pr-2 text-gray-400 bg-gray-50 border-r border-gray-200 py-0.5 font-sans">
                        {line.originalLineNum ?? ""}
                      </div>
                      {/* Modified Line Number */}
                      <div className="w-10 select-none text-right pr-2 text-gray-400 bg-gray-50 border-r border-gray-200 py-0.5 font-sans">
                        {line.modifiedLineNum ?? ""}
                      </div>
                      {/* Prefix */}
                      <div className={`w-6 select-none text-center font-bold ${prefixColor} py-0.5`}>
                        {prefix}
                      </div>
                      {/* Code Content */}
                      <pre
                        className={`flex-grow px-2 py-0.5 font-mono text-[11px] leading-5 ${
                          wordWrap ? "whitespace-pre-wrap break-all" : "whitespace-pre"
                        }`}
                        style={{ fontFamily: "monospace" }}
                      >
                        {line.value || " "}
                      </pre>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
