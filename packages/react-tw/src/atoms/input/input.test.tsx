import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Input } from './input';

describe('Input', () => {
  it('renders correctly', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('handles user input', async () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Hello, World!');
    expect(input).toHaveValue('Hello, World!');
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" />);
    expect(screen.getByRole('textbox')).toHaveClass('custom-class');
  });

  it('applies different sizes', () => {
    const { rerender } = render(<Input size="sm" />);
    expect(screen.getByRole('textbox')).toHaveClass('px-2.5', 'py-1.5', 'text-sm');

    rerender(<Input size="lg" />);
    expect(screen.getByRole('textbox')).toHaveClass('px-4', 'py-2.5', 'text-lg');
  });

  it('applies variant styles', () => {
    const { rerender } = render(<Input variant="outline" />);
    expect(screen.getByRole('textbox')).toHaveClass('border', 'border-gray-300', 'bg-white');

    rerender(<Input variant="filled" />);
    expect(screen.getByRole('textbox')).toHaveClass('bg-gray-100', 'border-2', 'border-transparent');
  });

  it('shows error state', () => {
    render(<Input error />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-red-500');
  });

  it('handles disabled state', () => {
    render(<Input disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('bg-gray-50', 'text-gray-500', 'cursor-not-allowed');
  });

  it('renders with left icon', () => {
    const TestIcon = () => <span data-testid="left-icon">🔍</span>;
    render(<Input leftIcon={<TestIcon />} />);
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('pl-10');
  });

  it('renders with right icon', () => {
    const TestIcon = () => <span data-testid="right-icon">✓</span>;
    render(<Input rightIcon={<TestIcon />} />);
    
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('pr-10');
  });

  it('applies error styles to icons', () => {
    const TestIcon = () => <span data-testid="test-icon">🔍</span>;
    render(<Input leftIcon={<TestIcon />} error />);
    
    const iconWrapper = screen.getByTestId('test-icon').parentElement;
    expect(iconWrapper).toHaveClass('text-red-500');
  });

  it('forwards additional props to input element', () => {
    render(
      <Input
        data-testid="test-input"
        maxLength={10}
        required
      />
    );
    
    const input = screen.getByTestId('test-input');
    expect(input).toHaveAttribute('maxLength', '10');
    expect(input).toBeRequired();
  });
}); 