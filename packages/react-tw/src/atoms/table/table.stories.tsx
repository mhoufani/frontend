import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { Table } from './table';

interface MockData {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
}

const mockData: MockData[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Active' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' },
];

/**
 * A flexible table component with sorting, hover states, and responsive design
 */
const meta = {
  title: 'Atoms/Table',
  component: Table,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Features

- Sortable columns
- Custom cell rendering
- Multiple size variants
- Striped rows
- Hover states
- Bordered option
- Responsive design
- Custom column alignment
- Custom column widths

## Usage

\`\`\`tsx
import { Table } from '@mp/react-tw';

// Basic usage
<Table
  columns={[
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
  ]}
  data={users}
/>

// With sorting
<Table
  columns={[
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email' },
  ]}
  data={users}
  sortColumn="name"
  sortDirection="asc"
  onSort={(column, direction) => {
    // Handle sorting
  }}
/>

// With custom rendering
<Table
  columns={[
    { key: 'name', header: 'Name' },
    {
      key: 'actions',
      header: 'Actions',
      render: (item) => (
        <button onClick={() => handleEdit(item)}>
          Edit
        </button>
      ),
    },
  ]}
  data={users}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic table with default styling
 */
export const Default: Story = {
  args: {
    columns: [
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
      { key: 'role', header: 'Role' },
    ],
    data: mockData,
  },
};

/**
 * Table with sortable columns
 */
export const Sortable: Story = {
  render: () => {
    const [sortColumn, setSortColumn] = useState('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const handleSort = (column: string, direction: 'asc' | 'desc') => {
      setSortColumn(column);
      setSortDirection(direction);
    };

    return (
      <Table
        columns={[
          { key: 'name', header: 'Name', sortable: true },
          { key: 'email', header: 'Email', sortable: true },
          { key: 'role', header: 'Role', sortable: true },
        ]}
        data={mockData}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
      />
    );
  },
};

/**
 * Table with custom cell rendering
 */
export const CustomRendering: Story = {
  args: {
    columns: [
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
      { key: 'status', header: 'Status', render: (item: MockData) => (
        <span className={clsx(
          'px-2 py-1 rounded-full text-xs font-medium',
          item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        )}>
          {item.status}
        </span>
      )},
      { key: 'actions', header: 'Actions', render: () => (
        <div className="flex gap-2">
          <button className="text-blue-600 hover:text-blue-800">
            <PencilIcon className="h-5 w-5" />
          </button>
          <button className="text-red-600 hover:text-red-800">
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      )},
    ],
    data: mockData,
  },
};

/**
 * Table with different sizes
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col space-y-8">
      <Table
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'email', header: 'Email' },
        ]}
        data={mockData.slice(0, 2)}
        size="sm"
      />
      <Table
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'email', header: 'Email' },
        ]}
        data={mockData.slice(0, 2)}
        size="md"
      />
      <Table
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'email', header: 'Email' },
        ]}
        data={mockData.slice(0, 2)}
        size="lg"
      />
    </div>
  ),
};

/**
 * Table with striped rows
 */
export const Striped: Story = {
  args: {
    columns: [
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
      { key: 'role', header: 'Role' },
    ],
    data: mockData,
    striped: true,
  },
};

/**
 * Table with hover effect on rows
 */
export const Hoverable: Story = {
  args: {
    columns: [
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
      { key: 'role', header: 'Role' },
    ],
    data: mockData,
    hoverable: true,
  },
};

/**
 * Table with borders
 */
export const Bordered: Story = {
  args: {
    columns: [
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
      { key: 'role', header: 'Role' },
    ],
    data: mockData,
    bordered: true,
  },
};

/**
 * Table with custom column alignment
 */
export const CustomAlignment: Story = {
  args: {
    columns: [
      { key: 'name', header: 'Name', align: 'left' },
      { key: 'email', header: 'Email', align: 'center' },
      { key: 'role', header: 'Role', align: 'right' },
    ],
    data: mockData,
  },
};

/**
 * Table with custom column widths
 */
export const CustomWidths: Story = {
  args: {
    columns: [
      { key: 'name', header: 'Name', width: 'w-1/4' },
      { key: 'email', header: 'Email', width: 'w-1/2' },
      { key: 'role', header: 'Role', width: 'w-1/4' },
    ],
    data: mockData,
  },
}; 