import React, { FC, InputHTMLAttributes, useRef, useEffect } from 'react';
import { CheckIcon, MinusIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

/**
 * Props for the Checkbox component
 * 
 * @interface CheckboxProps
 * @extends {InputHTMLAttributes<HTMLInputElement>}
 * @property {string} [label] - The label text for the checkbox
 * @property {boolean} [error] - Whether the checkbox is in an error state
 * @property {string} [helperText] - Helper text to display below the checkbox
 * @property {boolean} [indeterminate] - Whether the checkbox is in an indeterminate state
 * @property {string} [size] - Size of the checkbox ('sm' | 'md' | 'lg')
 */
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  error?: boolean;
  helperText?: string;
  indeterminate?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: {
    checkbox: 'h-4 w-4',
    icon: 'h-4 w-4',
    label: 'text-sm',
  },
  md: {
    checkbox: 'h-5 w-5',
    icon: 'h-5 w-5',
    label: 'text-base',
  },
  lg: {
    checkbox: 'h-6 w-6',
    icon: 'h-6 w-6',
    label: 'text-lg',
  },
};

/**
 * A custom checkbox component with a modern design
 * 
 * @component
 * @example
 * ```tsx
 * <Checkbox
 *   label="Accept terms"
 *   onChange={(e) => console.log(e.target.checked)}
 *   size="md"
 * />
 * ```
 */
export const Checkbox: FC<CheckboxProps> = ({
  label,
  error,
  helperText,
  className,
  disabled,
  checked,
  indeterminate,
  size = 'md',
  id,
  ...props
}) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate ?? false;
    }
  }, [indeterminate]);

  const uniqueId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={clsx('flex flex-col gap-1', className)}>
      <label 
        className={clsx(
          'inline-flex items-center gap-2',
          disabled && 'cursor-not-allowed'
        )}
        htmlFor={uniqueId}
      >
        <div className="relative flex items-center">
          <input
            ref={checkboxRef}
            id={uniqueId}
            type="checkbox"
            className={clsx(
              'peer appearance-none rounded border',
              sizeClasses[size].checkbox,
              'border-gray-300 bg-white transition-all',
              'checked:border-blue-600 checked:bg-blue-600',
              'disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100',
              error && 'border-red-500',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              'hover:border-blue-500',
              disabled && 'hover:border-gray-200'
            )}
            disabled={disabled}
            checked={checked}
            aria-describedby={helperText ? `${uniqueId}-description` : undefined}
            {...props}
          />
          {indeterminate ? (
            <MinusIcon
              className={clsx(
                'pointer-events-none absolute left-0',
                sizeClasses[size].icon,
                'text-white opacity-0',
                'peer-checked:opacity-100 peer-indeterminate:opacity-100',
                disabled && 'text-gray-400'
              )}
            />
          ) : (
            <CheckIcon
              className={clsx(
                'pointer-events-none absolute left-0',
                sizeClasses[size].icon,
                'text-white opacity-0',
                'peer-checked:opacity-100',
                disabled && 'text-gray-400'
              )}
            />
          )}
        </div>
        {label && (
          <span
            className={clsx(
              'select-none',
              sizeClasses[size].label,
              'text-gray-700',
              disabled && 'text-gray-400',
              error && 'text-red-500'
            )}
          >
            {label}
          </span>
        )}
      </label>
      {helperText && (
        <span
          id={`${uniqueId}-description`}
          className={clsx(
            'text-xs',
            error ? 'text-red-500' : 'text-gray-500'
          )}
        >
          {helperText}
        </span>
      )}
    </div>
  );
}; 