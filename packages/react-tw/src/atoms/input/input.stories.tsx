import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  EnvelopeIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  UserIcon,
  LockClosedIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/solid';
import { Input } from './input';

/**
 * A flexible input component that supports icons, different sizes, and various states
 */
const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Input Component

A flexible input component with support for icons, different sizes, and visual styles.

### Features

- Multiple size variants (sm, md, lg)
- Visual style variants (outline, filled)
- Left and right icon support
- Error state handling
- Fully accessible
- TypeScript support

### Usage

\`\`\`tsx
import { Input } from '@mp/react-tw';

// Basic usage
<Input placeholder="Enter text" />

// With icons
<Input
  leftIcon={<MagnifyingGlassIcon />}
  placeholder="Search..."
/>

// With error state
<Input
  error
  rightIcon={<ExclamationCircleIcon />}
  placeholder="Invalid input"
/>
\`\`\`
`,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic input with label and placeholder
 */
export const Default: Story = {
  args: {
    placeholder: 'Enter text',
  },
};

/**
 * Input with a leading icon
 */
export const WithLeftIcon: Story = {
  args: {
    leftIcon: <MagnifyingGlassIcon />,
    placeholder: 'Search...',
  },
};

/**
 * Input with a trailing icon
 */
export const WithRightIcon: Story = {
  args: {
    rightIcon: <ExclamationCircleIcon />,
    placeholder: 'Enter text',
  },
};

/**
 * Input with both leading and trailing icons
 */
export const WithBothIcons: Story = {
  args: {
    leftIcon: <MagnifyingGlassIcon />,
    rightIcon: <ExclamationCircleIcon />,
    placeholder: 'Search...',
  },
};

/**
 * Input in error state with helper text
 */
export const WithError: Story = {
  args: {
    error: true,
    rightIcon: <ExclamationCircleIcon />,
    placeholder: 'Invalid input',
  },
};

/**
 * Disabled input
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
  },
};

/**
 * Input with helper text
 */
export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
  },
};

/**
 * Input with helper text
 */
export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter email',
  },
};

/**
 * Example showing all available sizes
 */
export const SmallSize: Story = {
  args: {
    size: 'sm',
    placeholder: 'Small input',
  },
};

/**
 * Example showing all available sizes
 */
export const LargeSize: Story = {
  args: {
    size: 'lg',
    placeholder: 'Large input',
  },
};

/**
 * Example showing different states side by side
 */
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col space-y-4 min-w-[300px]">
      <Input
        label="Default"
        placeholder="Default state"
        leadingIcon={<UserIcon />}
      />
      <Input
        label="With helper"
        placeholder="With helper text"
        helperText="This is a helper text"
        leadingIcon={<EnvelopeIcon />}
      />
      <Input
        label="Error"
        placeholder="Error state"
        error
        helperText="This field has an error"
        leadingIcon={<ExclamationCircleIcon />}
      />
      <Input
        label="Disabled"
        placeholder="Disabled state"
        disabled
        leadingIcon={<UserIcon />}
      />
    </div>
  ),
}; 