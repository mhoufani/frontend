import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Tabs } from './tabs';

const mockTabs = [
  { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
  { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
  { id: 'tab3', label: 'Tab 3', content: <div>Content 3</div>, disabled: true },
];

describe('Tabs', () => {
  it('renders all tabs and first tab content by default', () => {
    render(<Tabs tabs={mockTabs} />);

    // Check if all tabs are rendered
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 3')).toBeInTheDocument();

    // Check if first tab content is visible
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
  });

  it('switches content when clicking tabs', () => {
    render(<Tabs tabs={mockTabs} />);

    // Click second tab
    fireEvent.click(screen.getByText('Tab 2'));

    // Check if content switched
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('respects defaultTab prop', () => {
    render(<Tabs tabs={mockTabs} defaultTab="tab2" />);

    // Check if second tab content is visible by default
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('calls onChange when switching tabs', () => {
    const handleChange = jest.fn();
    render(<Tabs tabs={mockTabs} onChange={handleChange} />);

    // Click second tab
    fireEvent.click(screen.getByText('Tab 2'));

    expect(handleChange).toHaveBeenCalledWith('tab2');
  });

  it('handles disabled tabs correctly', () => {
    render(<Tabs tabs={mockTabs} />);

    const disabledTab = screen.getByText('Tab 3');
    expect(disabledTab).toBeDisabled();

    // Try to click disabled tab
    fireEvent.click(disabledTab);

    // Content should not change to disabled tab's content
    expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<Tabs tabs={mockTabs} size="sm" />);
    
    let tab = screen.getByText('Tab 1');
    expect(tab).toHaveClass('px-3', 'py-1.5', 'text-sm');

    rerender(<Tabs tabs={mockTabs} size="lg" />);
    tab = screen.getByText('Tab 1');
    expect(tab).toHaveClass('px-6', 'py-3', 'text-lg');
  });

  it('applies correct variant styles', () => {
    const { rerender } = render(<Tabs tabs={mockTabs} variant="underline" />);
    
    let tabList = screen.getByRole('tablist');
    expect(tabList).toHaveClass('border-b', 'border-gray-200');

    rerender(<Tabs tabs={mockTabs} variant="pills" />);
    tabList = screen.getByRole('tablist');
    expect(tabList).toHaveClass('space-x-2');
  });

  it('applies active and inactive styles correctly', () => {
    render(<Tabs tabs={mockTabs} variant="underline" />);

    const activeTab = screen.getByText('Tab 1');
    const inactiveTab = screen.getByText('Tab 2');

    expect(activeTab).toHaveClass('border-blue-500', 'text-blue-600');
    expect(inactiveTab).toHaveClass('text-gray-500');
  });

  it('has correct accessibility attributes', () => {
    render(<Tabs tabs={mockTabs} />);

    const tab1 = screen.getByText('Tab 1');
    const tab2 = screen.getByText('Tab 2');

    // Check ARIA roles
    expect(tab1).toHaveAttribute('role', 'tab');
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByRole('tabpanel')).toBeInTheDocument();

    // Check ARIA states
    expect(tab1).toHaveAttribute('aria-selected', 'true');
    expect(tab2).toHaveAttribute('aria-selected', 'false');

    // Check ARIA relationships
    expect(tab1).toHaveAttribute('aria-controls', 'panel-tab1');
    expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'tab-tab1');
  });
}); 