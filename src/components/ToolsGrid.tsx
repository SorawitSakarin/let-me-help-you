"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import AnimatedCard from '@/components/AnimatedCard';
import { ArrowRight, Search, ArrowDownAZ, ArrowUpAZ, Sparkles } from 'lucide-react';

interface Tool {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tag?: string;
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
    <div className="container mx-auto px-4">
      {/* Header with Search and Sort */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        <div>
            <h2 className="text-3xl font-bold text-gray-900">Available Tools</h2>
            <p className="text-gray-500 mt-2">Select a tool to get started instantly.</p>
        </div>

        <div className="flex w-full md:w-auto gap-4">
            <div className="relative flex-grow md:flex-grow-0 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Search tools..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <button
              type="button"
              className="px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-indigo-600 transition-all flex items-center gap-2"
              onClick={toggleSort}
              title={`Sort ${sortOrder === 'asc' ? 'Z -> A' : 'A -> Z'}`}
            >
              {sortOrder === 'asc' ? <ArrowDownAZ className="w-5 h-5" /> : <ArrowUpAZ className="w-5 h-5" />}
            </button>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTools.length > 0 ? (
          filteredTools.map((tool, index) => (
            <AnimatedCard key={tool.href} delay={index * 0.1} className="h-full">
              <Link href={tool.href} className="group block h-full">
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-5 h-5 text-indigo-600 transform -translate-x-2 group-hover:translate-x-0 transition-transform" />
                  </div>

                  <div className="mb-6 p-4 bg-gray-50 rounded-xl w-fit group-hover:bg-indigo-50 transition-colors">
                    {tool.icon}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {tool.title}
                  </h3>

                  <p className="text-gray-500 flex-grow leading-relaxed">
                    {tool.description}
                  </p>

                  {tool.tag && (
                    <div className="mt-6">
                      <span className="inline-block px-3 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-full">
                        {tool.tag}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            </AnimatedCard>
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <div className="p-4 bg-white rounded-full inline-block mb-4 shadow-sm">
                <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-lg font-medium text-gray-900">No tools found</p>
            <p className="text-gray-500 mt-2">Try adjusting your search query.</p>
            <button
                onClick={() => setSearchQuery('')}
                className="mt-6 text-indigo-600 hover:text-indigo-700 font-medium"
            >
                Clear Search
            </button>
          </div>
        )}

        {/* Show placeholder only when not searching */}
        {!searchQuery && (
          <AnimatedCard delay={filteredTools.length * 0.1} className="h-full">
             <div className="bg-gray-50 rounded-2xl p-8 border border-dashed border-gray-300 h-full flex flex-col items-center justify-center text-center opacity-70 hover:opacity-100 transition-opacity">
                <div className="p-4 bg-gray-100 rounded-full mb-4">
                   <Sparkles className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-600">More Coming Soon</h3>
                <p className="text-sm text-gray-500 mt-2">We are constantly adding new utilities.</p>
             </div>
          </AnimatedCard>
        )}
      </div>
    </div>
  );
}
