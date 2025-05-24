import React, { FC, ReactNode, useState } from 'react';
import clsx from 'clsx';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

/**
 * Props for the Accordion component
 * 
 * @interface AccordionProps
 * @property {string} title - The header text of the accordion
 * @property {ReactNode} children - The content to be shown/hidden
 * @property {boolean} [defaultOpen] - Whether the accordion is open by default
 * @property {string} [className] - Additional CSS classes
 */
export interface AccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

/**
 * A simple accordion component that can show/hide content
 * 
 * @component
 * @example
 * ```tsx
 * <Accordion title="Section 1">
 *   <p>Content goes here</p>
 * </Accordion>
 * ```
 */
export const Accordion: FC<AccordionProps> = ({
  title,
  children,
  defaultOpen = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={clsx('border rounded-md', className)}>
      <button
        className="w-full px-4 py-2 text-left flex justify-between items-center bg-gray-50 hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <ChevronDownIcon
          className={clsx(
            'w-4 h-4 transition-transform',
            isOpen ? 'transform rotate-180' : ''
          )}
        />
      </button>
      <div
        className={clsx(
          'px-4 py-2 transition-all duration-200',
          isOpen ? 'block' : 'hidden'
        )}
        role="region"
        aria-labelledby={title}
      >
        {children}
      </div>
    </div>
  );
}; 