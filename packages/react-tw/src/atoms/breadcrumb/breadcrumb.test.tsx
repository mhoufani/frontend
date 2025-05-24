import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Breadcrumb, BreadcrumbItem } from './breadcrumb';

describe('Breadcrumb', () => {
  it('renders all items correctly', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/products">Products</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Categories</BreadcrumbItem>
      </Breadcrumb>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();
  });

  it('renders correct number of separators', () => {
    render(
      <Breadcrumb separator=">">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/products">Products</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Categories</BreadcrumbItem>
      </Breadcrumb>
    );

    // Should have 2 separators for 3 items
    const separators = screen.getAllByText('>');
    expect(separators).toHaveLength(2);
  });

  it('applies correct aria-current to current item', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Products</BreadcrumbItem>
      </Breadcrumb>
    );

    const currentItem = screen.getByText('Products');
    expect(currentItem).toHaveAttribute('aria-current', 'page');
  });

  it('renders links for non-current items', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/products">Products</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Categories</BreadcrumbItem>
      </Breadcrumb>
    );

    const homeLink = screen.getByText('Home');
    const productsLink = screen.getByText('Products');
    const categories = screen.getByText('Categories');

    expect(homeLink.tagName).toBe('A');
    expect(productsLink.tagName).toBe('A');
    expect(categories.tagName).toBe('SPAN');

    expect(homeLink).toHaveAttribute('href', '/');
    expect(productsLink).toHaveAttribute('href', '/products');
  });

  it('applies custom className to container', () => {
    render(
      <Breadcrumb className="custom-class">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
      </Breadcrumb>
    );

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('custom-class');
  });

  it('handles empty children gracefully', () => {
    render(
      <Breadcrumb>
        {null}
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        {false}
        <BreadcrumbItem isCurrent>Products</BreadcrumbItem>
        {undefined}
      </Breadcrumb>
    );

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('applies correct styles to current and non-current items', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Products</BreadcrumbItem>
      </Breadcrumb>
    );

    const homeLink = screen.getByText('Home');
    const products = screen.getByText('Products');

    expect(homeLink).toHaveClass('text-gray-500');
    expect(products).toHaveClass('text-gray-900');
  });
}); 