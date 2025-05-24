import React, { FC, InputHTMLAttributes, ReactElement } from 'react';
import clsx from 'clsx';

type InputSize = 'sm' | 'md' | 'lg';

interface IconProps {
  className?: string;
  'aria-hidden'?: boolean;
}

/**
 * Props for the Input component
 * 
 * @interface InputProps
 * @extends {Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>} - Extends the native input HTML attributes except size
 * @property {ReactElement<IconProps>} [leftIcon] - Icon to display on the left side of the input
 * @property {ReactElement<IconProps>} [rightIcon] - Icon to display on the right side of the input
 * @property {'outline' | 'filled'} [variant] - Visual style variant
 * @property {'sm' | 'md' | 'lg'} [size] - Size variant
 * @property {boolean} [error] - Whether the input is in an error state
 */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  leftIcon?: ReactElement<IconProps>;
  rightIcon?: ReactElement<IconProps>;
  variant?: 'outline' | 'filled';
  size?: InputSize;
  error?: boolean;
}

const sizeClasses = {
  sm: 'px-2.5 py-1.5 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-2.5 text-lg',
};

const iconSizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

const variantClasses = {
  outline: {
    base: 'border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
    error: 'border-red-500 focus:ring-red-500 focus:border-red-500',
  },
  filled: {
    base: 'border-2 border-transparent bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500',
    error: 'bg-red-50 focus:ring-red-500',
  },
};

/**
 * A flexible input component with support for icons and different visual styles
 * 
 * @component
 * @example
 * ```tsx
 * <Input
 *   leftIcon={<SearchIcon />}
 *   placeholder="Search..."
 *   variant="filled"
 *   size="lg"
 * />
 * ```
 */
export const Input: FC<InputProps> = ({
  className,
  leftIcon,
  rightIcon,
  variant = 'outline',
  size = 'md',
  error = false,
  disabled = false,
  ...props
}) => {
  const inputClasses = clsx(
    'w-full rounded-md transition-colors duration-200',
    'placeholder-gray-400',
    'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
    sizeClasses[size],
    variantClasses[variant].base,
    {
      [variantClasses[variant].error]: error,
      'pl-10': leftIcon,
      'pr-10': rightIcon,
    },
    className
  );

  const iconWrapperClasses = clsx(
    'absolute inset-y-0 flex items-center pointer-events-none',
    {
      'left-0 pl-3': leftIcon,
      'right-0 pr-3': rightIcon,
    }
  );

  const iconClasses = clsx(
    iconSizeClasses[size],
    error ? 'text-red-500' : 'text-gray-400'
  );

  return (
    <div className="relative">
      {leftIcon && (
        <div className={iconWrapperClasses}>
          {React.cloneElement<IconProps>(leftIcon, {
            className: clsx(leftIcon.props.className, iconClasses),
            'aria-hidden': true,
          })}
        </div>
      )}
      <input
        className={inputClasses}
        disabled={disabled}
        {...props}
      />
      {rightIcon && (
        <div className={iconWrapperClasses}>
          {React.cloneElement<IconProps>(rightIcon, {
            className: clsx(rightIcon.props.className, iconClasses),
            'aria-hidden': true,
          })}
        </div>
      )}
    </div>
  );
}; 