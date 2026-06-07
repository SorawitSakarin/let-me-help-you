"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

interface Preset {
  name: string;
  regex: string;
  testString: string;
  global: boolean;
  ignoreCase: boolean;
  multiline: boolean;
  dotAll: boolean;
}

const PRESETS: Record<string, Preset> = {
  email: {
    name: "Email Address",
    regex: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
    testString: "Send emails to support@example.com, feedback@retro-tools.org, or test.user+label@domain.co.uk.\nInvalid addresses like @gmail.com or user@com shouldn't match.",
    global: true,
    ignoreCase: true,
    multiline: true,
    dotAll: false,
  },
  url: {
    name: "URL / Link",
    regex: "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&\\/\\/=]*)",
    testString: "Visit our homepage at https://google.com or check out http://localhost:3000/test-regex for details.\nSecure links: https://sub.domain.org/path/to/page?query=true#hash.",
    global: true,
    ignoreCase: true,
    multiline: true,
    dotAll: false,
  },
  date: {
    name: "Date (YYYY-MM-DD)",
    regex: "\\d{4}-\\d{2}-\\d{2}",
    testString: "Today's date is 2026-06-08. Yesterday was 2026-06-07.\nAmerican style is 12/31/1999 (won't match) but 1999-12-31 will match.",
    global: true,
    ignoreCase: false,
    multiline: true,
    dotAll: false,
  },
  ipv4: {
    name: "IPv4 Address",
    regex: "\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b",
    testString: "Localhost is 127.0.0.1. Primary DNS is 8.8.8.8.\nIP values range up to 255.255.255.255. Out of range: 256.100.0.1 (won't match).",
    global: true,
    ignoreCase: false,
    multiline: true,
    dotAll: false,
  },
  phone: {
    name: "Phone Number",
    regex: "\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}",
    testString: "Customer support: +1-555-123-4567.\nOffice direct line: 02-345-6789 or 0812345678.\nInternational formatting: +66 81 234 5678.",
    global: true,
    ignoreCase: false,
    multiline: true,
    dotAll: false,
  },
  html: {
    name: "HTML Tags",
    regex: "<([a-z1-6]+)([^>]*?)>(.*?)<\\/\\1>",
    testString: "<div>Hello <b>World</b>!</div>\n<p class=\"retro-text\">This is a paragraph.</p>\n<span>Nested <i>italicized</i> text</span>",
    global: true,
    ignoreCase: true,
    multiline: true,
    dotAll: false,
  },
};

interface MatchInfo {
  index: number;
  length: number;
  value: string;
  groups: string[];
}

export default function RegExTesterPage() {
  const [regexStr, setRegexStr] = useState(PRESETS.email.regex);
  const [testString, setTestString] = useState(PRESETS.email.testString);

  // Flags
  const [gFlag, setGFlag] = useState(PRESETS.email.global);
  const [iFlag, setIFlag] = useState(PRESETS.email.ignoreCase);
  const [mFlag, setMFlag] = useState(PRESETS.email.multiline);
  const [sFlag, setSFlag] = useState(PRESETS.email.dotAll);

  // Clear inputs
  const handleClear = () => {
    setRegexStr("");
    setTestString("");
  };

  // Load preset
  const handleLoadPreset = (key: keyof typeof PRESETS) => {
    const preset = PRESETS[key];
    setRegexStr(preset.regex);
    setTestString(preset.testString);
    setGFlag(preset.global);
    setIFlag(preset.ignoreCase);
    setMFlag(preset.multiline);
    setSFlag(preset.dotAll);
  };

  // Build flags string
  const flagsStr = useMemo(() => {
    let f = "";
    if (gFlag) f += "g";
    if (iFlag) f += "i";
    if (mFlag) f += "m";
    if (sFlag) f += "s";
    return f;
  }, [gFlag, iFlag, mFlag, sFlag]);

  // Regex compilation and validation
  const regexObjectInfo = useMemo(() => {
    if (!regexStr) {
      return { isValid: true, error: null };
    }
    try {
      new RegExp(regexStr, flagsStr);
      return { isValid: true, error: null };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      return { isValid: false, error: msg };
    }
  }, [regexStr, flagsStr]);

  // Match operations
  const matchesData = useMemo(() => {
    if (!regexStr || regexObjectInfo.error) {
      return { matches: [], highlightedParts: [{ text: testString, isMatch: false }] };
    }

    const matches: MatchInfo[] = [];
    const highlightedParts: { text: string; isMatch: boolean; matchIndex?: number }[] = [];
    let lastIndex = 0;

    try {
      const regex = new RegExp(regexStr, flagsStr);

      if (gFlag) {
        // Reset index
        regex.lastIndex = 0;
        let match;
        let matchCount = 0;

        while ((match = regex.exec(testString)) !== null) {
          const matchText = match[0];
          const index = match.index;

          // Handle zero-width matches to avoid infinite loop
          if (matchText.length === 0) {
            if (regex.lastIndex === index) {
              regex.lastIndex++;
            }
            continue;
          }

          // Non-matched segment before this match
          if (index > lastIndex) {
            highlightedParts.push({
              text: testString.substring(lastIndex, index),
              isMatch: false,
            });
          }

          // Matched segment
          highlightedParts.push({
            text: matchText,
            isMatch: true,
            matchIndex: matchCount,
          });

          matches.push({
            index,
            length: matchText.length,
            value: matchText,
            groups: match.slice(1).filter((g) => g !== undefined),
          });

          matchCount++;
          lastIndex = regex.lastIndex;

          // Safety break if global isn't correctly configured internally
          if (!regex.global) break;
        }

        // Add remaining non-matched text
        if (lastIndex < testString.length) {
          highlightedParts.push({
            text: testString.substring(lastIndex),
            isMatch: false,
          });
        }
      } else {
        // Single match mode
        const match = testString.match(regex);
        if (match && match.index !== undefined && match[0].length > 0) {
          const matchText = match[0];
          const index = match.index;

          if (index > 0) {
            highlightedParts.push({
              text: testString.substring(0, index),
              isMatch: false,
            });
          }

          highlightedParts.push({
            text: matchText,
            isMatch: true,
            matchIndex: 0,
          });

          if (index + matchText.length < testString.length) {
            highlightedParts.push({
              text: testString.substring(index + matchText.length),
              isMatch: false,
            });
          }

          matches.push({
            index,
            length: matchText.length,
            value: matchText,
            groups: match.slice(1).filter((g) => g !== undefined),
          });
        } else {
          highlightedParts.push({
            text: testString,
            isMatch: false,
          });
        }
      }

      return { matches, highlightedParts };
    } catch (e) {
      console.error(e);
      return { matches: [], highlightedParts: [{ text: testString, isMatch: false }] };
    }
  }, [regexStr, flagsStr, testString, gFlag, regexObjectInfo.error]);

  const { matches, highlightedParts } = matchesData;

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full pb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl md:text-2xl flex items-center gap-3">
          <i className="nes-icon star is-medium"></i>
          RegEx Tester
        </h2>
        <Link href="/" className="nes-btn text-xs md:text-sm">
          Back
        </Link>
      </div>

      {/* Preset Library */}
      <div className="nes-container with-title is-rounded bg-white">
        <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>
          Load Presets
        </h3>
        <div className="flex flex-wrap gap-2">
          {Object.keys(PRESETS).map((key) => (
            <button
              key={key}
              type="button"
              className="nes-btn is-primary text-xs"
              onClick={() => handleLoadPreset(key)}
            >
              {PRESETS[key].name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Configuration Grid */}
      <div className="nes-container with-title is-rounded bg-white">
        <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>
          Regex & Flags
        </h3>

        <div className="flex flex-col gap-4">
          {/* Regex Input styled like a developer tool */}
          <div className="flex flex-col gap-1">
            <label htmlFor="regex-pattern" className="text-xs font-bold">
              Regular Expression Pattern:
            </label>
            <div className="flex items-center font-mono text-sm md:text-base border-4 border-black p-1 bg-gray-50 rounded">
              <span className="text-gray-400 px-2 font-bold font-sans">/</span>
              <input
                id="regex-pattern"
                type="text"
                className="flex-grow bg-transparent outline-none font-mono text-sm md:text-base px-1"
                placeholder="enter regex pattern here..."
                value={regexStr}
                onChange={(e) => setRegexStr(e.target.value)}
                style={{ fontFamily: "monospace" }}
                spellCheck={false}
              />
              <span className="text-gray-400 px-2 font-bold font-sans">/</span>
              <span className="text-primary font-bold pr-2 font-sans">{flagsStr || "none"}</span>
            </div>
          </div>

          {/* Compilation Error Display */}
          {regexObjectInfo.error && (
            <div className="p-3 bg-red-100 border-4 border-red-500 text-red-700 text-xs font-mono">
              <p className="font-bold mb-1">⚠️ INVALID REGEX SYNTAX:</p>
              <p>{regexObjectInfo.error}</p>
            </div>
          )}

          {/* Flags Toggles */}
          <div className="flex flex-wrap gap-4 md:gap-8 items-center mt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs select-none">
              <input
                type="checkbox"
                className="nes-checkbox"
                checked={gFlag}
                onChange={() => setGFlag(!gFlag)}
              />
              <span>g (Global)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs select-none">
              <input
                type="checkbox"
                className="nes-checkbox"
                checked={iFlag}
                onChange={() => setIFlag(!iFlag)}
              />
              <span>i (Ignore Case)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs select-none">
              <input
                type="checkbox"
                className="nes-checkbox"
                checked={mFlag}
                onChange={() => setMFlag(!mFlag)}
              />
              <span>m (Multiline)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs select-none">
              <input
                type="checkbox"
                className="nes-checkbox"
                checked={sFlag}
                onChange={() => setSFlag(!sFlag)}
              />
              <span>s (DotAll / Singleline)</span>
            </label>
          </div>
        </div>
      </div>

      {/* Input / Output Workspace */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Test String Input */}
        <div className="nes-container with-title is-rounded bg-white flex flex-col">
          <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>
            Test String
          </h3>
          <div className="flex-grow flex flex-col gap-2">
            <textarea
              className="nes-textarea w-full font-mono text-xs p-2 border-4 border-black flex-grow"
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              placeholder="Paste your test text here..."
              style={{ minHeight: "200px", fontFamily: "monospace" }}
              spellCheck={false}
              rows={8}
            />
            <div className="flex justify-between items-center text-[10px] text-gray-500 px-1">
              <span>Chars: {testString.length}</span>
              <button
                type="button"
                className="nes-btn is-error text-[10px] py-1 px-2"
                onClick={handleClear}
                disabled={!testString && !regexStr}
              >
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Highlighted Matches Display */}
        <div className="nes-container with-title is-rounded bg-white flex flex-col">
          <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>
            Matches Highlighted
          </h3>
          <div className="flex-grow flex flex-col">
            <div
              className="border-4 border-black p-3 bg-gray-50 font-mono text-xs overflow-auto flex-grow rounded whitespace-pre-wrap break-all"
              style={{ minHeight: "200px", maxHeight: "280px", fontFamily: "monospace" }}
            >
              {highlightedParts.length === 0 ? (
                <span className="text-gray-400 italic">No text to evaluate...</span>
              ) : (
                highlightedParts.map((part, index) => {
                  if (part.isMatch) {
                    return (
                      <mark
                        key={index}
                        className="bg-yellow-200 text-black border-b-2 border-yellow-600 font-semibold px-0.5"
                        title={`Match index: ${part.matchIndex}`}
                      >
                        {part.text}
                      </mark>
                    );
                  }
                  return <span key={index}>{part.text}</span>;
                })
              )}
            </div>
            <div className="text-right text-[10px] text-gray-500 mt-2 px-1">
              Matches Found: <span className="font-bold text-black">{matches.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Match Details List */}
      <div className="nes-container with-title is-rounded bg-white">
        <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>
          Match Details
        </h3>

        {matches.length === 0 ? (
          <p className="text-xs text-gray-500 italic p-2 text-center">No match occurrences found.</p>
        ) : (
          <div className="max-h-[300px] overflow-y-auto">
            <table className="nes-table is-bordered is-striped w-full text-[10px] font-mono is-compact">
              <thead>
                <tr>
                  <th className="w-[10%]">#</th>
                  <th className="w-[45%]">Match Value</th>
                  <th className="w-[20%]">Index [Range]</th>
                  <th className="w-[25%]">Groups</th>
                </tr>
              </thead>
              <tbody>
                {matches.map((match, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td className="font-bold break-all bg-yellow-50">{match.value}</td>
                    <td>
                      {match.index} [-{match.index + match.length}]
                    </td>
                    <td className="break-all text-[9px] text-gray-600">
                      {match.groups.length > 0 ? (
                        <ol className="list-decimal pl-4">
                          {match.groups.map((group, gIdx) => (
                            <li key={gIdx} title={`Group ${gIdx + 1}`}>
                              {group}
                            </li>
                          ))}
                        </ol>
                      ) : (
                        <span className="text-gray-400 italic">none</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Cheat Sheet Section */}
      <div className="nes-container with-title is-rounded bg-white">
        <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>
          Regex Cheat Sheet
        </h3>

        <div className="overflow-x-auto">
          <table className="nes-table is-bordered is-striped w-full text-[9px] md:text-[10px] is-compact">
            <thead>
              <tr>
                <th className="w-[25%]">Character</th>
                <th className="w-[75%]">Description & Meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-bold font-mono">.</td>
                <td>Matches any single character except newline.</td>
              </tr>
              <tr>
                <td className="font-bold font-mono">\d / \D</td>
                <td>Matches any digit (0-9) / any non-digit character.</td>
              </tr>
              <tr>
                <td className="font-bold font-mono">\w / \W</td>
                <td>Matches word character (alphanumeric + underscore) / non-word.</td>
              </tr>
              <tr>
                <td className="font-bold font-mono">\s / \S</td>
                <td>Matches any whitespace character / non-whitespace.</td>
              </tr>
              <tr>
                <td className="font-bold font-mono">^ / $</td>
                <td>Position anchors: start of string or line / end of string or line.</td>
              </tr>
              <tr>
                <td className="font-bold font-mono">* / + / ?</td>
                <td>Quantifiers: 0 or more / 1 or more / optional (0 or 1).</td>
              </tr>
              <tr>
                <td className="font-bold font-mono">{"{n} / {n,m}"}</td>
                <td>Quantifiers: exactly n times / between n and m times.</td>
              </tr>
              <tr>
                <td className="font-bold font-mono">[abc] / [^abc]</td>
                <td>Character class: matches a, b, or c / matches anything EXCEPT a, b, or c.</td>
              </tr>
              <tr>
                <td className="font-bold font-mono">(abc)</td>
                <td>Capturing group: groups characters and creates a match group.</td>
              </tr>
              <tr>
                <td className="font-bold font-mono">(?:abc)</td>
                <td>Non-capturing group: groups characters without capturing.</td>
              </tr>
              <tr>
                <td className="font-bold font-mono">a | b</td>
                <td>Alternation: matches expression a OR expression b.</td>
              </tr>
              <tr>
                <td className="font-bold font-mono">\b / \B</td>
                <td>Matches a word boundary / non-word boundary.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
