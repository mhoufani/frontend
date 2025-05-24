import React, { FC, ReactElement, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonVariant = 'solid' | 'outline' | 'ghost';

interface IconProps {
  className?: string;
  'aria-hidden'?: boolean;
}

/**
 * Props for the Button component
 * 
 * @interface ButtonProps
 * @extends {Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'>} - Extends the native button HTML attributes except size
 * @property {ReactElement<IconProps>} [leftIcon] - Icon to display on the left side of the button
 * @property {ReactElement<IconProps>} [rightIcon] - Icon to display on the right side of the button
 * @property {'solid' | 'outline' | 'ghost'} [variant] - Visual style variant
 * @property {'sm' | 'md' | 'lg'} [size] - Size variant
 * @property {boolean} [isLoading] - Whether the button is in a loading state
 * @property {boolean} [fullWidth] - Whether the button should take up the full width of its container
 */
export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  leftIcon?: ReactElement<IconProps>;
  rightIcon?: ReactElement<IconProps>;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-2.5 text-lg',
};

const iconSizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

const variantClasses = {
  solid: {
    base: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    disabled: 'bg-blue-300 cursor-not-allowed',
  },
  outline: {
    base: 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    disabled: 'border-blue-300 text-blue-300 cursor-not-allowed',
  },
  ghost: {
    base: 'bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    disabled: 'text-blue-300 cursor-not-allowed',
  },
};

/**
 * A flexible button component with support for icons, different sizes, and visual styles
 * 
 * @component
 * @example
 * ```tsx
 * <Button
 *   leftIcon={<SearchIcon />}
 *   variant="solid"
 *   size="lg"
 * >
 *   Search
 * </Button>
 * ```
 */
export const Button: FC<ButtonProps> = ({
  children,
  className,
  leftIcon,
  rightIcon,
  variant = 'solid',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  disabled = false,
  ...props
}) => {
  const buttonClasses = clsx(
    'inline-flex items-center justify-center gap-2 font-medium rounded-md',
    'transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    sizeClasses[size],
    variantClasses[variant].base,
    {
      [variantClasses[variant].disabled]: disabled || isLoading,
      'w-full': fullWidth,
      'cursor-wait opacity-80': isLoading,
    },
    className
  );

  const iconClasses = iconSizeClasses[size];

  const renderIcon = (icon: ReactElement<IconProps>) => {
    return React.cloneElement(icon, {
      className: clsx(icon.props.className, iconClasses),
      'aria-hidden': true,
    });
  };

  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className={clsx('animate-spin', iconClasses)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!isLoading && leftIcon && renderIcon(leftIcon)}
      {children}
      {!isLoading && rightIcon && renderIcon(rightIcon)}
    </button>
  );
};
