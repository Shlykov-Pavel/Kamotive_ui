import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { ToggleButton } from './ToggleButton';
import styles from './ToggleButton.module.css';
import { ToggleButtonProps } from 'kamotive_ui';

const meta: Meta<ToggleButtonProps> = {
  component: ToggleButton,
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
    size: 'sm',
    disabled: false,
  },
  argTypes: {
    size: {
      description: 'Свойство, позволяющее регулировать размер кнопки',
      control: { type: 'radio' },
      options: ['sm', 'md'],
    },
    disabled: { description: 'Устанавливает атрибут disabled', control: { type: 'boolean' } },
    value: { description: 'Задаёт включённое состояние для компонента' },
    label: { description: 'Текст лейбла радио кнопки', type: 'string' },
  },
};

export default meta;

type Story = StoryObj<ToggleButtonProps>;

export const CheckboxOff = (argTypes: ToggleButtonProps): JSX.Element => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
      setChecked(prev => !prev); 
  };

  return (
      <ToggleButton 
          value={checked} 
          onChange={handleChange} 
          {...argTypes} 
      />
  );
}
CheckboxOff.storyName = 'ToggleButton по умолчанию'; 

export const CheckboxChecked = (argTypes: ToggleButtonProps): JSX.Element => <ToggleButton {...argTypes} />;
CheckboxChecked.storyName = 'ToggleButton выбран';
CheckboxChecked.args = {
  value: true,
  disabled: false,
};

export const CheckboxDisabled = (argTypes: ToggleButtonProps): JSX.Element => <ToggleButton {...argTypes} />;
CheckboxDisabled.storyName = 'ToggleButton заблокирован';
CheckboxDisabled.args = {
  value: false,
  disabled: true,
};

export const CheckboxCheckedDisabled = (argTypes: ToggleButtonProps): JSX.Element => <ToggleButton {...argTypes} />;
CheckboxCheckedDisabled.storyName = 'ToggleButton выбран и заблокирован';
CheckboxCheckedDisabled.args = {
  value: true,
  disabled: true,
};