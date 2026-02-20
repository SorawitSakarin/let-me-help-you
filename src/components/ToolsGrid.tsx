"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import AnimatedCard from '@/components/AnimatedCard';

interface Tool {
  href: string;
  title: string;
  description: string;
  icon: string;
  type: string;
}

interface ToolsGridProps {
  initialTools: Tool[];
}

export default function ToolsGrid({ initialTools }: ToolsGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredTools = useMemo(() => {
    let tools = [...initialTools];

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      tools = tools.filter(
        (tool) =>
          tool.title.toLowerCase().includes(lowerQuery) ||
          tool.description.toLowerCase().includes(lowerQuery)
      );
    }

    return tools.sort((a, b) => {
      const compareResult = a.title.localeCompare(b.title);
      return sortOrder === 'asc' ? compareResult : -compareResult;
    });
  }, [initialTools, searchQuery, sortOrder]);

  const toggleSort = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <>
      {/* Search and Sort Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-grow">
          <input
            type="text"
            className="nes-input"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="nes-btn is-primary whitespace-nowrap"
          onClick={toggleSort}
        >
          Sort: {sortOrder === 'asc' ? 'A -> Z' : 'Z -> A'}
        </button>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTools.length > 0 ? (
          filteredTools.map((tool, index) => (
            <AnimatedCard key={tool.href} delay={index * 0.1} className="h-full">
              <Link href={tool.href} className="no-underline block h-full group">
                <div className={`nes-container with-title is-rounded transition-all cursor-pointer h-full flex flex-col group-hover:bg-gray-100 transform group-hover:-translate-y-1 transition-transform duration-200`}>
                  <h3 className="title">{tool.title}</h3>
                  <div className="flex flex-col items-center text-center flex-grow">
                    <i className={`${tool.icon} is-large mb-6 mt-2 transition-transform group-hover:scale-110`}></i>
                    <p className="mb-6 flex-grow">{tool.description}</p>
                    <button type="button" className={`nes-btn ${tool.type} w-full`}>
                      Open Tool
                    </button>
                  </div>
                </div>
              </Link>
            </AnimatedCard>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-xl mb-4">Coming Soon</p>
          </div>
        )}

        {/* Show placeholder only when not searching */}
        {!searchQuery && (
          <AnimatedCard delay={filteredTools.length * 0.1}>
            <div className="nes-container is-rounded is-dotted flex items-center justify-center opacity-50 min-h-[250px] hover:opacity-100 transition-opacity h-full">
              <p className="text-center">More tools<br />coming soon...</p>
            </div>
          </AnimatedCard>
        )}
      </div>
    </>
  );
}
