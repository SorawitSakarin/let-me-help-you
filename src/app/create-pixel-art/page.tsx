"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";

interface Preset {
  id: string;
  name: string;
  size: number;
  colors: Record<string, string>;
  data: string[];
}

const PRESETS: Preset[] = [
  {
    id: "invader",
    name: "Invader",
    size: 8,
    colors: {
      "X": "#8b5cf6", // Purple
    },
    data: [
      "..X..X..",
      "...XX...",
      ".XXXXXX.",
      "XX.XX.XX",
      "XXXXXXXX",
      ".XXXXXX.",
      "..X..X..",
      ".X....X.",
    ],
  },
  {
    id: "heart",
    name: "Heart",
    size: 8,
    colors: {
      "R": "#ef4444", // Red
    },
    data: [
      "........",
      ".RR..RR.",
      "RRRRRRRR",
      "RRRRRRRR",
      ".RRRRRR.",
      "..RRRR..",
      "...RR...",
      "........",
    ]
  },
  {
    id: "coin",
    name: "Retro Coin",
    size: 8,
    colors: {
      "Y": "#facc15", // Gold
      "O": "#ca8a04", // Dark Orange
      "W": "#ffffff", // Shine
      "B": "#000000", // Outline
    },
    data: [
      "..BBBB..",
      ".BYYYWOB.",
      "BYYYYYYOB",
      "BYYOOYYOB",
      "BYYOOYYOB",
      "BYYYYYYOB",
      ".BOOOOOOB.",
      "..BBBB..",
    ]
  },
  {
    id: "potion",
    name: "Potion",
    size: 16,
    colors: {
      "B": "#000000", // Outline
      "G": "#cbd5e1", // Glass
      "M": "#3b82f6", // Mana liquid (blue)
      "D": "#1d4ed8", // Dark mana
      "W": "#ffffff", // Highlight
      "C": "#ca8a04", // Cork
    },
    data: [
      "................",
      "......BBBB......",
      "......BCCB......",
      ".....BGGGBB.....",
      "....BGWWWWGB....",
      "....BGWDDDWB....",
      "...BGWDMMMDGB...",
      "..BGWDMMMMMDGB..",
      "..BGWDMMMMMDGB..",
      "..BGWDMMMMMDGB..",
      "..BGWDMMMMMDGB..",
      "..BGGDDDDDDDGB..",
      "...BGGGGGGGGGB..",
      "....BBBBBBBBB...",
      "................",
      "................",
    ]
  },
  {
    id: "sword",
    name: "Sword",
    size: 16,
    colors: {
      "S": "#cbd5e1", // Steel
      "D": "#64748b", // Dark Steel
      "G": "#eab308", // Gold
      "W": "#78350f", // Wood
      "B": "#000000", // Outline
      "R": "#ef4444", // Ruby Gem
    },
    data: [
      "............B...",
      "...........BSB..",
      "..........BSB...",
      ".........BSB....",
      "........BSB.....",
      ".......BSB......",
      "......BSB.......",
      ".....BSB........",
      "....BDB.........",
      "...BGB..........",
      "..BGGB..........",
      ".BWRB...........",
      "BWB.............",
      "B...............",
      "................",
      "................",
    ]
  },
  {
    id: "mushroom",
    name: "Mushroom",
    size: 16,
    colors: {
      "B": "#000000", // Outline
      "R": "#ef4444", // Red Cap
      "W": "#ffffff", // White Spots
      "S": "#ffedd5", // Skin
      "E": "#000000", // Eyes
    },
    data: [
      "................",
      "......BBBB......",
      "....BBWWWRBB....",
      "...BRRWWWRRRB...",
      "..BRRRRRRRRRRB..",
      ".BRRRWWWRRRRRRB.",
      ".BRRWWWWWWRRRRB.",
      "BRRRWWWWWWRRRRRB",
      "BRRRRWWWWRRRRRRB",
      "BBBBBBBBBBBBBBBB",
      "..BSSBSSBSSBSSB.",
      "..BSSBSSBSSBSSB.",
      "..BSSESSSSESSSB.",
      "...BSSBSSBSSSB..",
      "....BBBBBBBBB...",
      "................",
    ]
  }
];

const PALETTES = {
  nes: {
    name: "NES Retro",
    colors: ["#ef4444", "#dc2626", "#3b82f6", "#2563eb", "#10b981", "#059669", "#f59e0b", "#d97706", "#8b5cf6", "#7c3aed", "#ec4899", "#db2777", "#78350f", "#451a03", "#ffffff", "#d1d5db", "#4b5563", "#000000"],
  },
  pico8: {
    name: "PICO-8",
    colors: ["#000000", "#1D2B53", "#7E2553", "#008751", "#AB5236", "#5F574F", "#C2C3C7", "#FFF1E8", "#FF004D", "#FFA300", "#FFEC27", "#00E436", "#29ADFF", "#83769C", "#FF77A8", "#FFCCAA"],
  },
  gameboy: {
    name: "GameBoy",
    colors: ["#0f380f", "#306230", "#8bac0f", "#9bbc0f"],
  },
  cyberpunk: {
    name: "Neon Cyber",
    colors: ["#00ffff", "#ff00ff", "#ffff00", "#ff3366", "#9900ff", "#33cc33", "#ff6600", "#ffffff", "#222222", "#000000"],
  }
};

type ToolType = "pencil" | "bucket" | "eraser" | "eyedropper";
type ExportTab = "png" | "svg" | "css" | "react";

// Web Audio API Retro Sound Effects
const playSound = (type: "draw" | "erase" | "fill" | "clear" | "load", isMuted: boolean) => {
  if (isMuted) return;
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === "draw") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(850, now + 0.04);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === "erase") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.07);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.07);
      osc.start(now);
      osc.stop(now + 0.07);
    } else if (type === "fill") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(350, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.12);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === "clear") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(500, now);
      osc.frequency.linearRampToValueAtTime(100, now + 0.18);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.18);
      osc.start(now);
      osc.stop(now + 0.18);
    } else if (type === "load") {
      osc.type = "square";
      osc.frequency.setValueAtTime(261.63, now); // C4
      osc.frequency.setValueAtTime(329.63, now + 0.07); // E4
      osc.frequency.setValueAtTime(392.00, now + 0.14); // G4
      osc.frequency.setValueAtTime(523.25, now + 0.21); // C5
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.setValueAtTime(0.03, now + 0.21);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.32);
      osc.start(now);
      osc.stop(now + 0.32);
    }
  } catch (err) {
    console.error("AudioContext synthesis failed:", err);
  }
};

export default function RetroSpriteMakerPage() {
  const [size, setSize] = useState<number>(16);
  const [grid, setGrid] = useState<string[]>(() => Array(256).fill(""));
  const [brushColor, setBrushColor] = useState<string>("#ef4444");
  const [activeTool, setActiveTool] = useState<ToolType>("pencil");
  const [activePaletteKey, setActivePaletteKey] = useState<keyof typeof PALETTES>("nes");
  const [showGridLines, setShowGridLines] = useState<boolean>(true);
  const [soundMuted, setSoundMuted] = useState<boolean>(false);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [savedSlots, setSavedSlots] = useState<Record<number, boolean>>({ 1: false, 2: false, 3: false });
  const [exportTab, setExportTab] = useState<ExportTab>("png");
  const [pngScale, setPngScale] = useState<number>(32); // Multiply grid size for clear downloads
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  // Check LocalStorage saved slots on mount
  useEffect(() => {
    const slots: Record<number, boolean> = {};
    for (let i = 1; i <= 3; i++) {
      slots[i] = localStorage.getItem(`retro_sprite_slot_${i}`) !== null;
    }
    setTimeout(() => {
      setSavedSlots(slots);
    }, 0);
  }, []);

  // Sync mouseup event globally
  useEffect(() => {
    const handleMouseUp = () => setIsMouseDown(false);
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  const activePalette = useMemo(() => PALETTES[activePaletteKey], [activePaletteKey]);

  // Copy helper
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopySuccess(true);
    playSound("load", soundMuted);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Resize grid preserving as much pixel art as possible
  const handleSizeChange = (newSize: number) => {
    if (newSize === size) return;
    const newGrid = Array(newSize * newSize).fill("");
    const minSize = Math.min(size, newSize);
    for (let r = 0; r < minSize; r++) {
      for (let c = 0; c < minSize; c++) {
        const oldIdx = r * size + c;
        const newIdx = r * newSize + c;
        newGrid[newIdx] = grid[oldIdx] || "";
      }
    }
    setGrid(newGrid);
    setSize(newSize);
    playSound("load", soundMuted);
  };

  // Preset loading
  const loadPreset = (preset: Preset) => {
    const newSize = preset.size;
    const newGrid = Array(newSize * newSize).fill("");
    for (let r = 0; r < newSize; r++) {
      const rowStr = preset.data[r];
      for (let c = 0; c < newSize; c++) {
        const char = rowStr[c];
        if (char && char !== "." && char !== " ") {
          newGrid[r * newSize + c] = preset.colors[char] || "";
        }
      }
    }
    setSize(newSize);
    setGrid(newGrid);
    playSound("load", soundMuted);
  };

  // Reset/Clear canvas
  const handleClearCanvas = () => {
    if (window.confirm("Are you sure you want to clear the canvas?")) {
      setGrid(Array(size * size).fill(""));
      playSound("clear", soundMuted);
    }
  };

  // Tool operation handler
  const applyTool = (idx: number) => {
    if (activeTool === "pencil") {
      if (grid[idx] !== brushColor) {
        const newGrid = [...grid];
        newGrid[idx] = brushColor;
        setGrid(newGrid);
        playSound("draw", soundMuted);
      }
    } else if (activeTool === "eraser") {
      if (grid[idx] !== "") {
        const newGrid = [...grid];
        newGrid[idx] = "";
        setGrid(newGrid);
        playSound("erase", soundMuted);
      }
    } else if (activeTool === "eyedropper") {
      const color = grid[idx];
      if (color) {
        setBrushColor(color);
        setActiveTool("pencil");
        playSound("load", soundMuted);
      }
    } else if (activeTool === "bucket") {
      const targetColor = brushColor;
      const sourceColor = grid[idx];
      if (sourceColor === targetColor) return;

      const W = size;
      const H = size;
      const newGrid = [...grid];
      const queue = [idx];
      const visited = new Set<number>();
      visited.add(idx);

      while (queue.length > 0) {
        const curr = queue.shift()!;
        newGrid[curr] = targetColor;

        const r = Math.floor(curr / W);
        const c = curr % W;

        const neighbors = [];
        if (r > 0) neighbors.push(curr - W);
        if (r < H - 1) neighbors.push(curr + W);
        if (c > 0) neighbors.push(curr - 1);
        if (c < W - 1) neighbors.push(curr + 1);

        for (const n of neighbors) {
          if (!visited.has(n) && grid[n] === sourceColor) {
            visited.add(n);
            queue.push(n);
          }
        }
      }
      setGrid(newGrid);
      playSound("fill", soundMuted);
    }
  };

  const handlePixelAction = (idx: number, e: React.MouseEvent) => {
    e.preventDefault();
    setIsMouseDown(true);
    applyTool(idx);
  };

  const handlePixelDrag = (idx: number) => {
    if (isMouseDown) {
      applyTool(idx);
    }
  };

  // LocalStorage Save & Load
  const handleSaveToSlot = (slot: number) => {
    try {
      const dataToSave = { size, grid };
      localStorage.setItem(`retro_sprite_slot_${slot}`, JSON.stringify(dataToSave));
      setSavedSlots((prev) => ({ ...prev, [slot]: true }));
      playSound("load", soundMuted);
    } catch (e) {
      console.error("Failed to save sprite:", e);
    }
  };

  const handleLoadFromSlot = (slot: number) => {
    try {
      const raw = localStorage.getItem(`retro_sprite_slot_${slot}`);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data && data.grid && data.size) {
        setSize(data.size);
        setGrid(data.grid);
        playSound("load", soundMuted);
      }
    } catch (e) {
      console.error("Failed to load sprite:", e);
    }
  };

  const handleClearSlot = (slot: number) => {
    try {
      localStorage.removeItem(`retro_sprite_slot_${slot}`);
      setSavedSlots((prev) => ({ ...prev, [slot]: false }));
      playSound("erase", soundMuted);
    } catch (e) {
      console.error("Failed to clear slot:", e);
    }
  };

  // Exporters code calculations
  const svgCode = useMemo(() => {
    const cellSize = 10;
    const totalSize = size * cellSize;
    let rects = "";
    for (let i = 0; i < grid.length; i++) {
      const color = grid[i];
      if (color) {
        const r = Math.floor(i / size);
        const c = i % size;
        rects += `  <rect x="${c * cellSize}" y="${r * cellSize}" width="${cellSize}" height="${cellSize}" fill="${color}" />\n`;
      }
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalSize} ${totalSize}" width="${totalSize}" height="${totalSize}">\n${rects}</svg>`;
  }, [grid, size]);

  const cssBoxShadowCode = useMemo(() => {
    const pixelSize = 10;
    const shadows: string[] = [];
    for (let i = 0; i < grid.length; i++) {
      const color = grid[i];
      if (color) {
        const r = Math.floor(i / size);
        const c = i % size;
        shadows.push(`${c * pixelSize}px ${r * pixelSize}px 0 0 ${color}`);
      }
    }
    const shadowValue = shadows.join(",\n    ");
    return `.retro-pixel-sprite {
  display: inline-block;
  width: ${pixelSize}px;
  height: ${pixelSize}px;
  background: transparent;
  box-shadow:
    ${shadowValue || "none"};
}`;
  }, [grid, size]);

  const reactComponentCode = useMemo(() => {
    return `import React from 'react';

// Crisp retro pixel art renderer
export default function RetroSprite() {
  const grid = ${JSON.stringify(grid)};
  const size = ${size};

  return (
    <div 
      style={{
        display: 'grid',
        gridTemplateColumns: \`repeat(\${size}, 1fr)\`,
        width: \`\${size * 8}px\`,
        height: \`\${size * 8}px\`,
        imageRendering: 'pixelated'
      }}
    >
      {grid.map((color, idx) => (
        <div 
          key={idx} 
          style={{ 
            backgroundColor: color || 'transparent',
            aspectRatio: '1/1'
          }} 
        />
      ))}
    </div>
  );
}`;
  }, [grid, size]);

  // PNG download using HTML5 canvas
  const handleDownloadPNG = () => {
    const canvas = document.createElement("canvas");
    const outputSize = size * pngScale;
    canvas.width = outputSize;
    canvas.height = outputSize;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, outputSize, outputSize);
    ctx.imageSmoothingEnabled = false;

    for (let i = 0; i < grid.length; i++) {
      const color = grid[i];
      if (color) {
        const r = Math.floor(i / size);
        const c = i % size;
        ctx.fillStyle = color;
        ctx.fillRect(c * pngScale, r * pngScale, pngScale, pngScale);
      }
    }

    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `pixel-art-sprite-${size}x${size}.png`;
    a.click();
    playSound("load", soundMuted);
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full pb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl md:text-2xl flex items-center gap-3">
          <i className="nes-icon trophy is-medium"></i>
          Retro Sprite Maker
        </h2>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className={`nes-btn text-xs md:text-sm ${soundMuted ? "is-error" : "is-success"}`}
            onClick={() => setSoundMuted(!soundMuted)}
          >
            {soundMuted ? "🔇 Mute" : "🔊 Audio"}
          </button>
          <Link href="/" className="nes-btn text-xs md:text-sm">
            Back
          </Link>
        </div>
      </div>

      {/* Grid size and Toolbar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Control Board: 4 Cols */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Canvas Size Section */}
          <div className="nes-container with-title is-rounded bg-white">
            <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>
              Grid Resolution
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between gap-2">
                {[8, 16, 32].map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`nes-btn text-xs flex-grow ${size === s ? "is-primary" : ""}`}
                    onClick={() => handleSizeChange(s)}
                  >
                    {s} x {s}
                  </button>
                ))}
              </div>
              <label className="flex items-center gap-2 cursor-pointer text-[10px] select-none">
                <input
                  type="checkbox"
                  className="nes-checkbox"
                  checked={showGridLines}
                  onChange={() => setShowGridLines(!showGridLines)}
                />
                <span>Toggle Grid Lines</span>
              </label>
            </div>
          </div>

          {/* Painter Tools Selection */}
          <div className="nes-container with-title is-rounded bg-white">
            <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>
              Drawing Tools
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                className={`nes-btn w-full ${activeTool === "pencil" ? "is-primary" : ""}`}
                onClick={() => {
                  setActiveTool("pencil");
                  playSound("draw", soundMuted);
                }}
              >
                ✏️ Pencil
              </button>
              <button
                type="button"
                className={`nes-btn w-full ${activeTool === "bucket" ? "is-primary" : ""}`}
                onClick={() => {
                  setActiveTool("bucket");
                  playSound("fill", soundMuted);
                }}
              >
                🪣 Bucket
              </button>
              <button
                type="button"
                className={`nes-btn w-full ${activeTool === "eraser" ? "is-primary" : ""}`}
                onClick={() => {
                  setActiveTool("eraser");
                  playSound("erase", soundMuted);
                }}
              >
                🧼 Eraser
              </button>
              <button
                type="button"
                className={`nes-btn w-full ${activeTool === "eyedropper" ? "is-primary" : ""}`}
                onClick={() => {
                  setActiveTool("eyedropper");
                  playSound("load", soundMuted);
                }}
              >
                🧪 Picker
              </button>
            </div>
          </div>

          {/* Color Palettes */}
          <div className="nes-container with-title is-rounded bg-white">
            <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>
              Color Palettes
            </h3>
            <div className="flex flex-col gap-4">
              <div className="nes-select text-xs">
                <select
                  value={activePaletteKey}
                  onChange={(e) => {
                    setActivePaletteKey(e.target.value as keyof typeof PALETTES);
                    playSound("load", soundMuted);
                  }}
                >
                  <option value="nes">Retro NES Classic</option>
                  <option value="pico8">PICO-8 Swatches</option>
                  <option value="gameboy">Classic GameBoy Mono</option>
                  <option value="cyberpunk">Cyberpunk Neon</option>
                </select>
              </div>

              {/* Color Grid */}
              <div className="grid grid-cols-6 gap-1.5 p-1 bg-gray-50 border-4 border-black rounded">
                {activePalette.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    style={{ backgroundColor: color }}
                    title={color}
                    className={`aspect-square w-full rounded border-2 cursor-pointer ${
                      brushColor === color ? "border-black scale-110 shadow" : "border-transparent"
                    }`}
                    onClick={() => {
                      setBrushColor(color);
                      if (activeTool === "eraser" || activeTool === "eyedropper") {
                        setActiveTool("pencil");
                      }
                      playSound("draw", soundMuted);
                    }}
                  />
                ))}
              </div>

              {/* Custom Picker */}
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold">Custom:</span>
                <input
                  type="color"
                  value={brushColor}
                  className="w-10 h-8 border-4 border-black cursor-pointer rounded p-0 bg-transparent"
                  onChange={(e) => {
                    setBrushColor(e.target.value);
                    if (activeTool === "eraser" || activeTool === "eyedropper") {
                      setActiveTool("pencil");
                    }
                  }}
                />
                <span className="font-mono text-[9px] uppercase border-b-2 border-black font-bold">
                  {brushColor}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Middle Canvas Space: 5 Cols */}
        <div className="lg:col-span-5 flex flex-col items-center gap-4">
          <div className="nes-container with-title is-rounded bg-white w-full flex flex-col items-center">
            <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>
              Drawing Canvas
            </h3>
            
            {/* The Actual Editor Grid */}
            <div
              className="grid border-4 border-black bg-white select-none overflow-hidden mx-auto my-4 touch-none"
              style={{
                gridTemplateColumns: `repeat(${size}, 1fr)`,
                width: "100%",
                maxWidth: "380px",
                aspectRatio: "1/1",
                cursor:
                  activeTool === "eyedropper"
                    ? "copy"
                    : activeTool === "eraser"
                    ? "not-allowed"
                    : "crosshair",
              }}
              onMouseDown={(e) => {
                if (e.button === 0) setIsMouseDown(true);
              }}
            >
              {grid.map((color, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: color || "transparent",
                    backgroundImage: !color
                      ? "conic-gradient(#f3f4f6 25%, #ffffff 0 50%, #f3f4f6 0 75%, #ffffff 0)"
                      : undefined,
                    backgroundSize: !color ? "12px 12px" : undefined,
                    outline: showGridLines ? "1px solid rgba(0, 0, 0, 0.08)" : "none",
                  }}
                  className="aspect-square relative transition-all duration-75 hover:opacity-85"
                  onMouseDown={(e) => handlePixelAction(idx, e)}
                  onMouseEnter={() => handlePixelDrag(idx)}
                />
              ))}
            </div>

            {/* Quick Actions */}
            <div className="flex w-full gap-2 text-xs">
              <button
                type="button"
                className="nes-btn is-error flex-grow text-[10px] py-2"
                onClick={handleClearCanvas}
              >
                💥 Clear Canvas
              </button>
              <button
                type="button"
                className="nes-btn is-warning flex-grow text-[10px] py-2"
                onClick={() => {
                  setGrid(Array(size * size).fill(""));
                  playSound("clear", soundMuted);
                }}
              >
                🧼 Reset Grid
              </button>
            </div>
          </div>

          {/* Quick Presets Library */}
          <div className="nes-container with-title is-rounded bg-white w-full">
            <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>
              Load Game Presets
            </h3>
            <div className="flex flex-wrap gap-2 justify-center py-2">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className="nes-btn is-primary text-[9px] px-2 py-1"
                  onClick={() => loadPreset(p)}
                >
                  {p.name} ({p.size}x{p.size})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Exporters & Saves Panel: 3 Cols */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          
          {/* Storage Slots */}
          <div className="nes-container with-title is-rounded bg-white">
            <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>
              Save Slots (Local)
            </h3>
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((slot) => (
                <div key={slot} className="flex items-center justify-between border-b-2 border-dotted border-gray-300 pb-2 text-[10px]">
                  <span className="font-bold">Slot {slot}</span>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      className="nes-btn is-success py-1 px-2 text-[8px]"
                      onClick={() => handleSaveToSlot(slot)}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="nes-btn is-primary py-1 px-2 text-[8px]"
                      onClick={() => handleLoadFromSlot(slot)}
                      disabled={!savedSlots[slot]}
                      style={{ opacity: savedSlots[slot] ? 1 : 0.4 }}
                    >
                      Load
                    </button>
                    {savedSlots[slot] && (
                      <button
                        type="button"
                        className="nes-btn is-error py-1 px-2 text-[8px]"
                        onClick={() => handleClearSlot(slot)}
                      >
                        x
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Export Center */}
          <div className="nes-container with-title is-rounded bg-white">
            <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>
              Export Options
            </h3>
            <div className="flex flex-col gap-3">
              
              {/* Export Tabs */}
              <div className="flex flex-wrap gap-1 text-[8px] font-bold border-b-2 border-black pb-2">
                {(["png", "svg", "css", "react"] as ExportTab[]).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    className={`px-1.5 py-1 uppercase rounded border ${
                      exportTab === tab ? "bg-black text-white" : "bg-gray-150 hover:bg-gray-200"
                    }`}
                    onClick={() => setExportTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* PNG Download Tab Content */}
              {exportTab === "png" && (
                <div className="flex flex-col gap-2 pt-1">
                  <p className="text-[9px] text-gray-600 leading-normal">
                    Download sprite as a high-quality crisp PNG image. Choose a scale factor to prevent blur.
                  </p>
                  <div className="nes-select text-[9px]">
                    <select
                      value={pngScale}
                      onChange={(e) => setPngScale(Number(e.target.value))}
                    >
                      <option value={8}>8x Scale ({size * 8}px)</option>
                      <option value={16}>16x Scale ({size * 16}px)</option>
                      <option value={32}>32x Scale ({size * 32}px)</option>
                      <option value={64}>64x Scale ({size * 64}px)</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    className="nes-btn is-success text-[10px] w-full mt-2"
                    onClick={handleDownloadPNG}
                  >
                    💾 Download PNG
                  </button>
                </div>
              )}

              {/* SVG Tab Content */}
              {exportTab === "svg" && (
                <div className="flex flex-col gap-2 pt-1">
                  <p className="text-[9px] text-gray-600 leading-normal">
                    Get raw vector graphics XML code. Scale-independent and perfect for web layouts.
                  </p>
                  <textarea
                    readOnly
                    value={svgCode}
                    className="w-full text-[8px] font-mono p-1 border border-black bg-gray-50 h-24 rounded overflow-auto"
                  />
                  <button
                    type="button"
                    className="nes-btn is-success text-[10px] w-full"
                    onClick={() => handleCopyCode(svgCode)}
                  >
                    {copySuccess ? "Copied!" : "📋 Copy SVG"}
                  </button>
                </div>
              )}

              {/* CSS Box Shadow Tab Content */}
              {exportTab === "css" && (
                <div className="flex flex-col gap-2 pt-1">
                  <p className="text-[9px] text-gray-600 leading-normal">
                    Draw this sprite in HTML using a single empty element. Renders using CSS box-shadow offsets.
                  </p>
                  <textarea
                    readOnly
                    value={cssBoxShadowCode}
                    className="w-full text-[8px] font-mono p-1 border border-black bg-gray-50 h-24 rounded overflow-auto"
                  />
                  <button
                    type="button"
                    className="nes-btn is-success text-[10px] w-full"
                    onClick={() => handleCopyCode(cssBoxShadowCode)}
                  >
                    {copySuccess ? "Copied!" : "📋 Copy CSS"}
                  </button>
                </div>
              )}

              {/* React Component Tab Content */}
              {exportTab === "react" && (
                <div className="flex flex-col gap-2 pt-1">
                  <p className="text-[9px] text-gray-600 leading-normal">
                    Ready-to-use React sprite component. Crisp scaling settings are preset in line styles.
                  </p>
                  <textarea
                    readOnly
                    value={reactComponentCode}
                    className="w-full text-[8px] font-mono p-1 border border-black bg-gray-50 h-24 rounded overflow-auto"
                  />
                  <button
                    type="button"
                    className="nes-btn is-success text-[10px] w-full"
                    onClick={() => handleCopyCode(reactComponentCode)}
                  >
                    {copySuccess ? "Copied!" : "📋 Copy React"}
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>

      {/* Guide Section */}
      <div className="nes-container with-title is-rounded bg-white mt-4">
        <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>
          Sprite Drawing Guide
        </h3>
        <ul className="nes-list is-disc text-[10px] ml-4 leading-relaxed flex flex-col gap-2">
          <li><strong>Select Brush Size:</strong> Switch resolution buttons (8x8, 16x16, or 32x32) to adjust complexity. Your canvas remains preserved in the top-left corner!</li>
          <li><strong>Click & Drag:</strong> Hold down the left-mouse key and drag on the grid to paint quickly like a classic desktop image editor.</li>
          <li><strong>Pail Flood Fill:</strong> Choose the Bucket tool, then click on any canvas segment to replace all contiguous matching pixels with your brush color instantly.</li>
          <li><strong>Color Picker Eyedropper:</strong> Pick the Picker tool, click on any pixel in the drawing canvas to copy that pixel color into your active drawing palette.</li>
          <li><strong>Local Save Slots:</strong> Use the Local Slots menu to save drawing drafts to your browser. Slots persist across reloads.</li>
        </ul>
      </div>

    </div>
  );
}
