import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ToolsGrid from './ToolsGrid';

// Mock Tools Data
const mockTools = [
  {
    href: '/qr-code',
    title: 'QR Generator',
    description: 'Create custom QR codes.',
    icon: 'nes-icon coin',
    type: 'is-primary',
  },
  {
    href: '/word-counter',
    title: 'Word Counter',
    description: 'Count words and chars.',
    icon: 'nes-icon star',
    type: 'is-success',
  },
  {
    href: '/random-slot',
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

    expect(screen.getByText('QR Generator')).toBeInTheDocument();
    expect(screen.queryByText('Word Counter')).not.toBeInTheDocument();
    expect(screen.queryByText('Slot Machine')).not.toBeInTheDocument();
  });

  it('filters tools by description', () => {
    render(<ToolsGrid initialTools={mockTools} />);
    const searchInput = screen.getByPlaceholderText('Search tools...');

    // Search for "Spin" (matches "Slot Machine" description)
    fireEvent.change(searchInput, { target: { value: 'Spin' } });

    expect(screen.getByText('Slot Machine')).toBeInTheDocument();
    expect(screen.queryByText('QR Generator')).not.toBeInTheDocument();
  });

  it('shows "No tools found." when search yields no results', () => {
    render(<ToolsGrid initialTools={mockTools} />);
    const searchInput = screen.getByPlaceholderText('Search tools...');

    // Search for non-existent tool
    fireEvent.change(searchInput, { target: { value: 'NonExistentTool' } });

    expect(screen.getByText('No tools found.')).toBeInTheDocument();
    expect(screen.queryByText('QR Generator')).not.toBeInTheDocument();
  });

  it('clears filter when search input is cleared', () => {
    render(<ToolsGrid initialTools={mockTools} />);
    const searchInput = screen.getByPlaceholderText('Search tools...');

    // Filter first
    fireEvent.change(searchInput, { target: { value: 'QR' } });
    expect(screen.queryByText('Word Counter')).not.toBeInTheDocument();

    // Clear filter
    fireEvent.change(searchInput, { target: { value: '' } });

    expect(screen.getByText('QR Generator')).toBeInTheDocument();
    expect(screen.getByText('Word Counter')).toBeInTheDocument();
    expect(screen.getByText('Slot Machine')).toBeInTheDocument();
  });

  it('handles case-insensitive search', () => {
    render(<ToolsGrid initialTools={mockTools} />);
    const searchInput = screen.getByPlaceholderText('Search tools...');

    // Search with lowercase "qr"
    fireEvent.change(searchInput, { target: { value: 'qr' } });
    expect(screen.getByText('QR Generator')).toBeInTheDocument();

    // Search with uppercase "QR"
    fireEvent.change(searchInput, { target: { value: 'QR' } });
    expect(screen.getByText('QR Generator')).toBeInTheDocument();
  });
});
