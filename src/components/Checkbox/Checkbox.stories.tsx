import React, { ChangeEventHandler, useState } from 'react';
import type { Meta } from '@storybook/react';

import { Checkbox } from './Checkbox';
import './Checkbox.module.css';

export interface CheckboxProps {
  /** Идентификатор */
  checked?: boolean;
  /** Обработчик изменения состояния */
  onChange?: ChangeEventHandler<HTMLInputElement>
  /** Заблокированный чекбокс */
  disabled?: boolean;
  /** Размер чекбокса */
  size?: 'sm' | 'md';
  /** Текст лейбла */
  label?: string;
}

const meta: Meta<CheckboxProps> = {
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="story--wrapper-checkbox">
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
