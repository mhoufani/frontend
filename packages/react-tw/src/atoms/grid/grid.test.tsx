import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Grid } from './grid';

describe('Grid', () => {
  it('renders children correctly', () => {
    render(
      <Grid>
        <div data-testid="child-1">Item 1</div>
        <div data-testid="child-2">Item 2</div>
      </Grid>
    );

    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
  });

  it('applies default classes', () => {
    render(
      <Grid>
        <div>Item</div>
      </Grid>
    );

    const grid = screen.getByRole('grid');
    expect(grid).toHaveClass(
      'grid',
      'grid-cols-1',
      'sm:grid-cols-2',
      'lg:grid-cols-4',
      'gap-4'
    );
  });

  it('applies custom gap', () => {
    render(
      <Grid gap={6}>
        <div>Item</div>
      </Grid>
    );

    const grid = screen.getByRole('grid');
    expect(grid).toHaveClass('gap-6');
  });

  it('centers items when center prop is true', () => {
    render(
      <Grid center>
        <div>Item</div>
      </Grid>
    );

    const grid = screen.getByRole('grid');
    expect(grid).toHaveClass('place-items-center');
  });

  it('applies custom className', () => {
    render(
      <Grid className="custom-class">
        <div>Item</div>
      </Grid>
    );

    const grid = screen.getByRole('grid');
    expect(grid).toHaveClass('custom-class');
  });

  it('combines all props correctly', () => {
    render(
      <Grid gap={8} center className="custom-class">
        <div>Item</div>
      </Grid>
    );

    const grid = screen.getByRole('grid');
    expect(grid).toHaveClass(
      'grid',
      'grid-cols-1',
      'sm:grid-cols-2',
      'lg:grid-cols-4',
      'gap-8',
      'place-items-center',
      'custom-class'
    );
  });
}); 