import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Table } from './table';

const mockData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
];

const mockColumns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
];

describe('Table', () => {
  it('renders headers and data correctly', () => {
    render(<Table columns={mockColumns} data={mockData} />);

    // Check headers
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();

    // Check data
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  it('handles custom render functions', () => {
    const columnsWithRender = [
      ...mockColumns,
      {
        key: 'actions',
        header: 'Actions',
        render: (item: typeof mockData[0]) => (
          <button data-testid={`action-${item.id}`}>Edit</button>
        ),
      },
    ];

    render(<Table columns={columnsWithRender} data={mockData} />);

    expect(screen.getByTestId('action-1')).toBeInTheDocument();
    expect(screen.getByTestId('action-2')).toBeInTheDocument();
  });

  it('applies striped rows correctly', () => {
    render(<Table columns={mockColumns} data={mockData} striped />);

    const rows = screen.getAllByRole('row').slice(1); // Skip header row
    expect(rows[1]).toHaveClass('bg-gray-50');
  });

  it('handles row clicks', () => {
    const handleRowClick = jest.fn();
    render(
      <Table
        columns={mockColumns}
        data={mockData}
        onRowClick={handleRowClick}
      />
    );

    const firstRow = screen.getByText('John Doe').closest('tr');
    fireEvent.click(firstRow!);

    expect(handleRowClick).toHaveBeenCalledWith(mockData[0]);
  });

  it('handles sorting', () => {
    const handleSort = jest.fn();
    render(
      <Table
        columns={mockColumns}
        data={mockData}
        onSort={handleSort}
        sortColumn="name"
        sortDirection="asc"
      />
    );

    const nameHeader = screen.getByText('Name').closest('th');
    fireEvent.click(nameHeader!);

    expect(handleSort).toHaveBeenCalledWith('name', 'desc');
  });

  it('applies different sizes correctly', () => {
    const { rerender } = render(
      <Table columns={mockColumns} data={mockData} size="sm" />
    );

    let cells = screen.getAllByRole('cell');
    cells.forEach(cell => {
      expect(cell).toHaveClass('px-3', 'py-2', 'text-sm');
    });

    rerender(<Table columns={mockColumns} data={mockData} size="lg" />);
    cells = screen.getAllByRole('cell');
    cells.forEach(cell => {
      expect(cell).toHaveClass('px-6', 'py-4', 'text-lg');
    });
  });

  it('applies borders when specified', () => {
    render(<Table columns={mockColumns} data={mockData} bordered />);

    const cells = screen.getAllByRole('cell');
    cells.forEach(cell => {
      expect(cell).toHaveClass('border');
    });
  });

  it('applies custom column alignment', () => {
    const alignedColumns = [
      { ...mockColumns[0], align: 'left' as const },
      { ...mockColumns[1], align: 'center' as const },
      { ...mockColumns[2], align: 'right' as const },
    ];

    render(<Table columns={alignedColumns} data={mockData} />);

    const headers = screen.getAllByRole('columnheader');
    expect(headers[0]).toHaveClass('text-left');
    expect(headers[1]).toHaveClass('text-center');
    expect(headers[2]).toHaveClass('text-right');
  });

  it('applies custom column widths', () => {
    const columnsWithWidth = [
      { ...mockColumns[0], width: 'w-1/4' },
      { ...mockColumns[1], width: 'w-1/2' },
      { ...mockColumns[2], width: 'w-1/4' },
    ];

    render(<Table columns={columnsWithWidth} data={mockData} />);

    const headers = screen.getAllByRole('columnheader');
    expect(headers[0]).toHaveClass('w-1/4');
    expect(headers[1]).toHaveClass('w-1/2');
    expect(headers[2]).toHaveClass('w-1/4');
  });

  it('handles empty data array', () => {
    render(<Table columns={mockColumns} data={[]} />);
    
    // Headers should still be present
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();

    // No data rows should be present
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(1); // Only header row
  });

  it('shows sort icons correctly', () => {
    const { rerender } = render(
      <Table
        columns={mockColumns}
        data={mockData}
        sortColumn="name"
        sortDirection="asc"
      />
    );

    // Check for ascending sort icon
    let nameHeader = screen.getByText('Name').closest('th');
    expect(nameHeader).toContainElement(screen.getByTestId('chevron-up-icon'));

    // Check for descending sort icon
    rerender(
      <Table
        columns={mockColumns}
        data={mockData}
        sortColumn="name"
        sortDirection="desc"
      />
    );
    nameHeader = screen.getByText('Name').closest('th');
    expect(nameHeader).toContainElement(screen.getByTestId('chevron-down-icon'));
  });
}); 