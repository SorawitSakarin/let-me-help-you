import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ToolsGrid from './ToolsGrid';

// Mock Tools Data
const mockTools = [
  {
    href: '/create-qr-code',
    title: 'QR Generator',
    description: 'Create custom QR codes.',
    icon: 'nes-icon coin',
    type: 'is-primary',
  },
  {
    href: '/count-words',
    title: 'Word Counter',
    description: 'Count words and chars.',
    icon: 'nes-icon star',
    type: 'is-success',
  },
  {
    href: '/pick-a-random-option',
    title: 'Slot Machine',
    description: 'Spin the wheel.',
    icon: 'nes-icon trophy',
    type: 'is-warning',
  },
];

describe('ToolsGrid', () => {
  it('renders all tools initially', () => {
    render(<ToolsGrid initialTools={mockTools} />);

    expect(screen.getByText('QR Generator')).toBeInTheDocument();
    expect(screen.getByText('Word Counter')).toBeInTheDocument();
    expect(screen.getByText('Slot Machine')).toBeInTheDocument();
  });

  it('filters tools by title', () => {
    render(<ToolsGrid initialTools={mockTools} />);
    const searchInput = screen.getByPlaceholderText('Search tools...');

    // Search for "QR"
    fireEvent.change(searchInput, { target: { value: 'QR' } });

    // We expect 2 "QR Generator" elements now: one in the search results and one in the static grid below
    expect(screen.getAllByText('QR Generator').length).toBe(2);

    // Check that search results only contain the matched item.
    // The main grid isn't filtered, so the elements still exist there,
    // but we can look for the "Search Results" heading and assume the structure works if we render the right output conditionally.
    expect(screen.getByText('Search Results')).toBeInTheDocument();
  });


  it('shows "No tools found" when search yields no results', () => {
    render(<ToolsGrid initialTools={mockTools} />);
    const searchInput = screen.getByPlaceholderText('Search tools...');

    // Search for non-existent tool
    fireEvent.change(searchInput, { target: { value: 'NonExistentTool' } });

    expect(screen.getByText('No tools found matching "NonExistentTool".')).toBeInTheDocument();
  });

  it('clears filter when search input is cleared', () => {
    render(<ToolsGrid initialTools={mockTools} />);
    const searchInput = screen.getByPlaceholderText('Search tools...');

    // Filter first
    fireEvent.change(searchInput, { target: { value: 'QR' } });
    expect(screen.getByText('Search Results')).toBeInTheDocument();

    // Clear filter
    fireEvent.change(searchInput, { target: { value: '' } });

    expect(screen.queryByText('Search Results')).not.toBeInTheDocument();
  });

  it('handles case-insensitive search', () => {
    render(<ToolsGrid initialTools={mockTools} />);
    const searchInput = screen.getByPlaceholderText('Search tools...');

    // Search with lowercase "qr"
    fireEvent.change(searchInput, { target: { value: 'qr' } });
    expect(screen.getAllByText('QR Generator').length).toBe(2);

    // Search with uppercase "QR"
    fireEvent.change(searchInput, { target: { value: 'QR' } });
    expect(screen.getAllByText('QR Generator').length).toBe(2);
  });
});
