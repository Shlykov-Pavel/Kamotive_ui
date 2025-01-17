import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import styles from '../../Tabs/Tabs.module.css';
import { TabProps } from 'kamotive_ui';
import { Tab } from './Tab';

const meta: Meta<TabProps> = {
  component: Tab,
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
  args: {
    disabled: false,
  },
  argTypes: {
    label: { description: 'Текст внутри таба', type: 'string' },
    value: { description: 'Задает выбор активного таба. Выбран по умолчанию первый таб.' },
    disabled: { description: 'Устанавливает атрибут disabled', control: { type: 'boolean' } },
    selected: { description: 'Устанавливает атрибут selected', control: { type: 'boolean' } },
    onClick: { description: 'Callback функция, вызываемая при изменении значения' },
  },
};

export default meta;

type Story = StoryObj<TabProps>;

export const TabSelect = (argTypes: TabProps): JSX.Element => <Tab {...argTypes} />;
TabSelect.storyName = 'Tab выбран';
TabSelect.args = {
  selected: true,
  disabled: false,
  label: 'Item',
};

export const TabDisabled = (argTypes: TabProps): JSX.Element => <Tab {...argTypes} />;
TabDisabled.storyName = 'Tab заблокирован';
TabDisabled.args = {
  disabled: true,
  label: 'Item',
};