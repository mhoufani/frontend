import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './accordion';

/**
 * An expandable accordion component that can show/hide content with animation.
 */
const meta = {
  title: 'Atoms/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Features

- Smooth expand/collapse animation
- Customizable styling through Tailwind classes
- Accessible with proper ARIA attributes
- TypeScript support
- Optional default open state

## Usage

\`\`\`tsx
import { Accordion } from '@mp/react-tw';

<Accordion title="Section Title">
  <p>Your content here</p>
</Accordion>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic accordion example with simple text content.
 */
export const Default: Story = {
  args: {
    title: 'Click to expand',
    children: (
      <p className="text-gray-700">
        This is the content that will be shown or hidden when clicking the accordion header.
      </p>
    ),
  },
};

/**
 * Accordion that starts in the open state.
 */
export const DefaultOpen: Story = {
  args: {
    title: 'Pre-expanded section',
    defaultOpen: true,
    children: (
      <p className="text-gray-700">
        This accordion starts in the open state because defaultOpen is set to true.
      </p>
    ),
  },
};

/**
 * Accordion with rich content including lists and formatting.
 */
export const RichContent: Story = {
  args: {
    title: 'Detailed Information',
    children: (
      <div className="space-y-4">
        <p className="text-gray-700">Here's some detailed information with multiple elements:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>First important point</li>
          <li>Second important point</li>
          <li>Third important point with <strong>emphasis</strong></li>
        </ul>
        <p className="text-sm text-gray-500">Additional details can go here</p>
      </div>
    ),
  },
}; 