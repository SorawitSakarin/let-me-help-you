"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

// ----------------- FONTS DATA -----------------
const BLOCK_FONT: Record<string, string[]> = {
  A: [" ███ ", "█   █", "█████", "█   █", "█   █"],
  B: ["████ ", "█   █", "████ ", "█   █", "████ "],
  C: [" ████", "█    ", "█    ", "█    ", " ████"],
  D: ["████ ", "█   █", "█   █", "█   █", "████ "],
  E: ["█████", "█    ", "████ ", "█    ", "█████"],
  F: ["█████", "█    ", "████ ", "█    ", "█    "],
  G: [" ████", "█    ", "█  ██", "█   █", " ████"],
  H: ["█   █", "█   █", "█████", "█   █", "█   █"],
  I: ["███", " █ ", " █ ", " █ ", "███"],
  J: ["  ███", "   █ ", "   █ ", "█  █ ", " ██  "],
  K: ["█   █", "█  █ ", "███  ", "█  █ ", "█   █"],
  L: ["█    ", "█    ", "█    ", "█    ", "█████"],
  M: ["█   █", "██ ██", "█ █ █", "█   █", "█   █"],
  N: ["█   █", "██  █", "█ █ █", "█  ██", "█   █"],
  O: [" ███ ", "█   █", "█   █", "█   █", " ███ "],
  P: ["████ ", "█   █", "████ ", "█    ", "█    "],
  Q: [" ███ ", "█   █", "█   █", "█  ██", " ████"],
  R: ["████ ", "█   █", "████ ", "█  █ ", "█   █"],
  S: [" ████", "█    ", " ███ ", "    █", "████ "],
  T: ["█████", "  █  ", "  █  ", "  █  ", "  █  "],
  U: ["█   █", "█   █", "█   █", "█   █", " ███ "],
  V: ["█   █", "█   █", "█   █", " █ █ ", "  █  "],
  W: ["█   █", "█   █", "█ █ █", "██ ██", "█   █"],
  X: ["█   █", " █ █ ", "  █  ", " █ █ ", "█   █"],
  Y: ["█   █", " █ █ ", "  █  ", "  █  ", "  █  "],
  Z: ["█████", "   █ ", "  █  ", " █   ", "█████"],
  " ": ["     ", "     ", "     ", "     ", "     "],
  "0": [" ███ ", "█  ██", "█ █ █", "██  █", " ███ "],
  "1": [" ██ ", "  █ ", "  █ ", "  █ ", "████"],
  "2": [" ███ ", "█   █", "  ██ ", " █   ", "█████"],
  "3": ["████ ", "    █", " ███ ", "    █", "████ "],
  "4": ["█  █ ", "█  █ ", "█████", "   █ ", "   █ "],
  "5": ["█████", "█    ", "████ ", "    █", "████ "],
  "6": [" ████", "█    ", "████ ", "█   █", " ████"],
  "7": ["█████", "   █ ", "  █  ", " █   ", " █   "],
  "8": [" ███ ", "█   █", " ███ ", "█   █", " ███ "],
  "9": [" ███ ", "█   █", " ████", "    █", " ████"],
  "!": ["█", "█", "█", " ", "█"],
  "?": ["███ ", "   █", " ██ ", "    ", " █  "],
  ".": [" ", " ", " ", " ", "█"],
  ",": [" ", " ", " ", "█", "█"],
  "-": ["     ", "     ", "█████", "     ", "     "],
  "+": ["  █  ", "  █  ", "█████", "  █  ", "  █  "],
  "=": ["     ", "█████", "     ", "█████", "     "],
};

const SLANT_FONT: Record<string, string[]> = {
  A: ["    /\\    ", "   /  \\   ", "  / /\\ \\  ", " / ____ \\ ", "/_/    \\_\\"],
  B: ["██████\\  ", "██  __██\\ ", "██████\\|  ", "██  __██\\ ", "███████  |"],
  C: ["  ██████\\ ", " ██  __██\\", " ██ /  \\__|", " ██ |      ", " \\██████\\ "],
  D: ["██████\\   ", "██  __██\\ ", "██ |  ██ |", "██ |  ██ |", "███████  |"],
  E: ["████████\\ ", "██  _____|", "█████\\    ", "██  __|   ", "████████\\ "],
  F: ["████████\\ ", "██  _____|", "█████\\    ", "██  __|   ", "██ |      "],
  G: ["  ██████\\ ", " ██  __██\\", " ██ /  \\__|", " ██ |  ████\\", " \\██████  |"],
  H: ["███\\  ███\\", "██ |  ██ |", "████████ |", "██  __██ |", "██ |  ██ |"],
  I: ["██████\\ ", "  ██  _|", "  ██ |  ", "  ██ |  ", "██████\\ "],
  J: ["     ██\\ ", "     ██ |", "     ██ |", "██\\  ██ |", "\\██████  |"],
  K: ["███\\  ███\\", "██ | ██  |", "██████  / ", "██  __██\\ ", "██ |  ██ |"],
  L: ["███\\      ", "██ |      ", "██ |      ", "██ |      ", "████████\\ "],
  M: ["███\\     ███\\", "████\\   ████ |", "██ ██\\ ██ ██ |", "██ \\████  ██ |", "██ | \\██/  ██ |"],
  N: ["███\\  ███\\", "████\\ ██ |", "██ ██\\██ |", "██ \\████ |", "██ | \\███ |"],
  O: ["  ██████\\ ", " ██  __██\\", " ██ |  ██ |", " ██ |  ██ |", " \\██████  |"],
  P: ["██████\\  ", "██  __██\\ ", "██████  | ", "██  ___/  ", "██ |      "],
  Q: ["  ██████\\ ", " ██  __██\\", " ██ |  ██ |", " ██ |  ███ |", " \\████████ |"],
  R: ["██████\\  ", "██  __██\\ ", "██████  | ", "██  __██< ", "██ |  ██ |"],
  S: ["  ██████\\ ", " ██  __██\\", " \\██████\\ ", "  \\___██\\ ", " ██████  |"],
  T: ["████████\\", "\\__██  __|", "   ██ |   ", "   ██ |   ", "   ██ |   "],
  U: ["███\\  ███\\", "██ |  ██ |", "██ |  ██ |", "██ |  ██ |", "\\██████  |"],
  V: ["███\\  ███\\", "██ |  ██ |", "██ |  ██ |", "\\██\\  ██  /", " \\██████  / "],
  W: ["███\\     ███\\", "██ |     ██ |", "██ | ██\\ ██ |", "██ |████\\██ |", "\\████  ████  /"],
  X: ["███\\  ███\\", "\\██\\  ██  /", " \\████  / ", " /██  ██\\ ", "███\\  ███\\"],
  Y: ["███\\  ███\\", "\\██\\  ██  /", " \\████  / ", "  \\██  /  ", "   ██ |   "],
  Z: ["████████\\", "\\____██  |", "    ██  / ", "   ██  /  ", "  ████████\\"],
  " ": ["      ", "      ", "      ", "      ", "      "],
  "0": ["  ██████\\ ", " ██  __██\\", " ██ /  ██ |", " ██ |  ██ |", " \\██████  |"],
  "1": ["  ████\\ ", "  \\_██ |", "    ██ |", "    ██ |", "  ██████\\"],
  "2": ["  ██████\\ ", " ██  __██\\", " \\__/  ██ |", "  ██████  |", " ████████\\"],
  "3": [" ███████\\ ", " \\___  ██ |", "   █████  |", "   \\___██ |", " ███████  |"],
  "4": ["  █████\\  ", " ██  ██ | ", " ████████\\", " \\___██  |", "     ██  |"],
  "5": ["████████\\ ", "██  _____|", "███████\\  ", "\\____██ | ", "███████  |"],
  "6": ["  ██████\\ ", " ██  _____|", " ████████\\", " ██  __██ |", " \\██████  |"],
  "7": ["████████\\", "\\____██  |", "    ██  / ", "   ██  /  ", "  ██  /   "],
  "8": ["  ██████\\ ", " ██  __██\\", " \\██████  |", " ██  __██ |", " \\██████  |"],
  "9": ["  ██████\\ ", " ██  __██\\", " \\███████ |", "  \\____██ |", " \\██████  |"],
  "!": ["██\\ ", "██ |", "██ |", "\\__|", "██\\ "],
  "?": [" ██████\\ ", "██  __██\\", "\\__/  ██ |", "    ██  / ", "    \\__|  "],
  ".": ["   ", "   ", "   ", "   ", "██\\"],
  ",": ["   ", "   ", "   ", "██\\", "██ |"],
  "-": ["       ", "       ", "███████\\", "       ", "       "],
  "+": ["   ██\\   ", "   ██ |  ", "████████\\", "   ██ |  ", "   ██\\   "],
  "=": ["        ", "████████\\", "        ", "████████\\", "        "],
};

const CYBER_FONT: Record<string, string[]> = {
  A: [" ▄▀▀▄ ", "█ ▄▄ █", "█ ▀▀ █", "▀    ▀"],
  B: ["█▀▀█▄", "█▄▄█▀", "█  ▀█", "▀▀▀▀ "],
  C: [" ▄▀▀▄", "█  ▄▀", "█   █", " ▀▀▀ "],
  D: ["█▀▀▄ ", "█  █ ", "█▄▄▀ ", "▀▀▀  "],
  E: ["█▀▀▀", "█▀▀ ", "█▄▄▄", "▀▀▀▀"],
  F: ["█▀▀▀", "█▀▀ ", "█   ", "▀   "],
  G: [" ▄▀▀▄", "█  ▄▀", "█ ▀ █", " ▀▀▀ "],
  H: ["█  █", "█▀▀█", "█  █", "▀  ▀"],
  I: ["█▀▀", "█  ", "█  ", "▀▀▀"],
  J: ["  █", "  █", "█ █", " ▀ "],
  K: ["█ ▄▀", "██▀ ", "█ █▄", "▀  ▀"],
  L: ["█   ", "█   ", "█▄▄▄", "▀▀▀▀"],
  M: ["█▄ ▄█", "█ █ █", "█   █", "▀   ▀"],
  N: ["█▀▄ █", "█ █ █", "█  ▀█", "▀   ▀"],
  O: [" ▄▀▀▄ ", "█  ▄ █", "█ ▀▀ █", " ▀▀▀▀ "],
  P: ["█▀▀▀▄", "█▄▄▄▀", "█    ", "▀    "],
  Q: [" ▄▀▀▄ ", "█  ▄ █", "█ ▀▀ █", " ▀▀▀▀▀"],
  R: ["█▀▀▀▄", "█▄▄▄▀", "█  ▀▄", "▀   ▀"],
  S: [" ▄▀▀▀", " ▀▀▀▄", "█▄▄▄▀", "▀▀▀▀ "],
  T: ["▀█▀▀█▀", "  █   ", "  █   ", "  ▀   "],
  U: ["█  █", "█  █", "█▄▄█", "▀▀▀▀"],
  V: ["█  █", "█  █", " ▀▄▀ ", "  ▀  "],
  W: ["█    █", "█ ▄▄ █", "█ ▀▀ █", " ▀  ▀ "],
  X: ["█  █", " ▀▄▀ ", " █▄█ ", "▀  ▀"],
  Y: ["█  █", " ▀▄▀ ", "  █  ", "  ▀  "],
  Z: ["█▀▀▀▀█", "  ▄▀▀ ", " █▄▄▄▄", "▀▀▀▀▀▀"],
  " ": ["    ", "    ", "    ", "    "],
  "0": [" ▄▀▀▄ ", "█ ░░ █", "█ ░░ █", " ▀▀▀▀ "],
  "1": [" ▄█ ", "  █ ", "  █ ", " ▀▀▀"],
  "2": ["▀██▀", " ▄█ ", "██▄▄", "▀▀▀▀"],
  "3": ["▀██▀", " ▀██", "▄▄██", "▀▀▀▀"],
  "4": ["█ ▄█", "████", "  █ ", "  ▀ "],
  "5": ["████", "██▄▄", "▄▄██", "▀▀▀▀"],
  "6": [" ▄▀▀", "█▄▄▄", "█▄▄█", " ▀▀ "],
  "7": ["████", "  █ ", " █  ", " ▀  "],
  "8": [" ▄▀▀▄", " ▀▄▄▀", "█▄▄▄█", " ▀▀▀ "],
  "9": [" ▄▀▀▄", "▀▄▄██", " ▄▄█▀", " ▀▀▀ "],
  "!": ["█", "█", " ", "▀"],
  "?": ["▄▀▀▀▄", "  ▄▀ ", " █   ", " ▀   "],
  ".": [" ", " ", " ", "▀"],
  ",": [" ", " ", "▀", "▄"],
  "-": ["    ", "▄▄▄▄", "    ", "    "],
  "+": [" ▄ ", "███", " ▀ ", "   "],
  "=": ["▄▄▄", "   ", "▄▄▄", "   "],
};

// ----------------- RETRO AUDIO SYNTH -----------------
const playSound = (
  type: "click" | "success" | "load" | "clear" | "render",
  isMuted: boolean
) => {
  if (isMuted) return;
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;

    if (type === "click") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === "success") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
      osc.frequency.setValueAtTime(1046.50, now + 0.24); // C6
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.setValueAtTime(0.04, now + 0.24);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === "load") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(750, now + 0.22);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === "clear") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.15);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === "render") {
      osc.type = "square";
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.setValueAtTime(450, now + 0.05);
      osc.frequency.setValueAtTime(600, now + 0.1);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    }
  } catch (err) {
    console.error("Audio synthesis failed:", err);
  }
};

export default function RetroAsciiArtGenerator() {
  const [activeTab, setActiveTab] = useState<"text" | "image">("text");
  const [soundMuted, setSoundMuted] = useState<boolean>(false);
  const [crtMode, setCrtMode] = useState<boolean>(true);
  const [bgColor, setBgColor] = useState<"black" | "white">("black");
  const [themeColor, setThemeColor] = useState<string>("#39ff14"); // Green Phosphor
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  // Text Banner States
  const [inputText, setInputText] = useState<string>("HELLOWORLD");
  const [textFont, setTextFont] = useState<"block" | "slant" | "cyber">("slant");

  // Image Converter States
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [charWidth, setCharWidth] = useState<number>(60);
  const [brightness, setBrightness] = useState<number>(0);
  const [contrast, setContrast] = useState<number>(0);
  const [invert, setInvert] = useState<boolean>(false);
  const [charSetName, setCharSetName] = useState<"standard" | "blocks" | "binary" | "dots" | "matrix">("blocks");
  const [coloredOutput, setColoredOutput] = useState<boolean>(false);
  const [imageAsciiText, setImageAsciiText] = useState<string>("");
  const [coloredLines, setColoredLines] = useState<Array<Array<{ char: string; color: string }>> | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Generate ASCII for Text Banner
  const textOutput = useMemo(() => {
    if (!inputText) return "";
    const cleanText = inputText.replace(/[^a-zA-Z0-9 !?,.+=_-]/g, "");
    const font = textFont === "slant" ? SLANT_FONT : textFont === "cyber" ? CYBER_FONT : BLOCK_FONT;
    const firstLetter = font[cleanText[0]?.toUpperCase()] || font[" "];
    const height = firstLetter ? firstLetter.length : 5;
    const lines = Array(height).fill("");

    for (let i = 0; i < cleanText.length; i++) {
      const char = cleanText[i].toUpperCase();
      const letterLines = font[char] || font[" "] || Array(height).fill(" ");
      for (let r = 0; r < height; r++) {
        lines[r] += (letterLines[r] || "") + (textFont === "slant" ? "" : " ");
      }
    }
    return lines.join("\n");
  }, [inputText, textFont]);

  // Image Processing trigger
  const processUploadedImage = useCallback(() => {
    if (!imageRef.current) return;
    playSound("render", soundMuted);

    const CHAR_SETS: Record<string, string[]> = {
      standard: ["@", "#", "S", "%", "?", "*", "+", ";", ":", ",", ".", " "],
      blocks: ["█", "▓", "▒", "░", " "],
      binary: ["1", "0", " "],
      dots: ["⣿", "⣾", "⣽", "⣻", "⢿", "⡿", "⣟", "⣯", "⣧", "⣇", "⡇", "⠇", "⠃", "⠁", " "],
      matrix: ["█", "▄", "▀", "▌", "▐", "░", " "],
    };

    const img = imageRef.current;
    const origWidth = img.naturalWidth || img.width || 100;
    const origHeight = img.naturalHeight || img.height || 100;

    // Aspect ratio correction (monospace is taller)
    const asciiWidth = charWidth;
    const asciiHeight = Math.max(1, Math.round(((asciiWidth * origHeight) / origWidth) * 0.55));

    const canvas = document.createElement("canvas");
    canvas.width = asciiWidth;
    canvas.height = asciiHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(img, 0, 0, asciiWidth, asciiHeight);
    const imgData = ctx.getImageData(0, 0, asciiWidth, asciiHeight);
    const data = imgData.data;
    const chars = CHAR_SETS[charSetName];

    let asciiStr = "";
    const linesList: Array<Array<{ char: string; color: string }>> = [];

    // Contrast factor
    const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
    const adjustVal = (c: number) => Math.min(255, Math.max(0, factor * (c - 128) + 128));

    for (let y = 0; y < asciiHeight; y++) {
      const rowColors: Array<{ char: string; color: string }> = [];
      let rowText = "";
      for (let x = 0; x < asciiWidth; x++) {
        const idx = (y * asciiWidth + x) * 4;
        let r = data[idx];
        let g = data[idx + 1];
        let b = data[idx + 2];
        const a = data[idx + 3];

        if (a < 10) {
          r = bgColor === "black" ? 0 : 255;
          g = bgColor === "black" ? 0 : 255;
          b = bgColor === "black" ? 0 : 255;
        }

        const adjR = Math.min(255, Math.max(0, adjustVal(r) + brightness));
        const adjG = Math.min(255, Math.max(0, adjustVal(g) + brightness));
        const adjB = Math.min(255, Math.max(0, adjustVal(b) + brightness));

        let grayscale = 0.299 * adjR + 0.587 * adjG + 0.114 * adjB;
        if (invert) {
          grayscale = 255 - grayscale;
        }

        const charIdx = Math.min(chars.length - 1, Math.floor((grayscale / 255) * chars.length));
        const char = chars[charIdx];
        rowText += char;
        rowColors.push({ char, color: `rgb(${adjR}, ${adjG}, ${adjB})` });
      }
      asciiStr += rowText + "\n";
      linesList.push(rowColors);
    }

    setImageAsciiText(asciiStr);
    setColoredLines(linesList);
  }, [charWidth, brightness, contrast, invert, charSetName, bgColor, soundMuted]);

  // Re-run image processing when sliders or parameters change
  useEffect(() => {
    if (activeTab === "image" && imagePreview) {
      const timer = setTimeout(() => {
        processUploadedImage();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeTab, imagePreview, processUploadedImage]);

  // Load Preset shapes onto canvas, convert to URL, and treat as input image
  const loadPresetImage = (presetKey: "invader" | "heart" | "skull" | "ghost") => {
    playSound("load", soundMuted);
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fill background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 64, 64);
    ctx.fillStyle = "#000000";

    if (presetKey === "invader") {
      // Simple 8-bit invader pattern
      const pattern = [
        "00100100",
        "00011000",
        "01111110",
        "11011011",
        "11111111",
        "01111110",
        "00100100",
        "01000010",
      ];
      const scale = 6;
      const offsetX = 8;
      const offsetY = 8;
      for (let r = 0; r < pattern.length; r++) {
        for (let c = 0; c < pattern[r].length; c++) {
          if (pattern[r][c] === "1") {
            ctx.fillRect(offsetX + c * scale, offsetY + r * scale, scale, scale);
          }
        }
      }
    } else if (presetKey === "heart") {
      const pattern = [
        "0000000000",
        "0011001100",
        "0111101110",
        "1111111111",
        "1111111111",
        "0111111110",
        "0011111100",
        "0001111000",
        "0000110000",
        "0000000000",
      ];
      const scale = 5;
      const offsetX = 7;
      const offsetY = 7;
      for (let r = 0; r < pattern.length; r++) {
        for (let c = 0; c < pattern[r].length; c++) {
          if (pattern[r][c] === "1") {
            ctx.fillRect(offsetX + c * scale, offsetY + r * scale, scale, scale);
          }
        }
      }
    } else if (presetKey === "ghost") {
      const pattern = [
        "0001111000",
        "0111111110",
        "1101110111",
        "1101110111",
        "1111111111",
        "1111111111",
        "1111111111",
        "1010101010",
      ];
      const scale = 6;
      const offsetX = 8;
      const offsetY = 8;
      for (let r = 0; r < pattern.length; r++) {
        for (let c = 0; c < pattern[r].length; c++) {
          if (pattern[r][c] === "1") {
            ctx.fillRect(offsetX + c * scale, offsetY + r * scale, scale, scale);
          }
        }
      }
    } else if (presetKey === "skull") {
      const pattern = [
        "0011111100",
        "0111111110",
        "1101111011",
        "1101111011",
        "1111111111",
        "0110110110",
        "0111111110",
        "0010101000",
      ];
      const scale = 6;
      const offsetX = 8;
      const offsetY = 8;
      for (let r = 0; r < pattern.length; r++) {
        for (let c = 0; c < pattern[r].length; c++) {
          if (pattern[r][c] === "1") {
            ctx.fillRect(offsetX + c * scale, offsetY + r * scale, scale, scale);
          }
        }
      }
    }

    const dataUrl = canvas.toDataURL();
    setImagePreview(dataUrl);
  };

  // Image Upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    playSound("load", soundMuted);

    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Clipboard Copier
  const copyToClipboard = () => {
    const textToCopy = activeTab === "text" ? textOutput : imageAsciiText;
    if (!textToCopy) return;

    navigator.clipboard.writeText(textToCopy);
    playSound("success", soundMuted);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Download raw text file
  const downloadTextFile = () => {
    const text = activeTab === "text" ? textOutput : imageAsciiText;
    if (!text) return;

    playSound("success", soundMuted);
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ascii-art-${activeTab}-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Download PNG representation
  const handleExportPng = () => {
    const text = activeTab === "text" ? textOutput : imageAsciiText;
    if (!text) return;

    playSound("success", soundMuted);
    const lines = text.split("\n").filter((l) => l.length > 0 || textOutput); // preserve blank lines in banner text
    const charWidthPx = 8;
    const charHeightPx = 14;
    const padding = 20;

    const maxLineLen = Math.max(...lines.map((l) => l.length));
    const canvas = document.createElement("canvas");
    canvas.width = maxLineLen * charWidthPx + padding * 2;
    canvas.height = lines.length * charHeightPx + padding * 2;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = bgColor === "black" ? "#0f0f0f" : "#fafafa";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "12px Courier New, monospace";
    ctx.textBaseline = "top";

    for (let y = 0; y < lines.length; y++) {
      const line = lines[y];
      for (let x = 0; x < line.length; x++) {
        const char = line[x];
        if (activeTab === "image" && coloredOutput && coloredLines && coloredLines[y]?.[x]) {
          ctx.fillStyle = coloredLines[y][x].color;
        } else {
          ctx.fillStyle = themeColor;
        }
        ctx.fillText(char, padding + x * charWidthPx, padding + y * charHeightPx);
      }
    }

    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `ascii-art-${activeTab}-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto px-4">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-4 border-black pb-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
            <span className="text-red-500">👾</span> Retro ASCII Art Generator
          </h1>
          <p className="text-[10px] text-gray-500 font-mono mt-1">
            Build 8-bit banner words or render classic images as stylized text graphics.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className={`nes-btn text-xs md:text-sm ${soundMuted ? "is-error" : "is-success"}`}
            onClick={() => {
              setSoundMuted(!soundMuted);
              playSound("click", !soundMuted);
            }}
          >
            {soundMuted ? "🔇 Mute" : "🔊 Audio"}
          </button>
          <Link href="/" className="nes-btn text-xs md:text-sm">
            Back
          </Link>
        </div>
      </div>

      {/* Mode selectors */}
      <div className="flex border-b-4 border-black">
        <button
          type="button"
          onClick={() => {
            playSound("click", soundMuted);
            setActiveTab("text");
          }}
          className={`flex-1 text-center py-2 font-bold border-r-4 border-black text-xs md:text-sm ${
            activeTab === "text" ? "bg-black text-white" : "bg-white hover:bg-gray-100"
          }`}
        >
          🔤 Text Banner Maker
        </button>
        <button
          type="button"
          onClick={() => {
            playSound("click", soundMuted);
            setActiveTab("image");
          }}
          className={`flex-1 text-center py-2 font-bold text-xs md:text-sm ${
            activeTab === "image" ? "bg-black text-white" : "bg-white hover:bg-gray-100"
          }`}
        >
          🖼️ Image to Text
        </button>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Settings Panel: 4 Cols */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* TAB 1: Text Banner Form */}
          {activeTab === "text" && (
            <div className="nes-container with-title is-rounded bg-white">
              <h3 className="title text-xs bg-white">Banner Text</h3>
              <div className="flex flex-col gap-4">
                <div className="nes-field">
                  <label htmlFor="banner_input" className="text-[10px] font-bold block mb-1">
                    Input Text:
                  </label>
                  <input
                    type="text"
                    id="banner_input"
                    className="nes-input text-xs"
                    value={inputText}
                    onChange={(e) => {
                      setInputText(e.target.value.slice(0, 30));
                      playSound("click", soundMuted);
                    }}
                    placeholder="ENTER WORDS"
                  />
                </div>

                <div className="nes-field">
                  <label className="text-[10px] font-bold block mb-1">Select Font Style:</label>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs">
                      <input
                        type="radio"
                        className="nes-radio"
                        name="textFont"
                        checked={textFont === "slant"}
                        onChange={() => {
                          setTextFont("slant");
                          playSound("click", soundMuted);
                        }}
                      />
                      <span>Slant 3D</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-xs">
                      <input
                        type="radio"
                        className="nes-radio"
                        name="textFont"
                        checked={textFont === "block"}
                        onChange={() => {
                          setTextFont("block");
                          playSound("click", soundMuted);
                        }}
                      />
                      <span>Classic Block</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-xs">
                      <input
                        type="radio"
                        className="nes-radio"
                        name="textFont"
                        checked={textFont === "cyber"}
                        onChange={() => {
                          setTextFont("cyber");
                          playSound("click", soundMuted);
                        }}
                      />
                      <span>Leet Cyber</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Image Converter Form */}
          {activeTab === "image" && (
            <div className="nes-container with-title is-rounded bg-white">
              <h3 className="title text-xs bg-white">Convert Image</h3>
              <div className="flex flex-col gap-4">
                {/* Upload field */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold">Upload Local Image:</span>
                  <button
                    type="button"
                    className="nes-btn text-xs w-full"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    📂 Select File
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>

                {/* Preset quick buttons */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold">Or Load Retro Preset:</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      className="nes-btn is-primary text-[9px] p-1"
                      onClick={() => loadPresetImage("invader")}
                    >
                      👾 Invader
                    </button>
                    <button
                      type="button"
                      className="nes-btn is-error text-[9px] p-1"
                      onClick={() => loadPresetImage("heart")}
                    >
                      ❤️ Heart
                    </button>
                    <button
                      type="button"
                      className="nes-btn is-warning text-[9px] p-1"
                      onClick={() => loadPresetImage("ghost")}
                    >
                      👻 Ghost
                    </button>
                    <button
                      type="button"
                      className="nes-btn is-normal text-[9px] p-1"
                      onClick={() => loadPresetImage("skull")}
                    >
                      💀 Skull
                    </button>
                  </div>
                </div>

                {/* Image Previews */}
                {imagePreview && (
                  <div className="border border-black p-2 bg-gray-50 flex items-center justify-center relative rounded">
                    <Image
                      ref={(el) => {
                        imageRef.current = el as unknown as HTMLImageElement;
                        if (el && imagePreview) {
                          const imgObj = el as unknown as HTMLImageElement;
                          imgObj.onload = () => processUploadedImage();
                        }
                      }}
                      src={imagePreview}
                      alt="Upload Preview"
                      width={120}
                      height={96}
                      className="max-h-24 object-contain max-w-full"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 text-[8px] bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center font-bold"
                      onClick={() => {
                        playSound("clear", soundMuted);
                        setImagePreview(null);
                        setImageAsciiText("");
                        setColoredLines(null);
                      }}
                    >
                      ×
                    </button>
                  </div>
                )}

                {/* Grid Width Slider */}
                <div>
                  <div className="flex justify-between text-[10px] font-bold mb-1">
                    <label htmlFor="char_width">Char Width:</label>
                    <span>{charWidth} px</span>
                  </div>
                  <input
                    type="range"
                    id="char_width"
                    min="20"
                    max="120"
                    step="5"
                    value={charWidth}
                    onChange={(e) => {
                      setCharWidth(parseInt(e.target.value));
                      playSound("click", soundMuted);
                    }}
                    className="w-full cursor-pointer"
                  />
                </div>

                {/* Brightness Slider */}
                <div>
                  <div className="flex justify-between text-[10px] font-bold mb-1">
                    <label htmlFor="brightness">Brightness:</label>
                    <span>{brightness > 0 ? `+${brightness}` : brightness}</span>
                  </div>
                  <input
                    type="range"
                    id="brightness"
                    min="-100"
                    max="100"
                    step="5"
                    value={brightness}
                    onChange={(e) => setBrightness(parseInt(e.target.value))}
                    className="w-full cursor-pointer"
                  />
                </div>

                {/* Contrast Slider */}
                <div>
                  <div className="flex justify-between text-[10px] font-bold mb-1">
                    <label htmlFor="contrast">Contrast:</label>
                    <span>{contrast > 0 ? `+${contrast}` : contrast}</span>
                  </div>
                  <input
                    type="range"
                    id="contrast"
                    min="-100"
                    max="100"
                    step="5"
                    value={contrast}
                    onChange={(e) => setContrast(parseInt(e.target.value))}
                    className="w-full cursor-pointer"
                  />
                </div>

                {/* Checkboxes */}
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      className="nes-checkbox"
                      checked={invert}
                      onChange={(e) => {
                        setInvert(e.target.checked);
                        playSound("click", soundMuted);
                      }}
                    />
                    <span>Invert Brightness</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      className="nes-checkbox"
                      checked={coloredOutput}
                      onChange={(e) => {
                        setColoredOutput(e.target.checked);
                        playSound("click", soundMuted);
                      }}
                    />
                    <span>Colored HTML Output</span>
                  </label>
                </div>

                {/* Char Set selection */}
                <div className="nes-field">
                  <label htmlFor="char_set" className="text-[10px] font-bold block mb-1">
                    Character Set:
                  </label>
                  <div className="nes-select">
                    <select
                      id="char_set"
                      value={charSetName}
                      className="text-xs"
                      onChange={(e) => {
                        setCharSetName(e.target.value as "standard" | "blocks" | "binary" | "dots" | "matrix");
                        playSound("click", soundMuted);
                      }}
                    >
                      <option value="blocks">Blocks (█ ▓ ▒ ░)</option>
                      <option value="standard">Standard (@ # S % ?)</option>
                      <option value="dots">Dots (⣿ ⣾ ⣽)</option>
                      <option value="matrix">Matrix (█ ▄ ▀)</option>
                      <option value="binary">Binary (1 0)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Screen Customizer Container */}
          <div className="nes-container with-title is-rounded bg-white">
            <h3 className="title text-xs bg-white">Display & Style</h3>
            <div className="flex flex-col gap-4">
              {/* Theme palette picker */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold">Retro Theme Color:</span>
                <div className="flex gap-2 flex-wrap">
                  <button
                    type="button"
                    title="Green Phosphor"
                    className="w-6 h-6 border-2 border-black rounded-full cursor-pointer"
                    style={{ backgroundColor: "#39ff14" }}
                    onClick={() => {
                      setThemeColor("#39ff14");
                      playSound("click", soundMuted);
                    }}
                  />
                  <button
                    type="button"
                    title="Amber Terminal"
                    className="w-6 h-6 border-2 border-black rounded-full cursor-pointer"
                    style={{ backgroundColor: "#ffb000" }}
                    onClick={() => {
                      setThemeColor("#ffb000");
                      playSound("click", soundMuted);
                    }}
                  />
                  <button
                    type="button"
                    title="Cyberpunk Pink"
                    className="w-6 h-6 border-2 border-black rounded-full cursor-pointer"
                    style={{ backgroundColor: "#ff007f" }}
                    onClick={() => {
                      setThemeColor("#ff007f");
                      playSound("click", soundMuted);
                    }}
                  />
                  <button
                    type="button"
                    title="Matrix Blue"
                    className="w-6 h-6 border-2 border-black rounded-full cursor-pointer"
                    style={{ backgroundColor: "#00e5ff" }}
                    onClick={() => {
                      setThemeColor("#00e5ff");
                      playSound("click", soundMuted);
                    }}
                  />
                  <button
                    type="button"
                    title="Monochrome White"
                    className="w-6 h-6 border-2 border-black rounded-full cursor-pointer"
                    style={{ backgroundColor: "#ffffff" }}
                    onClick={() => {
                      setThemeColor("#ffffff");
                      playSound("click", soundMuted);
                    }}
                  />
                </div>
              </div>

              {/* Background Color radio */}
              <div>
                <span className="text-[10px] font-bold block mb-1">Canvas Background:</span>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-xs">
                    <input
                      type="radio"
                      className="nes-radio"
                      name="canvasBg"
                      checked={bgColor === "black"}
                      onChange={() => {
                        setBgColor("black");
                        playSound("click", soundMuted);
                      }}
                    />
                    <span>Black</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs">
                    <input
                      type="radio"
                      className="nes-radio"
                      name="canvasBg"
                      checked={bgColor === "white"}
                      onChange={() => {
                        setBgColor("white");
                        playSound("click", soundMuted);
                      }}
                    />
                    <span>White</span>
                  </label>
                </div>
              </div>

              {/* CRT Scanline Toggle */}
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  className="nes-checkbox"
                  checked={crtMode}
                  onChange={(e) => {
                    setCrtMode(e.target.checked);
                    playSound("click", soundMuted);
                  }}
                />
                <span>CRT Screen Effect</span>
              </label>
            </div>
          </div>
        </div>

        {/* Output Screen Panel: 8 Cols */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* CRT Terminal Screen */}
          <div className="nes-container with-title is-dark is-rounded">
            <h3 className="title text-xs" style={{ backgroundColor: "#212529" }}>
              📺 CRT Text Monitor Output
            </h3>

            <div
              className={`relative overflow-hidden border-2 border-gray-600 rounded p-4 ${
                bgColor === "black" ? "bg-black text-green-500" : "bg-white text-black"
              }`}
              style={{ minHeight: "360px" }}
            >
              {/* Scanline layer overlay */}
              {crtMode && (
                <div
                  className="pointer-events-none absolute inset-0 z-10"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)",
                    backgroundSize: "100% 4px",
                  }}
                />
              )}

              {/* CRT Glass Flicker & Glow filter */}
              {crtMode && (
                <div
                  className="pointer-events-none absolute inset-0 z-20 opacity-15"
                  style={{
                    boxShadow: "inset 0 0 80px rgba(0,255,0,0.3)",
                    animation: "crt-flicker 0.15s infinite",
                  }}
                />
              )}

              {/* Output Content */}
              <div className="w-full overflow-auto max-h-[500px]">
                {activeTab === "text" && (
                  <pre
                    className="font-mono text-left select-all whitespace-pre leading-[1.1]"
                    style={{
                      color: themeColor,
                      fontSize:
                        textOutput.length > 200
                          ? "7px"
                          : textOutput.length > 100
                          ? "9px"
                          : "11px",
                      textShadow: crtMode ? `0 0 4px ${themeColor}` : "none",
                    }}
                  >
                    {textOutput || "ENTER TEXT ON LEFT TO RENDER"}
                  </pre>
                )}

                {activeTab === "image" && (
                  <>
                    {!imagePreview && (
                      <div className="flex flex-col items-center justify-center gap-2 py-24 text-gray-500 font-mono text-xs">
                        <span>[ NO SOURCE FILE LOADED ]</span>
                        <span>UPLOAD AN IMAGE OR CLICK A RETRO PRESET</span>
                      </div>
                    )}

                    {imagePreview && coloredOutput && coloredLines && (
                      <pre
                        className="font-mono text-left select-all whitespace-pre leading-[0.8] tracking-[0.05em]"
                        style={{
                          fontSize:
                            charWidth > 80 ? "6px" : charWidth > 50 ? "8px" : "10px",
                          textShadow: crtMode ? "0 0 2px rgba(255,255,255,0.2)" : "none",
                        }}
                      >
                        {coloredLines.map((row, rIdx) => (
                          <React.Fragment key={rIdx}>
                            {row.map((item, cIdx) => (
                              <span key={cIdx} style={{ color: item.color }}>
                                {item.char}
                              </span>
                            ))}
                            {"\n"}
                          </React.Fragment>
                        ))}
                      </pre>
                    )}

                    {imagePreview && !coloredOutput && (
                      <pre
                        className="font-mono text-left select-all whitespace-pre leading-[0.8] tracking-[0.05em]"
                        style={{
                          color: themeColor,
                          fontSize:
                            charWidth > 80 ? "6px" : charWidth > 50 ? "8px" : "10px",
                          textShadow: crtMode ? `0 0 4px ${themeColor}` : "none",
                        }}
                      >
                        {imageAsciiText || "PROCESSING IMAGE..."}
                      </pre>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Export and action triggers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 pt-2">
              <button
                type="button"
                className="nes-btn is-success text-xs flex items-center justify-center gap-1"
                onClick={copyToClipboard}
                disabled={activeTab === "text" ? !textOutput : !imageAsciiText}
              >
                📋 {copySuccess ? "Copied!" : "Copy Text"}
              </button>

              <button
                type="button"
                className="nes-btn is-primary text-xs flex items-center justify-center gap-1"
                onClick={downloadTextFile}
                disabled={activeTab === "text" ? !textOutput : !imageAsciiText}
              >
                💾 Save .TXT
              </button>

              <button
                type="button"
                className="nes-btn is-warning text-xs flex items-center justify-center gap-1"
                onClick={handleExportPng}
                disabled={activeTab === "text" ? !textOutput : !imageAsciiText}
              >
                🖼️ Export PNG
              </button>
            </div>
          </div>

          {/* Guide Section */}
          <div className="nes-container with-title is-rounded bg-white">
            <h3 className="title text-xs bg-white">How to Use</h3>
            <ul className="nes-list is-disc text-[10px] leading-relaxed flex flex-col gap-2 ml-4">
              <li>
                <strong>ASCII text banner:</strong> Type any alphanumeric text in the box. Choose between 3 custom retro fonts. The banner updates instantly.
              </li>
              <li>
                <strong>Image conversion:</strong> Select an image file or choose one of our 4 default gaming presets. The converter scales your image to characters.
              </li>
              <li>
                <strong>Adjust fine-tuning:</strong> Move sliders for brightness and contrast to capture shading details. Tweak character widths to fit your terminal limits.
              </li>
              <li>
                <strong>Custom display options:</strong> Apply scanlines for an authentic phosphor terminal look. Pick from Green Phosphor, Amber PIP-Boy, or Matrix Cyan palettes.
              </li>
              <li>
                <strong>PNG Exporter:</strong> Creates a downloadable image of your text output styled with your background and font color settings. Perfect for sharing!
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Embedded CSS keyframe styles for CRT Flicker */}
      <style jsx global>{`
        @keyframes crt-flicker {
          0% {
            opacity: 0.15;
          }
          50% {
            opacity: 0.13;
          }
          100% {
            opacity: 0.16;
          }
        }
      `}</style>
    </div>
  );
}
