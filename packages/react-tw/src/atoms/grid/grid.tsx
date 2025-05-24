import React, { FC, ReactNode } from 'react';
import clsx from 'clsx';

/**
 * Props for the Grid component
 * 
 * @interface GridProps
 * @property {ReactNode} children - The content to be rendered inside the grid
 * @property {string} [className] - Additional CSS classes
 * @property {number} [gap] - Gap between grid items (1-12)
 * @property {boolean} [center] - Whether to center the grid items
 */
export interface GridProps {
  children: ReactNode;
  className?: string;
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  center?: boolean;
}

/**
 * A responsive grid component that displays 4 cards per row on desktop
 * and adjusts for smaller screens
 * 
 * @component
 * @example
 * ```tsx
 * <Grid gap={4}>
 *   <Card />
 *   <Card />
 *   <Card />
 *   <Card />
 * </Grid>
 * ```
 */
export const Grid: FC<GridProps> = ({
  children,
  className,
  gap = 4,
  center = false,
}) => {
  return (
    <div
      className={clsx(
        'grid',
        // Responsive grid columns
        'grid-cols-1', // Mobile: 1 column
        'sm:grid-cols-2', // Tablet: 2 columns
        'lg:grid-cols-4', // Desktop: 4 columns
        // Gap utilities
        `gap-${gap}`,
        // Centering
        {
          'place-items-center': center,
        },
        className
      )}
    >
      {children}
    </div>
  );
}; 