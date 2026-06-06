"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import AnimatedCard from '@/components/AnimatedCard';

interface Tool {
  href: string;
  title: string;
  description: string;
  icon: string;
  type: string;
  category: string;
  updatedAt?: string;
}

interface ToolsGridProps {
  initialTools: Tool[];
}

const isNew = (updatedAt?: string) => {
  if (!updatedAt) return false;
  const parts = updatedAt.split('-');
  if (parts.length !== 3) return false;
  const updatedDate = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  
  const currentDate = new Date();
  const currentMidnight = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );
  
  const diffTime = currentMidnight.getTime() - updatedDate.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= 14;
};

type SortOption = 'title-asc' | 'title-desc' | 'updatedAt-desc' | 'updatedAt-asc';

const sortTools = (toolsList: Tool[], sortBy: SortOption) => {
  return [...toolsList].sort((a, b) => {
    if (sortBy === 'title-asc') {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === 'title-desc') {
      return b.title.localeCompare(a.title);
    }

    const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
    const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;

    if (sortBy === 'updatedAt-desc') {
      if (dateB !== dateA) {
        return dateB - dateA;
      }
      return a.title.localeCompare(b.title);
    }
    if (sortBy === 'updatedAt-asc') {
      if (!a.updatedAt && b.updatedAt) return 1;
      if (a.updatedAt && !b.updatedAt) return -1;
      if (dateA !== dateB) {
        return dateA - dateB;
      }
      return a.title.localeCompare(b.title);
    }
    return 0;
  });
};

export default function ToolsGrid({ initialTools }: ToolsGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('title-asc');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const groupedTools = useMemo(() => {
    const sorted = sortTools(initialTools, sortBy);

    const grouped: Record<string, Tool[]> = {};
    for (const tool of sorted) {
      const category = tool.category || 'Other';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(tool);
    }

    return grouped;
  }, [initialTools, sortBy]);

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];

    const lowerQuery = searchQuery.toLowerCase();
    const results = initialTools.filter(
      (tool) => tool.title.toLowerCase().includes(lowerQuery)
    );

    return sortTools(results, sortBy);
  }, [initialTools, searchQuery, sortBy]);

  return (
    <>
      {/* Header with Search and Sort */}
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg border-b-4 border-black inline-block pr-4">Available Tools ({initialTools.length})</h3>
        </div>

        <div className="flex flex-col md:flex-row gap-2 relative">
          <div className="flex-grow">
            <input
              type="text"
              className="nes-input"
              style={{ height: '2.5rem', minHeight: '2.5rem', padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="nes-select whitespace-nowrap shrink-0" style={{ width: 'auto', minWidth: '180px' }}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              style={{ height: '2.5rem', minHeight: '2.5rem', padding: '0.25rem 2rem 0.25rem 0.5rem', fontSize: '0.75rem' }}
            >
              <option value="title-asc">{'Sort: A → Z '}</option>
              <option value="title-desc">{'Sort: Z → A '}</option>
              <option value="updatedAt-desc">{'Sort: Newest '}</option>
              <option value="updatedAt-asc">{'Sort: Oldest '}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Search Results */}
      {searchQuery && (
        <div className="mb-8">
          <h4 className="text-md uppercase font-bold text-gray-700 tracking-wider mb-4 border-b-2 inline-block pr-4">Search Results</h4>
          {searchResults.length > 0 ? (
            <div className="flex flex-col gap-2">
              {searchResults.map((tool, index) => (
                <AnimatedCard key={tool.href} delay={index * 0.05}>
                  <Link href={tool.href} target="_blank" rel="noopener noreferrer" className="no-underline block">
                    <div className="nes-container is-rounded py-2 px-4 hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-between">
                      <span className="text-sm font-bold flex items-center gap-2">
                        {tool.title}
                        {isMounted && isNew(tool.updatedAt) && (
                          <span className="ml-2 bg-[#92cd41] text-black px-1.5 py-0.5 text-[8px] font-bold border-2 border-black uppercase tracking-wider shadow-[2px_2px_0_0_rgba(0,0,0,1)] select-none">
                            NEW
                          </span>
                        )}
                      </span>
                    </div>
                  </Link>
                </AnimatedCard>
              ))}
            </div>
          ) : (
            <div className="nes-container is-rounded is-error py-4">
              <p className="text-center text-sm m-0">No tools found matching "{searchQuery}".</p>
            </div>
          )}
        </div>
      )}


      {/* Static Categories Grid Display */}
      <div className="flex flex-col gap-8">
        {Object.entries(groupedTools).map(([category, tools]) => (
          <div key={category} className="flex flex-col gap-4">
            <h4 className="text-md uppercase font-bold text-gray-700 tracking-wider">
              {category}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((tool, index) => (
                <AnimatedCard key={tool.href} delay={index * 0.1} className="h-full">
                  <Link href={tool.href} target="_blank" rel="noopener noreferrer" className="no-underline block h-full group">
                    <div className="nes-container with-title is-rounded transition-all cursor-pointer h-full flex flex-col group-hover:bg-gray-100 transform group-hover:-translate-y-1 duration-200" style={{ padding: '1rem' }}>
                      <h3 className="title text-sm flex items-center gap-2" style={{ background: 'var(--surface)', marginBottom: '0' }}>
                        {tool.title}
                        {isMounted && isNew(tool.updatedAt) && (
                          <span className="ml-2 bg-[#92cd41] text-black px-1.5 py-0.5 text-[8px] font-bold border-2 border-black uppercase tracking-wider shadow-[2px_2px_0_0_rgba(0,0,0,1)] select-none">
                            NEW
                          </span>
                        )}
                      </h3>
                      <div className="flex flex-col items-center text-center flex-grow mt-2">
                        <i className={`${tool.icon} is-medium mb-4 mt-2 transition-transform group-hover:scale-110`}></i>
                        <p className="mb-4 flex-grow text-xs leading-relaxed">{tool.description}</p>
                        <button type="button" className={`nes-btn ${tool.type} w-full`} style={{ fontSize: '0.75rem', padding: '0.25rem' }}>
                          Open
                        </button>
                      </div>
                    </div>
                  </Link>
                </AnimatedCard>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <AnimatedCard delay={initialTools.length * 0.05}>
          <div className="nes-container is-rounded is-dotted flex items-center justify-center opacity-50 min-h-[100px] hover:opacity-100 transition-opacity">
            <p className="text-center text-xs">More tools<br />coming soon...</p>
          </div>
        </AnimatedCard>
      </div>
    </>
  );
}
