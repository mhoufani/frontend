import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './tabs';

const mockTabs = [
  {
    id: 'account',
    label: 'Account',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">Account Settings</h3>
        <p className="mt-2 text-gray-600">
          Manage your account settings and preferences.
        </p>
      </div>
    ),
  },
  {
    id: 'notifications',
    label: 'Notifications',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
        <p className="mt-2 text-gray-600">
          Choose how you want to be notified about updates.
        </p>
      </div>
    ),
  },
  {
    id: 'security',
    label: 'Security',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
        <p className="mt-2 text-gray-600">
          Update your security preferences and password.
        </p>
      </div>
    ),
  },
  {
    id: 'disabled',
    label: 'Billing',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">Billing Information</h3>
        <p className="mt-2 text-gray-600">
          Manage your billing information and subscriptions.
        </p>
      </div>
    ),
    disabled: true,
  },
];

/**
 * A flexible tabs component with multiple style variants and sizes
 */
const meta = {
  title: 'Atoms/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Features

- Multiple style variants (underline, pills)
- Different sizes (sm, md, lg)
- Disabled tab support
- Keyboard navigation
- Full accessibility support
- Custom styling through Tailwind classes

## Usage

\`\`\`tsx
import { Tabs } from '@mp/react-tw';

// Basic usage
<Tabs
  tabs={[
    { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
    { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
  ]}
/>

// With custom variant and size
<Tabs
  tabs={tabItems}
  variant="pills"
  size="lg"
  onChange={handleTabChange}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['underline', 'pills'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default tabs with underline variant
 */
export const Default: Story = {
  args: {
    tabs: mockTabs,
  },
};

/**
 * Pills variant with medium size
 */
export const Pills: Story = {
  args: {
    tabs: mockTabs,
    variant: 'pills',
  },
};

/**
 * Small size tabs
 */
export const Small: Story = {
  args: {
    tabs: mockTabs,
    size: 'sm',
  },
};

/**
 * Large size tabs
 */
export const Large: Story = {
  args: {
    tabs: mockTabs,
    size: 'lg',
  },
};

/**
 * Tabs with a default active tab
 */
export const WithDefaultTab: Story = {
  args: {
    tabs: mockTabs,
    defaultTab: 'notifications',
  },
};

/**
 * Interactive example with onChange handler
 */
export const Interactive: Story = {
  args: {
    tabs: mockTabs,
    onChange: (tabId: string) => {
      console.log(`Tab changed to: ${tabId}`);
    },
  },
}; 