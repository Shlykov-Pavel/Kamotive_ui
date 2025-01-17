import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import styles from './Tabs.module.css';
import { TabsProps } from 'kamotive_ui';
import { Tabs } from './Tabs';
import { Tab } from './Tab/Tab';
import { TabPanel } from './TabPanel';

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
        <Tab value="tab1" label="Item 1" />
        <Tab value="tab2" label="Item 2" />
        <Tab value="tab3" label="Item 3" disabled />
      </Tabs>
      <TabPanel value="tab1" selected={selectedTab === "tab1"}> 111</TabPanel>
      <TabPanel value="tab2" selected={selectedTab === "tab2"}> 222</TabPanel>
      <TabPanel value="tab3" selected={selectedTab  === "tab3"}> 333'</TabPanel>
    </>
  );
};
TabsDefault.storyName = 'Tabs';
