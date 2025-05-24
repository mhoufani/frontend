import React, { FC, ReactNode, FormEvent, ReactElement } from 'react';
import clsx from 'clsx';

type ValidationRule = {
  validate: (value: any) => boolean;
  message: string;
};

interface ValidationRules {
  required?: {
    value: boolean;
    message: string;
  };
  pattern?: {
    value: RegExp;
    message: string;
  };
  minLength?: {
    value: number;
    message: string;
  };
  maxLength?: {
    value: number;
    message: string;
  };
  min?: {
    value: number;
    message: string;
  };
  max?: {
    value: number;
    message: string;
  };
  email?: {
    value: boolean;
    message: string;
  };
  custom?: ValidationRule[];
}

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const validateField = (value: any, rules?: ValidationRules): string | null => {
  if (!rules) return null;

  if (rules.required?.value && (!value || value.length === 0)) {
    return rules.required.message;
  }

  if (value) {
    if (rules.email?.value && !EMAIL_REGEX.test(value)) {
      return rules.email.message;
    }

    if (rules.pattern?.value && !rules.pattern.value.test(value)) {
      return rules.pattern.message;
    }

    if (rules.minLength?.value && value.length < rules.minLength.value) {
      return rules.minLength.message;
    }

    if (rules.maxLength?.value && value.length > rules.maxLength.value) {
      return rules.maxLength.message;
    }

    if (rules.min?.value && Number(value) < rules.min.value) {
      return rules.min.message;
    }

    if (rules.max?.value && Number(value) > rules.max.value) {
      return rules.max.message;
    }

    if (rules.custom) {
      for (const rule of rules.custom) {
        if (!rule.validate(value)) {
          return rule.message;
        }
      }
    }
  }

  return null;
};

/**
 * Props for the Form component
 * 
 * @interface FormProps
 * @property {ReactNode} children - Form content
 * @property {string} [className] - Additional CSS classes
 * @property {(data: FormData) => void} onSubmit - Form submission handler
 * @property {'vertical' | 'horizontal'} [layout] - Form layout direction
 * @property {'sm' | 'md' | 'lg'} [size] - Size variant for form elements
 * @property {boolean} [disabled] - Whether the form is disabled
 */
export interface FormProps {
  children: ReactNode;
  className?: string;
  onSubmit: (data: FormData) => void;
  layout?: 'vertical' | 'horizontal';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

/**
 * Props for the FormField component
 * 
 * @interface FormFieldProps
 * @property {ReactNode} children - Field content
 * @property {string} [label] - Field label
 * @property {string} [error] - Error message
 * @property {string} [helpText] - Help text
 * @property {boolean} [required] - Whether the field is required
 * @property {ValidationRules} [rules] - Validation rules for the field
 * @property {(value: any) => void} [onChange] - Change handler
 * @property {(error: string | null) => void} [onError] - Error handler
 */
export interface FormFieldProps {
  children: ReactNode;
  label?: string;
  error?: string;
  helpText?: string;
  required?: boolean;
  rules?: ValidationRules;
  onChange?: (value: any) => void;
  onError?: (error: string | null) => void;
}

const sizeClasses = {
  sm: 'space-y-3',
  md: 'space-y-4',
  lg: 'space-y-5',
};

const layoutClasses = {
  vertical: 'flex flex-col',
  horizontal: 'grid grid-cols-1 md:grid-cols-3 gap-4 items-start',
};

/**
 * A form component that provides consistent styling and layout for form elements
 * 
 * @component
 * @example
 * ```tsx
 * <Form onSubmit={handleSubmit}>
 *   <FormField label="Name" required>
 *     <Input placeholder="Enter your name" />
 *   </FormField>
 *   <FormField label="Email">
 *     <Input type="email" placeholder="Enter your email" />
 *   </FormField>
 *   <Button type="submit">Submit</Button>
 * </Form>
 * ```
 */
export const Form: FC<FormProps> = ({
  children,
  className,
  onSubmit,
  layout = 'vertical',
  size = 'md',
  disabled = false,
}) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(
        sizeClasses[size],
        className
      )}
      noValidate
    >
      <div className={clsx(
        'w-full',
        sizeClasses[size]
      )}>
        {children}
      </div>
    </form>
  );
};

/**
 * A form field wrapper that provides consistent styling and layout for form elements
 * 
 * @component
 * @example
 * ```tsx
 * <FormField
 *   label="Email"
 *   rules={{
 *     required: { value: true, message: 'Email is required' },
 *     email: { value: true, message: 'Please enter a valid email' }
 *   }}
 *   helpText="We'll never share your email"
 * >
 *   <Input type="email" />
 * </FormField>
 * ```
 */
export const FormField: FC<FormFieldProps> = ({
  children,
  label,
  error,
  helpText,
  required,
  rules,
  onChange,
  onError,
}) => {
  const id = `field-${Math.random().toString(36).substr(2, 9)}`;

  const handleChange = (e: any) => {
    const value = e.target.value;
    const validationError = validateField(value, rules);
    
    onChange?.(value);
    onError?.(validationError);
  };

  const childProps = {
    id,
    'aria-describedby': error ? `${id}-error` : helpText ? `${id}-help` : undefined,
    onChange: handleChange,
    required: required || rules?.required?.value,
  };

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className={clsx(
            'block text-sm font-medium mb-1',
            error ? 'text-red-500' : 'text-gray-700'
          )}
        >
          {label}
          {(required || rules?.required?.value) && (
            <span className="text-red-500 ml-1">*</span>
          )}
        </label>
      )}
      <div className="mt-1">
        {React.isValidElement(children) &&
          React.cloneElement(children as ReactElement, childProps)}
      </div>
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1 text-sm text-red-500"
        >
          {error}
        </p>
      )}
      {helpText && !error && (
        <p
          id={`${id}-help`}
          className="mt-1 text-sm text-gray-500"
        >
          {helpText}
        </p>
      )}
    </div>
  );
}; 