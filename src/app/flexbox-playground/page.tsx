"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

interface FlexItem {
  id: number;
  name: string;
  icon: string;
  order: number;
  flexGrow: number;
  flexShrink: number;
  alignSelf: string;
  color: string;
}

const INITIAL_ITEMS: FlexItem[] = [
  { id: 1, name: 'Mario', icon: 'nes-mario', order: 0, flexGrow: 0, flexShrink: 1, alignSelf: 'auto', color: '#ffadad' },
  { id: 2, name: 'Ash', icon: 'nes-ash', order: 0, flexGrow: 0, flexShrink: 1, alignSelf: 'auto', color: '#ffd6a5' },
  { id: 3, name: 'Bulbasaur', icon: 'nes-bulbasaur', order: 0, flexGrow: 0, flexShrink: 1, alignSelf: 'auto', color: '#caffbf' },
  { id: 4, name: 'Charmander', icon: 'nes-charmander', order: 0, flexGrow: 0, flexShrink: 1, alignSelf: 'auto', color: '#9bf6ff' },
];

const EXTRA_TEMPLATES = [
  { name: 'Squirtle', icon: 'nes-squirtle', color: '#a0c4ff' },
  { name: 'Kirby', icon: 'nes-kirby', color: '#ffc6ff' },
  { name: 'Bcrikko', icon: 'nes-bcrikko', color: '#bdb2ff' },
  { name: 'Pokeball', icon: 'nes-pokeball', color: '#e2e2e2' },
  { name: 'Octocat', icon: 'nes-octocat', color: '#f4f4f4' },
];

// Presets for learning
const PRESETS = {
  default: {
    name: "Default (Start)",
    direction: "row" as const,
    justify: "flex-start",
    align: "stretch",
    wrap: "nowrap",
    gap: 10,
    height: 200,
    items: [
      { id: 1, order: 0, flexGrow: 0, flexShrink: 1, alignSelf: 'auto' },
      { id: 2, order: 0, flexGrow: 0, flexShrink: 1, alignSelf: 'auto' },
      { id: 3, order: 0, flexGrow: 0, flexShrink: 1, alignSelf: 'auto' },
      { id: 4, order: 0, flexGrow: 0, flexShrink: 1, alignSelf: 'auto' },
    ]
  },
  perfectCenter: {
    name: "Perfect Center",
    direction: "row" as const,
    justify: "center",
    align: "center",
    wrap: "nowrap",
    gap: 10,
    height: 200,
    items: [
      { id: 1, order: 0, flexGrow: 0, flexShrink: 1, alignSelf: 'auto' },
      { id: 2, order: 0, flexGrow: 0, flexShrink: 1, alignSelf: 'auto' },
    ]
  },
  navbar: {
    name: "Navbar (Space Between)",
    direction: "row" as const,
    justify: "space-between",
    align: "center",
    wrap: "nowrap",
    gap: 15,
    height: 80,
    items: [
      { id: 1, order: 0, flexGrow: 0, flexShrink: 1, alignSelf: 'auto' },
      { id: 2, order: 0, flexGrow: 1, flexShrink: 1, alignSelf: 'auto' }, // spacer
      { id: 3, order: 0, flexGrow: 0, flexShrink: 1, alignSelf: 'auto' },
    ]
  },
  cardGrid: {
    name: "Wrapping Cards",
    direction: "row" as const,
    justify: "center",
    align: "stretch",
    wrap: "wrap",
    gap: 15,
    height: 250,
    items: [
      { id: 1, order: 0, flexGrow: 1, flexShrink: 1, alignSelf: 'auto' },
      { id: 2, order: 0, flexGrow: 1, flexShrink: 1, alignSelf: 'auto' },
      { id: 3, order: 0, flexGrow: 1, flexShrink: 1, alignSelf: 'auto' },
      { id: 4, order: 0, flexGrow: 1, flexShrink: 1, alignSelf: 'auto' },
      { id: 5, order: 0, flexGrow: 1, flexShrink: 1, alignSelf: 'auto' },
    ]
  },
  sidebar: {
    name: "Sidebar & Content",
    direction: "row" as const,
    justify: "flex-start",
    align: "stretch",
    wrap: "nowrap" as const,
    gap: 15,
    height: 200,
    items: [
      { id: 1, order: 0, flexGrow: 0, flexShrink: 0, alignSelf: 'auto' }, // sidebar
      { id: 2, order: 0, flexGrow: 1, flexShrink: 1, alignSelf: 'auto' }, // main content
    ]
  }
} as const;

const playBeep = (type: 'click' | 'success' | 'add' | 'remove') => {
  if (typeof window === 'undefined') return;
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'success') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16); // G5
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } else if (type === 'add') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(350, ctx.currentTime);
      osc.frequency.setValueAtTime(700, ctx.currentTime + 0.07);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } else if (type === 'remove') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.setValueAtTime(220, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    }
  } catch (e) {
    console.warn("Web Audio API is not supported or was blocked.", e);
  }
};

export default function FlexboxPlayground() {
  const [flexDirection, setFlexDirection] = useState<'row' | 'row-reverse' | 'column' | 'column-reverse'>('row');
  const [justifyContent, setJustifyContent] = useState<string>('flex-start');
  const [alignItems, setAlignItems] = useState<string>('stretch');
  const [flexWrap, setFlexWrap] = useState<'nowrap' | 'wrap' | 'wrap-reverse'>('nowrap');
  const [gap, setGap] = useState<number>(10);
  const [containerHeight, setContainerHeight] = useState<number>(200);

  const [items, setItems] = useState<FlexItem[]>(INITIAL_ITEMS);
  const [selectedId, setSelectedId] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  // Active selected item
  const selectedItem = useMemo(() => {
    return items.find(item => item.id === selectedId) || items[0] || null;
  }, [items, selectedId]);

  const handleSelect = (id: number) => {
    playBeep('click');
    setSelectedId(id);
  };

  const handleAddItem = () => {
    if (items.length >= 8) return;
    playBeep('add');
    const nextIndex = items.length;
    const template = EXTRA_TEMPLATES[nextIndex % EXTRA_TEMPLATES.length];
    
    // Generate new unique ID
    const newId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
    const newItem: FlexItem = {
      id: newId,
      name: `${template.name}`,
      icon: template.icon,
      order: 0,
      flexGrow: 0,
      flexShrink: 1,
      alignSelf: 'auto',
      color: template.color
    };

    setItems([...items, newItem]);
    setSelectedId(newId);
  };

  const handleRemoveItem = () => {
    if (items.length <= 2) return;
    playBeep('remove');
    const updatedItems = items.slice(0, -1);
    setItems(updatedItems);
    
    // If deleted item was selected, fallback to the last remaining item
    if (selectedId === items[items.length - 1].id) {
      setSelectedId(updatedItems[updatedItems.length - 1].id);
    }
  };

  const updateSelectedProperty = (key: keyof FlexItem, value: any) => {
    if (!selectedItem) return;
    setItems(prev => prev.map(item => {
      if (item.id === selectedId) {
        return { ...item, [key]: value };
      }
      return item;
    }));
  };

  const handleReset = () => {
    playBeep('click');
    setFlexDirection('row');
    setJustifyContent('flex-start');
    setAlignItems('stretch');
    setFlexWrap('nowrap');
    setGap(10);
    setContainerHeight(200);
    setItems(INITIAL_ITEMS.map(i => ({ ...i })));
    setSelectedId(1);
  };

  const loadPreset = (presetKey: keyof typeof PRESETS) => {
    playBeep('success');
    const p = PRESETS[presetKey];
    setFlexDirection(p.direction);
    setJustifyContent(p.justify);
    setAlignItems(p.align);
    setFlexWrap(p.wrap);
    setGap(p.gap);
    setContainerHeight(p.height);

    // Reconstruct items list
    const presetItems = p.items.map((itemSpec, idx) => {
      const template = idx < INITIAL_ITEMS.length 
        ? INITIAL_ITEMS[idx] 
        : { name: EXTRA_TEMPLATES[(idx - INITIAL_ITEMS.length) % EXTRA_TEMPLATES.length].name, icon: EXTRA_TEMPLATES[(idx - INITIAL_ITEMS.length) % EXTRA_TEMPLATES.length].icon, color: EXTRA_TEMPLATES[(idx - INITIAL_ITEMS.length) % EXTRA_TEMPLATES.length].color };

      return {
        id: itemSpec.id,
        name: template.name,
        icon: template.icon,
        order: itemSpec.order,
        flexGrow: itemSpec.flexGrow,
        flexShrink: itemSpec.flexShrink,
        alignSelf: itemSpec.alignSelf,
        color: template.color
      };
    });
    setItems(presetItems);
    setSelectedId(presetItems[0]?.id || 1);
  };

  // Compile CSS Code
  const generatedCSS = useMemo(() => {
    let css = `.flex-container {\n`;
    css += `  display: flex;\n`;
    css += `  flex-direction: ${flexDirection};\n`;
    css += `  flex-wrap: ${flexWrap};\n`;
    css += `  justify-content: ${justifyContent};\n`;
    css += `  align-items: ${alignItems};\n`;
    css += `  gap: ${gap}px;\n`;
    css += `  height: ${containerHeight}px;\n`;
    css += `}\n\n`;

    items.forEach((item, index) => {
      const hasCustomOrder = item.order !== 0;
      const hasCustomGrow = item.flexGrow !== 0;
      const hasCustomShrink = item.flexShrink !== 1;
      const hasCustomAlign = item.alignSelf !== 'auto';

      if (hasCustomOrder || hasCustomGrow || hasCustomShrink || hasCustomAlign) {
        css += `.flex-item-${index + 1} (${item.name.toLowerCase()}) {\n`;
        if (hasCustomOrder) css += `  order: ${item.order};\n`;
        if (hasCustomGrow || hasCustomShrink) {
          css += `  flex-grow: ${item.flexGrow};\n`;
          css += `  flex-shrink: ${item.flexShrink};\n`;
        }
        if (hasCustomAlign) css += `  align-self: ${item.alignSelf};\n`;
        css += `}\n\n`;
      }
    });

    return css.trim();
  }, [flexDirection, justifyContent, alignItems, flexWrap, gap, containerHeight, items]);

  const handleCopyCSS = () => {
    navigator.clipboard.writeText(generatedCSS);
    playBeep('success');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
        <h2 className="text-xl md:text-2xl flex items-center gap-3">
          <i className="nes-icon trophy is-medium"></i>
          Retro Flexbox Playground
        </h2>
        <Link href="/" className="nes-btn text-sm" onClick={() => playBeep('click')}>
          Back to Home
        </Link>
      </div>

      {/* Quick Presets */}
      <div className="nes-container with-title is-rounded bg-white">
        <h3 className="title text-xs bg-white">Preset Playgrounds</h3>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(PRESETS) as Array<keyof typeof PRESETS>).map((key) => (
            <button
              key={key}
              type="button"
              className="nes-btn is-primary text-xs px-3 py-1"
              onClick={() => loadPreset(key)}
            >
              {PRESETS[key].name}
            </button>
          ))}
          <button
            type="button"
            className="nes-btn is-error text-xs px-3 py-1 ml-auto"
            onClick={handleReset}
          >
            Reset All
          </button>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Controls Column (Left) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Container Controls */}
          <div className="nes-container with-title is-rounded bg-white">
            <h3 className="title text-xs bg-white">Container Options</h3>
            
            <div className="flex flex-col gap-4 text-xs">
              
              {/* Flex Direction */}
              <div>
                <label className="block mb-2 font-bold">flex-direction</label>
                <div className="flex flex-wrap gap-2">
                  {(['row', 'row-reverse', 'column', 'column-reverse'] as const).map((dir) => (
                    <button
                      key={dir}
                      type="button"
                      className={`nes-btn text-[10px] px-2 py-1 ${flexDirection === dir ? 'is-success' : ''}`}
                      onClick={() => { playBeep('click'); setFlexDirection(dir); }}
                    >
                      {dir}
                    </button>
                  ))}
                </div>
              </div>

              {/* Justify Content */}
              <div className="nes-field">
                <label htmlFor="justify_select" className="block mb-2 font-bold">justify-content</label>
                <div className="nes-select">
                  <select
                    id="justify_select"
                    value={justifyContent}
                    onChange={(e) => { playBeep('click'); setJustifyContent(e.target.value); }}
                  >
                    <option value="flex-start">flex-start (left/top)</option>
                    <option value="flex-end">flex-end (right/bottom)</option>
                    <option value="center">center</option>
                    <option value="space-between">space-between</option>
                    <option value="space-around">space-around</option>
                    <option value="space-evenly">space-evenly</option>
                  </select>
                </div>
              </div>

              {/* Align Items */}
              <div className="nes-field">
                <label htmlFor="align_select" className="block mb-2 font-bold">align-items (cross-axis)</label>
                <div className="nes-select">
                  <select
                    id="align_select"
                    value={alignItems}
                    onChange={(e) => { playBeep('click'); setAlignItems(e.target.value); }}
                  >
                    <option value="flex-start">flex-start</option>
                    <option value="flex-end">flex-end</option>
                    <option value="center">center</option>
                    <option value="stretch">stretch</option>
                    <option value="baseline">baseline</option>
                  </select>
                </div>
              </div>

              {/* Flex Wrap */}
              <div>
                <label className="block mb-2 font-bold">flex-wrap</label>
                <div className="flex flex-wrap gap-2">
                  {(['nowrap', 'wrap', 'wrap-reverse'] as const).map((wrp) => (
                    <button
                      key={wrp}
                      type="button"
                      className={`nes-btn text-[10px] px-2 py-1 ${flexWrap === wrp ? 'is-success' : ''}`}
                      onClick={() => { playBeep('click'); setFlexWrap(wrp); }}
                    >
                      {wrp}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gap Slider */}
              <div>
                <label className="flex justify-between mb-1 font-bold">
                  <span>gap</span>
                  <span>{gap}px</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="40"
                  step="5"
                  className="w-full cursor-pointer accent-black"
                  value={gap}
                  onChange={(e) => setGap(Number(e.target.value))}
                />
              </div>

              {/* Height Slider */}
              <div>
                <label className="flex justify-between mb-1 font-bold">
                  <span>container height</span>
                  <span>{containerHeight}px</span>
                </label>
                <input
                  type="range"
                  min="100"
                  max="400"
                  step="25"
                  className="w-full cursor-pointer accent-black"
                  value={containerHeight}
                  onChange={(e) => setContainerHeight(Number(e.target.value))}
                />
              </div>

            </div>
          </div>

          {/* Child Management */}
          <div className="nes-container with-title is-rounded bg-white">
            <h3 className="title text-xs bg-white">Child Items ({items.length}/8)</h3>
            <div className="flex flex-col gap-4 text-xs">
              <div className="flex gap-2">
                <button
                  type="button"
                  className="nes-btn is-success text-xs flex-1"
                  disabled={items.length >= 8}
                  onClick={handleAddItem}
                >
                  + Add Item
                </button>
                <button
                  type="button"
                  className="nes-btn is-error text-xs flex-1"
                  disabled={items.length <= 2}
                  onClick={handleRemoveItem}
                >
                  - Remove Last
                </button>
              </div>

              {/* Selector grid */}
              <div>
                <label className="block mb-2 font-bold">Select Active Item to Edit:</label>
                <div className="grid grid-cols-4 gap-2">
                  {items.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`nes-btn text-[10px] p-1 ${selectedId === item.id ? 'is-warning' : ''}`}
                      onClick={() => handleSelect(item.id)}
                    >
                      {idx + 1}. {item.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Selected Child Details */}
          {selectedItem && (
            <div className="nes-container with-title is-rounded bg-white border-warning">
              <h3 className="title text-xs bg-white text-warning">Edit Item: {selectedItem.name}</h3>
              <div className="flex flex-col gap-4 text-xs">
                
                {/* Flex Grow */}
                <div className="flex justify-between items-center gap-4">
                  <label htmlFor="grow_input" className="font-bold">flex-grow</label>
                  <input
                    id="grow_input"
                    type="number"
                    min="0"
                    max="10"
                    className="nes-input text-xs w-20 p-1"
                    value={selectedItem.flexGrow}
                    onChange={(e) => updateSelectedProperty('flexGrow', Math.max(0, parseInt(e.target.value) || 0))}
                  />
                </div>

                {/* Flex Shrink */}
                <div className="flex justify-between items-center gap-4">
                  <label htmlFor="shrink_input" className="font-bold">flex-shrink</label>
                  <input
                    id="shrink_input"
                    type="number"
                    min="0"
                    max="10"
                    className="nes-input text-xs w-20 p-1"
                    value={selectedItem.flexShrink}
                    onChange={(e) => updateSelectedProperty('flexShrink', Math.max(0, parseInt(e.target.value) || 0))}
                  />
                </div>

                {/* Order */}
                <div className="flex justify-between items-center gap-4">
                  <label htmlFor="order_input" className="font-bold">order</label>
                  <input
                    id="order_input"
                    type="number"
                    className="nes-input text-xs w-20 p-1"
                    value={selectedItem.order}
                    onChange={(e) => updateSelectedProperty('order', parseInt(e.target.value) || 0)}
                  />
                </div>

                {/* Align Self */}
                <div className="nes-field">
                  <label htmlFor="align_self_select" className="block mb-1 font-bold">align-self</label>
                  <div className="nes-select">
                    <select
                      id="align_self_select"
                      value={selectedItem.alignSelf}
                      onChange={(e) => { playBeep('click'); updateSelectedProperty('alignSelf', e.target.value); }}
                    >
                      <option value="auto">auto (inherit)</option>
                      <option value="flex-start">flex-start</option>
                      <option value="flex-end">flex-end</option>
                      <option value="center">center</option>
                      <option value="stretch">stretch</option>
                      <option value="baseline">baseline</option>
                    </select>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Live Canvas View & CSS Code Output (Right) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Interactive Screen Container */}
          <div className="nes-container with-title is-rounded bg-white">
            <h3 className="title text-xs bg-white">Interactive Screen Preview</h3>
            
            <p className="text-[10px] text-gray-500 mb-3">
              Click individual sprite boxes inside the container screen to adjust their properties.
            </p>

            {/* Simulated TV / Monitor Screen wrapper */}
            <div 
              className="w-full bg-[#1b1f24] border-4 border-black p-4 rounded overflow-auto relative"
              style={{ minHeight: '300px' }}
            >
              {/* Flex Container */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: flexDirection,
                  justifyContent: justifyContent as any,
                  alignItems: alignItems as any,
                  flexWrap: flexWrap,
                  gap: `${gap}px`,
                  minHeight: `${containerHeight}px`,
                  width: '100%',
                  border: '2px dashed #4a5568',
                  padding: '8px',
                  backgroundColor: '#0d1117',
                  transition: 'all 0.3s ease',
                }}
              >
                {items.map((item, index) => {
                  const isItemActive = selectedId === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item.id)}
                      style={{
                        order: item.order,
                        flexGrow: item.flexGrow,
                        flexShrink: item.flexShrink,
                        alignSelf: item.alignSelf as any,
                        backgroundColor: item.color,
                        border: isItemActive ? '4px solid #f7d51d' : '4px solid black',
                        boxShadow: isItemActive ? '0 0 12px #f7d51d' : 'none',
                        padding: '10px 8px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        userSelect: 'none',
                        minWidth: '95px',
                        minHeight: '80px',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                      className="hover:scale-[1.03]"
                    >
                      {/* Sprite Character */}
                      <div className="h-8 flex items-center justify-center mb-1">
                        <i className={`${item.icon} scale-110`}></i>
                      </div>

                      {/* Item Details */}
                      <span className="text-[10px] font-bold text-black select-none text-center">
                        {index + 1}. {item.name}
                      </span>
                      
                      {/* Compact parameter prints */}
                      <div className="text-[8px] text-gray-700 leading-tight mt-1 text-center font-mono select-none">
                        <div>G:{item.flexGrow} S:{item.flexShrink} O:{item.order}</div>
                        {item.alignSelf !== 'auto' && (
                          <div className="text-red-700 font-bold">self:{item.alignSelf}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Indicator Badge for Direction */}
              <div className="absolute bottom-2 right-2 text-[8px] bg-black text-green-400 px-2 py-1 font-mono border border-green-400 opacity-80 pointer-events-none">
                AXIS: {flexDirection.toUpperCase()} | WRAP: {flexWrap.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Generated Code Section */}
          <div className="nes-container with-title is-rounded bg-white">
            <h3 className="title text-xs bg-white">Generated CSS Code</h3>
            
            <div className="relative">
              <pre className="p-4 bg-[#212529] text-[#f8f9fa] font-mono text-[11px] rounded overflow-x-auto border-4 border-black max-h-[300px]">
                <code>{generatedCSS}</code>
              </pre>
              
              <button
                type="button"
                className={`nes-btn text-xs absolute top-2 right-2 ${copied ? 'is-success' : 'is-primary'}`}
                onClick={handleCopyCSS}
              >
                {copied ? "Copied!" : "Copy CSS"}
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Guide Section */}
      <div className="nes-container with-title is-rounded bg-white mt-4 text-xs">
        <h3 className="title text-sm bg-white">Flexbox Cheat Sheet & Visual Guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed">
          <div>
            <h4 className="font-bold underline mb-2 text-sm">Main Axis vs Cross Axis</h4>
            <p className="mb-2">
              Flexbox is **one-dimensional**. Space is distributed along the **Main Axis** (set by `flex-direction`). The **Cross Axis** runs perpendicular to it.
            </p>
            <ul className="nes-list is-disc pl-4 space-y-1">
              <li>**row**: Main is horizontal (left to right). Cross is vertical.</li>
              <li>**column**: Main is vertical (top to bottom). Cross is horizontal.</li>
              <li>**justify-content**: Controls alignment along the **Main Axis**.</li>
              <li>**align-items**: Controls alignment along the **Cross Axis** for all items.</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold underline mb-2 text-sm">Child properties</h4>
            <p className="mb-2">
              Individual items inside the container can be sized and positioned independently:
            </p>
            <ul className="nes-list is-disc pl-4 space-y-1">
              <li>**flex-grow**: Ratio of how much extra space this item receives if the container has remaining space (default: 0).</li>
              <li>**flex-shrink**: Ratio of how much this item shrinks relative to siblings when space is tight (default: 1).</li>
              <li>**order**: Moves the item visually earlier or later on the axis without changing DOM structure (default: 0).</li>
              <li>**align-self**: Overrides the parent container's `align-items` setting for this single item.</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
