import React, { FC, ReactNode } from 'react';
import { ChevronUpDownIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

/**
 * Column configuration for the Table component
 * 
 * @interface TableColumn
 * @property {string} key - Unique identifier for the column
 * @property {string} header - Header text to display
 * @property {boolean} [sortable] - Whether the column is sortable
 * @property {(item: any) => ReactNode} [render] - Custom render function for cell content
 * @property {string} [width] - Custom width for the column (e.g., 'w-20', 'w-1/4')
 * @property {string} [align] - Text alignment ('left', 'center', 'right')
 */
export interface TableColumn<T = any> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (item: T) => ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

/**
 * Props for the Table component
 * 
 * @interface TableProps
 * @property {TableColumn[]} columns - Array of column configurations
 * @property {any[]} data - Array of data items to display
 * @property {string} [className] - Additional CSS classes
 * @property {boolean} [striped] - Whether to show striped rows
 * @property {boolean} [hoverable] - Whether to show hover effect on rows
 * @property {boolean} [bordered] - Whether to show borders between cells
 * @property {string} [size] - Size variant ('sm' | 'md' | 'lg')
 * @property {(item: T) => void} [onRowClick] - Callback when a row is clicked
 * @property {string} [sortColumn] - Currently sorted column key
 * @property {'asc' | 'desc'} [sortDirection] - Current sort direction
 * @property {(column: string, direction: 'asc' | 'desc') => void} [onSort] - Callback when sort changes
 */
export interface TableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  className?: string;
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onRowClick?: (item: T) => void;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
}

const sizeClasses = {
  sm: {
    padding: 'px-3 py-2',
    fontSize: 'text-sm',
  },
  md: {
    padding: 'px-4 py-3',
    fontSize: 'text-base',
  },
  lg: {
    padding: 'px-6 py-4',
    fontSize: 'text-lg',
  },
};

/**
 * A flexible table component with sorting, hover states, and responsive design
 * 
 * @component
 * @example
 * ```tsx
 * <Table
 *   columns={[
 *     { key: 'name', header: 'Name', sortable: true },
 *     { key: 'email', header: 'Email' },
 *     { key: 'role', header: 'Role' },
 *   ]}
 *   data={users}
 *   striped
 *   hoverable
 * />
 * ```
 */
export const Table: FC<TableProps> = ({
  columns,
  data,
  className,
  striped = false,
  hoverable = false,
  bordered = false,
  size = 'md',
  onRowClick,
  sortColumn,
  sortDirection,
  onSort,
}) => {
  const handleSort = (column: TableColumn) => {
    if (!column.sortable || !onSort) return;

    const newDirection = 
      sortColumn !== column.key
        ? 'asc'
        : sortDirection === 'asc'
          ? 'desc'
          : 'asc';

    onSort(column.key, newDirection);
  };

  const getSortIcon = (column: TableColumn) => {
    if (!column.sortable) return null;
    
    if (sortColumn !== column.key) {
      return <ChevronUpDownIcon className="w-4 h-4 text-gray-400" />;
    }
    
    return sortDirection === 'asc' 
      ? <ChevronUpIcon className="w-4 h-4 text-gray-700" />
      : <ChevronDownIcon className="w-4 h-4 text-gray-700" />;
  };

  return (
    <div className={clsx('overflow-x-auto', className)}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={clsx(
                  'font-semibold text-gray-900',
                  sizeClasses[size].padding,
                  sizeClasses[size].fontSize,
                  column.width,
                  {
                    'text-left': column.align === 'left' || !column.align,
                    'text-center': column.align === 'center',
                    'text-right': column.align === 'right',
                    'cursor-pointer select-none': column.sortable,
                    'border': bordered,
                  }
                )}
                onClick={() => handleSort(column)}
              >
                <div className="flex items-center gap-1">
                  <span>{column.header}</span>
                  {getSortIcon(column)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => onRowClick?.(item)}
              className={clsx(
                {
                  'bg-gray-50': striped && rowIndex % 2 === 1,
                  'hover:bg-gray-100': hoverable,
                  'cursor-pointer': onRowClick,
                }
              )}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={clsx(
                    'whitespace-nowrap',
                    sizeClasses[size].padding,
                    sizeClasses[size].fontSize,
                    column.width,
                    {
                      'text-left': column.align === 'left' || !column.align,
                      'text-center': column.align === 'center',
                      'text-right': column.align === 'right',
                      'border': bordered,
                    }
                  )}
                >
                  {column.render
                    ? column.render(item)
                    : (item as any)[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 