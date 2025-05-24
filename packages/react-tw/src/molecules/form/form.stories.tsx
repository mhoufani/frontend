import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Form, FormField } from './form';
import { Input } from '../../atoms/input';
import { Button } from '../../atoms/button';

const meta = {
  title: 'Molecules/Form',
  component: Form,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Form Component

A flexible form component that provides consistent styling and layout for form elements.

### Features

- Vertical and horizontal layouts
- Size variants (sm, md, lg)
- Built-in form field wrapper with labels and error handling
- Comprehensive validation rules
- Real-time validation
- Accessible by default
- TypeScript support

### Validation Rules

The FormField component supports the following validation rules:

\`\`\`tsx
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
  custom?: {
    validate: (value: any) => boolean;
    message: string;
  }[];
}
\`\`\`

### Usage

\`\`\`tsx
import { Form, FormField } from '@mp/react-tw';

function MyForm() {
  const handleSubmit = (formData: FormData) => {
    // Handle form submission
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormField
        label="Username"
        rules={{
          required: { value: true, message: 'Username is required' },
          minLength: { value: 3, message: 'Username must be at least 3 characters' }
        }}
      >
        <Input name="username" />
      </FormField>
      <FormField
        label="Email"
        rules={{
          required: { value: true, message: 'Email is required' },
          email: { value: true, message: 'Please enter a valid email' }
        }}
      >
        <Input type="email" name="email" />
      </FormField>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
\`\`\`
`,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

const DemoForm = ({ onSubmit, ...props }: any) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleError = (field: string) => (error: string | null) => {
    setErrors(prev => ({
      ...prev,
      [field]: error || '',
    }));
  };

  return (
    <Form onSubmit={console.log} {...props}>
      <FormField
        label="Username"
        error={errors.username}
        rules={{
          required: { value: true, message: 'Username is required' },
          minLength: { value: 3, message: 'Username must be at least 3 characters' },
          maxLength: { value: 20, message: 'Username must be at most 20 characters' }
        }}
        onError={handleError('username')}
        helpText="Choose a unique username between 3 and 20 characters"
      >
        <Input name="username" placeholder="johndoe" />
      </FormField>
      <FormField
        label="Email"
        error={errors.email}
        rules={{
          required: { value: true, message: 'Email is required' },
          email: { value: true, message: 'Please enter a valid email address' }
        }}
        onError={handleError('email')}
      >
        <Input type="email" name="email" placeholder="john@example.com" />
      </FormField>
      <FormField
        label="Password"
        error={errors.password}
        rules={{
          required: { value: true, message: 'Password is required' },
          minLength: { value: 8, message: 'Password must be at least 8 characters' },
          custom: [
            {
              validate: (value) => /[A-Z]/.test(value),
              message: 'Password must contain at least one uppercase letter'
            },
            {
              validate: (value) => /[0-9]/.test(value),
              message: 'Password must contain at least one number'
            }
          ]
        }}
        onError={handleError('password')}
        helpText="Must be at least 8 characters with numbers and uppercase letters"
      >
        <Input type="password" name="password" />
      </FormField>
      <Button type="submit" fullWidth>Submit</Button>
    </Form>
  );
};

export const Default: Story = {
  render: () => <DemoForm />,
};

export const WithValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [values, setValues] = useState<Record<string, string>>({});

  const handleError = (field: string) => (error: string | null) => {
    setErrors(prev => ({
      ...prev,
      [field]: error || '',
    }));
  };

  const handleChange = (field: string) => (value: string) => {
    setValues(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="w-full max-w-md space-y-6 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900">Sign Up</h2>
      <Form onSubmit={console.log}>
        <FormField
          label="Username"
          error={errors.username}
          rules={{
            required: { value: true, message: 'Username is required' },
            minLength: { value: 3, message: 'Username must be at least 3 characters' },
            pattern: { 
              value: /^[a-zA-Z0-9_]+$/,
              message: 'Username can only contain letters, numbers, and underscores'
            }
          }}
          onError={handleError('username')}
          onChange={handleChange('username')}
          helpText="Choose a unique username"
        >
          <Input
            name="username"
            value={values.username}
            placeholder="johndoe"
          />
        </FormField>
        <FormField
          label="Email"
          error={errors.email}
          rules={{
            required: { value: true, message: 'Email is required' },
            email: { value: true, message: 'Please enter a valid email address' }
          }}
          onError={handleError('email')}
          onChange={handleChange('email')}
        >
          <Input
            type="email"
            name="email"
            value={values.email}
            placeholder="john@example.com"
          />
        </FormField>
        <FormField
          label="Password"
          error={errors.password}
          rules={{
            required: { value: true, message: 'Password is required' },
            minLength: { value: 8, message: 'Password must be at least 8 characters' },
            custom: [
              {
                validate: (value) => /[A-Z]/.test(value),
                message: 'Password must contain at least one uppercase letter'
              },
              {
                validate: (value) => /[0-9]/.test(value),
                message: 'Password must contain at least one number'
              },
              {
                validate: (value) => /[!@#$%^&*]/.test(value),
                message: 'Password must contain at least one special character (!@#$%^&*)'
              }
            ]
          }}
          onError={handleError('password')}
          onChange={handleChange('password')}
          helpText="Must be at least 8 characters with numbers, uppercase letters, and special characters"
        >
          <Input
            type="password"
            name="password"
            value={values.password}
          />
        </FormField>
        <Button
          type="submit"
          fullWidth
          disabled={Object.values(errors).some(error => error !== '')}
        >
          Create Account
        </Button>
      </Form>
      <div className="mt-4 text-sm text-gray-600">
        <p>Validation Status:</p>
        <pre className="mt-2 p-4 bg-gray-100 rounded">
          {JSON.stringify({ values, errors }, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export const HorizontalLayout: Story = {
  render: () => <DemoForm layout="horizontal" />,
};

export const SmallSize: Story = {
  render: () => <DemoForm size="sm" />,
};

export const LargeSize: Story = {
  render: () => <DemoForm size="lg" />,
}; 