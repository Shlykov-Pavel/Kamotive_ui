import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './Checkbox';
import styles from './Checkbox.module.css';
import { CheckboxProps } from 'kamotive_ui';

const meta: Meta<CheckboxProps> = {
  component: Checkbox,
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
      description: 'Свойство, позволяющее регулировать размер чекбокса',
      control: { type: 'radio' },
      options: ['sm', 'md'],
    },
    disabled: { description: 'Устанавливает атрибут disabled', control: { type: 'boolean' } },
    checked: { description: 'Задаёт включённое состояние для компонента' },
    label: { description: 'Текст лейбла чекбокса', type: 'string' },
  },
};

export default meta;

type Story = StoryObj<CheckboxProps>;

export const CheckboxOff = (argTypes: CheckboxProps): JSX.Element => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
      setChecked(prev => !prev); 
  };

  return (
      <Checkbox 
          checked={checked} 
          onChange={handleChange} 
          {...argTypes} 
      />
  );
}
CheckboxOff.storyName = 'Checkbox по умолчанию'; 

export const CheckboxChecked = (argTypes: CheckboxProps): JSX.Element => <Checkbox {...argTypes} />;
CheckboxChecked.storyName = 'Checkbox выбран';
CheckboxChecked.args = {
  checked: true,
  disabled: false,
};

export const CheckboxDisabled = (argTypes: CheckboxProps): JSX.Element => <Checkbox {...argTypes} />;
CheckboxDisabled.storyName = 'Checkbox заблокирован';
CheckboxDisabled.args = {
  checked: false,
  disabled: true,
};

export const CheckboxCheckedDisabled = (argTypes: CheckboxProps): JSX.Element => <Checkbox {...argTypes} />;
CheckboxCheckedDisabled.storyName = 'Checkbox выбран и заблокирован';
CheckboxCheckedDisabled.args = {
  checked: true,
  disabled: true,
};
