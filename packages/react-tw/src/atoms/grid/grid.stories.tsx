import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from './grid';

const ExampleCard = ({ title }: { title: string }) => (
  <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    <p className="mt-2 text-gray-600">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </p>
    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
      Learn More
    </button>
  </div>
);

/**
 * A responsive grid component that displays 4 cards per row on desktop
 * and adjusts for smaller screens
 */
const meta = {
  title: 'Atoms/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Features

- Responsive grid layout
- Configurable gap between items
- Optional centering of items
- Customizable through Tailwind classes

## Usage

\`\`\`tsx
import { Grid } from '@mp/react-tw';

// Basic usage
<Grid>
  <Card />
  <Card />
  <Card />
  <Card />
</Grid>

// With custom gap and centering
<Grid gap={6} center>
  <Card />
  <Card />
  <Card />
  <Card />
</Grid>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    gap: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 8, 10, 12],
    },
    center: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic grid with 4 cards
 */
export const Default: Story = {
  args: {
    children: [
      <ExampleCard key="1" title="Card 1" />,
      <ExampleCard key="2" title="Card 2" />,
      <ExampleCard key="3" title="Card 3" />,
      <ExampleCard key="4" title="Card 4" />,
    ],
  },
};

/**
 * Grid with custom gap
 */
export const CustomGap: Story = {
  args: {
    gap: 8,
    children: [
      <ExampleCard key="1" title="Card 1" />,
      <ExampleCard key="2" title="Card 2" />,
      <ExampleCard key="3" title="Card 3" />,
      <ExampleCard key="4" title="Card 4" />,
    ],
  },
};

/**
 * Grid with centered items
 */
export const CenteredItems: Story = {
  args: {
    center: true,
    children: [
      <ExampleCard key="1" title="Card 1" />,
      <ExampleCard key="2" title="Card 2" />,
      <ExampleCard key="3" title="Card 3" />,
    ],
  },
};

/**
 * Grid with many items
 */
export const ManyItems: Story = {
  args: {
    children: Array.from({ length: 8 }, (_, i) => (
      <ExampleCard key={i + 1} title={`Card ${i + 1}`} />
    )),
  },
}; 