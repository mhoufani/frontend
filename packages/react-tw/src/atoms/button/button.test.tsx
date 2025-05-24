import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Button } from './button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toHaveClass('custom-class');
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByText('Click me');
    await userEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies different sizes', () => {
    const { rerender } = render(<Button size="sm">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-3', 'py-1.5', 'text-sm');

    rerender(<Button size="lg">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-5', 'py-2.5', 'text-lg');
  });

  it('applies variant styles', () => {
    const { rerender } = render(<Button variant="solid">Button</Button>);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('bg-blue-600', 'text-white');

    rerender(<Button variant="outline">Button</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('border-2', 'border-blue-600', 'text-blue-600');

    rerender(<Button variant="ghost">Button</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('bg-transparent', 'text-blue-600');
  });

  it('handles disabled state', () => {
    const handleClick = jest.fn();
    render(<Button disabled onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('cursor-not-allowed');
  });

  it('handles loading state', () => {
    render(<Button isLoading>Click me</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('cursor-wait', 'opacity-80');
    expect(screen.getByText('Click me')).toBeInTheDocument();
    expect(document.querySelector('svg')).toHaveClass('animate-spin');
  });

  it('applies full width style', () => {
    render(<Button fullWidth>Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('w-full');
  });

  it('renders with left icon', () => {
    const TestIcon = () => <span data-testid="left-icon">🔍</span>;
    render(<Button leftIcon={<TestIcon />}>Search</Button>);
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('renders with right icon', () => {
    const TestIcon = () => <span data-testid="right-icon">→</span>;
    render(<Button rightIcon={<TestIcon />}>Next</Button>);
    
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('applies correct icon sizes', () => {
    const TestIcon = () => <span data-testid="test-icon">🔍</span>;
    const { rerender } = render(
      <Button size="sm" leftIcon={<TestIcon />}>
        Search
      </Button>
    );

    expect(screen.getByTestId('test-icon')).toHaveClass('w-4', 'h-4');

    rerender(
      <Button size="lg" leftIcon={<TestIcon />}>
        Search
      </Button>
    );

    expect(screen.getByTestId('test-icon')).toHaveClass('w-6', 'h-6');
  });

  it('hides icons when loading', () => {
    const TestIcon = () => <span data-testid="test-icon">🔍</span>;
    render(
      <Button
        isLoading
        leftIcon={<TestIcon />}
        rightIcon={<TestIcon />}
      >
        Loading
      </Button>
    );
    
    expect(screen.queryAllByTestId('test-icon')).toHaveLength(0);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });
}); 