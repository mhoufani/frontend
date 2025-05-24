import React, { FC, ReactNode } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

/**
 * Props for individual breadcrumb items
 * 
 * @interface BreadcrumbItemProps
 * @property {ReactNode} children - The content of the breadcrumb item
 * @property {string} [href] - Optional URL for the breadcrumb item
 * @property {boolean} [isCurrent] - Whether this is the current/active breadcrumb item
 */
export interface BreadcrumbItemProps {
  children: ReactNode;
  href?: string;
  isCurrent?: boolean;
}

/**
 * Props for the Breadcrumb container
 * 
 * @interface BreadcrumbProps
 * @property {ReactNode} children - The breadcrumb items
 * @property {ReactNode} [separator] - Custom separator between items
 * @property {string} [className] - Additional CSS classes
 */
export interface BreadcrumbProps {
  children: ReactNode;
  separator?: ReactNode;
  className?: string;
}

/**
 * Individual breadcrumb item component
 * 
 * @component
 */
export const BreadcrumbItem: FC<BreadcrumbItemProps> = ({
  children,
  href,
  isCurrent,
}) => {
  const commonClasses = clsx(
    'text-sm font-medium transition-colors',
    isCurrent ? 'text-gray-900 cursor-default' : 'text-gray-500 hover:text-gray-700'
  );

  if (href && !isCurrent) {
    return (
      <a
        href={href}
        className={commonClasses}
        aria-current={isCurrent ? 'page' : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <span
      className={commonClasses}
      aria-current={isCurrent ? 'page' : undefined}
    >
      {children}
    </span>
  );
};

/**
 * A breadcrumb navigation component that shows the current page's location in a hierarchical structure
 * 
 * @component
 * @example
 * ```tsx
 * <Breadcrumb>
 *   <BreadcrumbItem href="/">Home</BreadcrumbItem>
 *   <BreadcrumbItem href="/products">Products</BreadcrumbItem>
 *   <BreadcrumbItem isCurrent>Categories</BreadcrumbItem>
 * </Breadcrumb>
 * ```
 */
export const Breadcrumb: FC<BreadcrumbProps> = ({
  children,
  separator = <ChevronRightIcon className="h-4 w-4 text-gray-400" />,
  className,
}) => {
  const items = React.Children.toArray(children).filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className={clsx('', className)}>
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <div className="mx-2">{separator}</div>}
            {item}
          </li>
        ))}
      </ol>
    </nav>
  );
}; 