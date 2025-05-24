import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './checkbox';

/**
 * A customizable checkbox component that supports various states and sizes
 */
const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Features

- Multiple sizes (sm, md, lg)
- Error state with helper text
- Indeterminate state support
- Accessible by default
- Customizable through Tailwind classes

## Usage

\`\`\`tsx
import { Checkbox } from '@mp/react-tw';

// Basic usage
<Checkbox label="Accept terms" />

// With error and helper text
<Checkbox 
  label="Accept terms"
  error
  helperText="This field is required"
/>

// Indeterminate state
<Checkbox 
  label="Select all"
  indeterminate
/>

// Different sizes
<Checkbox label="Small checkbox" size="sm" />
<Checkbox label="Medium checkbox" size="md" />
<Checkbox label="Large checkbox" size="lg" />
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default checkbox with a label.
 */
export const Default: Story = {
  args: {
    label: 'Default checkbox',
  },
};

/**
 * Checkbox in a checked state.
 */
export const Checked: Story = {
  args: {
    label: 'Checked checkbox',
    checked: true,
  },
};

/**
 * Checkbox in an indeterminate state, useful for "select all" scenarios.
 */
export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate checkbox',
    indeterminate: true,
  },
};

/**
 * Checkbox with an error state and helper text.
 */
export const WithError: Story = {
  args: {
    label: 'Error checkbox',
    error: true,
    helperText: 'This field is required',
  },
};

/**
 * Disabled checkbox that cannot be interacted with.
 */
export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
};

/**
 * Checkbox with helper text providing additional context.
 */
export const WithHelperText: Story = {
  args: {
    label: 'Checkbox with helper text',
    helperText: 'Additional information about this checkbox',
  },
};

/**
 * Example showing all available sizes.
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Small checkbox" size="sm" />
      <Checkbox label="Medium checkbox" size="md" />
      <Checkbox label="Large checkbox" size="lg" />
    </div>
  ),
};

/**
 * Example showing different states side by side.
 */
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" checked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled checked" disabled checked />
      <Checkbox 
        label="With error" 
        error 
        helperText="This field is required" 
      />
    </div>
  ),
}; 