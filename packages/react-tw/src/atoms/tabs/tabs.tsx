import React, { FC, ReactNode, useState, useCallback } from 'react';
import clsx from 'clsx';

/**
 * Interface for individual tab items
 * 
 * @interface TabItem
 * @property {string} id - Unique identifier for the tab
 * @property {string} label - Label text to display in the tab
 * @property {ReactNode} content - Content to display when tab is active
 * @property {boolean} [disabled] - Whether the tab is disabled
 */
export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

/**
 * Props for the Tabs component
 * 
 * @interface TabsProps
 * @property {TabItem[]} tabs - Array of tab items
 * @property {string} [defaultTab] - ID of the default active tab
 * @property {string} [className] - Additional CSS classes
 * @property {(tabId: string) => void} [onChange] - Callback when active tab changes
 * @property {'underline' | 'pills'} [variant] - Visual style variant
 * @property {'sm' | 'md' | 'lg'} [size] - Size variant
 */
export interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  className?: string;
  onChange?: (tabId: string) => void;
  variant?: 'underline' | 'pills';
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const variantClasses = {
  underline: {
    list: 'border-b border-gray-200',
    tab: {
      base: 'border-b-2 border-transparent focus:outline-none',
      active: 'text-blue-600 border-blue-500',
      inactive: 'text-gray-500 hover:text-gray-700',
      disabled: 'text-gray-300 cursor-not-allowed',
    },
  },
  pills: {
    list: 'space-x-2',
    tab: {
      base: 'rounded-md focus:outline-none',
      active: 'bg-blue-50 text-blue-600',
      inactive: 'text-gray-500 hover:text-gray-700 hover:bg-gray-50',
      disabled: 'text-gray-300 cursor-not-allowed',
    },
  },
};

/**
 * A flexible tabs component with multiple style variants and sizes
 * 
 * @component
 * @example
 * ```tsx
 * <Tabs
 *   tabs={[
 *     { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
 *     { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
 *   ]}
 *   variant="underline"
 *   size="md"
 * />
 * ```
 */
export const Tabs: FC<TabsProps> = ({
  tabs,
  defaultTab,
  className,
  onChange,
  variant = 'underline',
  size = 'md',
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabClick = useCallback((tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  }, [onChange]);

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div className={clsx('w-full', className)}>
      <div
        role="tablist"
        className={clsx(
          'flex',
          variantClasses[variant].list
        )}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            disabled={tab.disabled}
            className={clsx(
              'transition-colors duration-200 font-medium',
              sizeClasses[size],
              variantClasses[variant].tab.base,
              {
                [variantClasses[variant].tab.active]: activeTab === tab.id && !tab.disabled,
                [variantClasses[variant].tab.inactive]: activeTab !== tab.id && !tab.disabled,
                [variantClasses[variant].tab.disabled]: tab.disabled,
              }
            )}
            onClick={() => !tab.disabled && handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className="mt-4"
      >
        {activeTabContent}
      </div>
    </div>
  );
}; 