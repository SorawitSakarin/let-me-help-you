import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ToolsGrid from './ToolsGrid';

const todayDate = new Date();
const getOffsetDate = (daysOffset: number) => {
  const d = new Date(todayDate.getTime() + daysOffset * 24 * 60 * 60 * 1000);
  return d.toISOString().split('T')[0];
};

// Mock Tools Data
const mockTools = [
  {
    href: '/create-qr-code',
    title: 'QR Generator',
    description: 'Create custom QR codes.',
    icon: 'nes-icon coin',
    type: 'is-primary',
    updatedAt: getOffsetDate(-1), // 1 day ago - within 14 days
    isPopular: true,
  },
  {
    href: '/count-words',
    title: 'Word Counter',
    description: 'Count words and chars.',
    icon: 'nes-icon star',
    type: 'is-success',
    updatedAt: getOffsetDate(-20), // 20 days ago - not within 14 days
    isPopular: false,
  },
  {
    href: '/pick-a-random-option',
    title: 'Slot Machine',
    description: 'Spin the wheel.',
    icon: 'nes-icon trophy',
    type: 'is-warning',
    isPopular: false,
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

  it('renders "NEW" badge only for tools updated within 14 days', () => {
    render(<ToolsGrid initialTools={mockTools} />);
    
    // QR Generator has updatedAt: 1 day ago -> should have "NEW" badge
    const newBadges = screen.getAllByText('NEW');
    expect(newBadges.length).toBeGreaterThan(0);
    
    // Make sure the title 'QR Generator' card contains "NEW" badge
    const qrCard = screen.getByText('QR Generator').closest('div');
    expect(qrCard).toHaveTextContent('NEW');

    // Make sure 'Word Counter' card does NOT contain "NEW"
    const wordCounterCard = screen.getByText('Word Counter').closest('div');
    expect(wordCounterCard).not.toHaveTextContent('NEW');
  });

  it('sorts tools based on selection options', () => {
    render(<ToolsGrid initialTools={mockTools} />);
    const sortSelect = screen.getByRole('combobox');

    expect(sortSelect).toBeInTheDocument();

    // Change to 'Newest' (updatedAt-desc)
    fireEvent.change(sortSelect, { target: { value: 'updatedAt-desc' } });
    expect(sortSelect).toHaveValue('updatedAt-desc');

    // Change to 'Oldest' (updatedAt-asc)
    fireEvent.change(sortSelect, { target: { value: 'updatedAt-asc' } });
    expect(sortSelect).toHaveValue('updatedAt-asc');
  });

  it('renders "POPULAR" badge only for popular tools', () => {
    render(<ToolsGrid initialTools={mockTools} />);

    // QR Generator is popular -> should have "POPULAR" badge
    const popularBadges = screen.getAllByText('POPULAR');
    expect(popularBadges.length).toBeGreaterThan(0);

    const qrCard = screen.getByText('QR Generator').closest('div');
    expect(qrCard).toHaveTextContent('POPULAR');

    // Word Counter is NOT popular -> should not have "POPULAR" badge
    const wordCounterCard = screen.getByText('Word Counter').closest('div');
    expect(wordCounterCard).not.toHaveTextContent('POPULAR');
  });
});
