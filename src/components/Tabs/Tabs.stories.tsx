import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import styles from './Tabs.module.css';
import { TabsProps } from 'kamotive_ui';
import { Tabs } from './Tabs';
import { Tab } from './Tab/Tab';

const meta: Meta<TabsProps> = {
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className={styles[`story--wrapper`]}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    value: { description: 'Задает выбор активного таба. Выбран по умолчанию первый таб.' },
    onChange: { description: 'Callback функция, вызываемая при изменении значения' },
    children: { description: 'Содержимое вкладок' },
  },
};

export default meta;

type Story = StoryObj<TabsProps>;

export const TabsDefault = (argTypes: TabsProps): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<string>('tab1');

  const handleChange = (newValue: string) => {
    setSelectedTab(newValue);
  };
  console.log('selectedTab11', selectedTab);

  return (
    <>
      <Tabs value={selectedTab} onChange={handleChange}>
        <Tab value="tab1" label="Item 1">
          <div>Content 1</div>
        </Tab>
        <Tab value="tab2" label="Item 2">
          <div>Content 2</div>
        </Tab>
        <Tab value="tab3" label="Item 3" disabled />
      </Tabs>
    </>
  );
};
TabsDefault.storyName = 'Tabs';
