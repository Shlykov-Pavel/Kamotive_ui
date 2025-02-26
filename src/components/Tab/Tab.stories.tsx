import React from 'react';
import type { Meta } from '@storybook/react';
import './Tab.module.css';
import { Tab } from './Tab';

export interface TabProps {
  /** Значение */
  value?:string;
  /** Обработчик клика */
  onClick?: (value: string ) => void;
  /** Текст лейбла */
  label?:string;
  /** Размер */
  selected?: boolean;
  /** Заблокированный */
  disabled?:boolean;
  /** Табы */
  children?: React.ReactNode;
}
const meta: Meta<TabProps> = {
  component: Tab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='story--wrapper-tab'>
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