import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Button } from './button';

/**
 * A versatile button component that supports both text and icon + text combinations.
 */
const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Features

- Customizable styling through Tailwind classes
- Optional icon support
- Accessible
- TypeScript support

## Usage

\`\`\`tsx
import { Button } from '@mp/react-tw';

// Basic usage
<Button>Click me</Button>

// With icon
<Button icon={<MagnifyingGlassIcon className="w-5 h-5" />}>Search</Button>

// With custom styling
<Button className="bg-red-500">Custom Style</Button>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default button variant with text only.
 */
export const Default: Story = {
  args: {
    children: 'Button',
  },
};

/**
 * Button with an icon displayed before the text.
 */
export const WithIcon: Story = {
  args: {
    children: 'Search',
    icon: <MagnifyingGlassIcon className="w-5 h-5" />,
  },
};
