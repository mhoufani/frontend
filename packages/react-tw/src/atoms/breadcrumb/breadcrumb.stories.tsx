import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ChevronRightIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/solid';
import { Breadcrumb, BreadcrumbItem } from './breadcrumb';

/**
 * A navigation component that helps users understand their current location within a hierarchical structure
 */
const meta = {
  title: 'Atoms/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Features

- Customizable separators
- Accessible by default
- Support for links and text items
- Current page indication
- Flexible styling through Tailwind classes

## Usage

\`\`\`tsx
import { Breadcrumb, BreadcrumbItem } from '@mp/react-tw';

// Basic usage
<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
  <BreadcrumbItem isCurrent>Categories</BreadcrumbItem>
</Breadcrumb>

// Custom separator
<Breadcrumb separator={<ChevronDoubleRightIcon className="h-4 w-4" />}>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem isCurrent>Products</BreadcrumbItem>
</Breadcrumb>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic breadcrumb navigation with default separator
 */
export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/products">Products</BreadcrumbItem>
      <BreadcrumbItem isCurrent>Categories</BreadcrumbItem>
    </Breadcrumb>
  ),
};

/**
 * Breadcrumb with a custom text separator
 */
export const CustomTextSeparator: Story = {
  render: () => (
    <Breadcrumb separator="/">
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/products">Products</BreadcrumbItem>
      <BreadcrumbItem isCurrent>Categories</BreadcrumbItem>
    </Breadcrumb>
  ),
};

/**
 * Breadcrumb with a custom icon separator
 */
export const CustomIconSeparator: Story = {
  render: () => (
    <Breadcrumb 
      separator={<ChevronDoubleRightIcon className="h-4 w-4 text-gray-400" />}
    >
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/products">Products</BreadcrumbItem>
      <BreadcrumbItem isCurrent>Categories</BreadcrumbItem>
    </Breadcrumb>
  ),
};

/**
 * Single item breadcrumb
 */
export const SingleItem: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem isCurrent>Home</BreadcrumbItem>
    </Breadcrumb>
  ),
};

/**
 * Long breadcrumb with many items
 */
export const LongPath: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/products">Products</BreadcrumbItem>
      <BreadcrumbItem href="/products/electronics">Electronics</BreadcrumbItem>
      <BreadcrumbItem href="/products/electronics/computers">Computers</BreadcrumbItem>
      <BreadcrumbItem href="/products/electronics/computers/laptops">Laptops</BreadcrumbItem>
      <BreadcrumbItem isCurrent>Gaming Laptops</BreadcrumbItem>
    </Breadcrumb>
  ),
};

/**
 * Example showing different separator styles
 */
export const SeparatorStyles: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Products</BreadcrumbItem>
      </Breadcrumb>

      <Breadcrumb separator="/">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Products</BreadcrumbItem>
      </Breadcrumb>

      <Breadcrumb separator="|">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Products</BreadcrumbItem>
      </Breadcrumb>

      <Breadcrumb 
        separator={<ChevronDoubleRightIcon className="h-4 w-4 text-gray-400" />}
      >
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Products</BreadcrumbItem>
      </Breadcrumb>
    </div>
  ),
}; 