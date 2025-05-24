import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Accordion } from './accordion';

describe('Accordion', () => {
  const defaultProps = {
    title: 'Test Accordion',
    children: <p>Test content</p>,
  };

  it('renders with title', () => {
    render(<Accordion {...defaultProps} />);
    expect(screen.getByText('Test Accordion')).toBeInTheDocument();
  });

  it('shows content when clicked', () => {
    render(<Accordion {...defaultProps} />);
    const button = screen.getByText('Test Accordion');
    const content = screen.getByText('Test content');

    expect(content).not.toBeVisible();
    fireEvent.click(button);
    expect(content).toBeVisible();
  });

  it('starts open when defaultOpen is true', () => {
    render(<Accordion {...defaultProps} defaultOpen />);
    expect(screen.getByText('Test content')).toBeVisible();
  });

  it('toggles content visibility on click', () => {
    render(<Accordion {...defaultProps} />);
    const button = screen.getByText('Test Accordion');
    const content = screen.getByText('Test content');

    expect(content).not.toBeVisible();
    fireEvent.click(button);
    expect(content).toBeVisible();
    fireEvent.click(button);
    expect(content).not.toBeVisible();
  });

  it('applies custom className', () => {
    render(<Accordion {...defaultProps} className="custom-class" />);
    expect(screen.getByRole('button').parentElement).toHaveClass('custom-class');
  });

  it('has correct ARIA attributes', () => {
    render(<Accordion {...defaultProps} />);
    const button = screen.getByRole('button');
    const content = screen.getByRole('region');

    expect(button).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(content).toHaveAttribute('aria-labelledby', defaultProps.title);
  });
}); 