import React, { ChangeEventHandler, useState } from 'react';
import type { Meta } from '@storybook/react';
import { Checkbox } from './Checkbox';


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
      <div style={{
        backgroundColor: 'var(--white)',
        padding: '30px',
        borderRadius: '10px',
        width: '900px'}}>
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

export const CheckboxLabel = (argTypes: CheckboxProps): JSX.Element => <Checkbox {...argTypes} />;
CheckboxLabel.storyName = 'Checkbox c label';
CheckboxLabel.args = {
  label: 'Чекбокс',
};

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

export const CheckboxCustomColor = (argTypes: CheckboxProps): JSX.Element => <Checkbox {...argTypes} />;
CheckboxCustomColor.storyName = 'Checkbox с кастомным цветом';
CheckboxCustomColor.args = {
  color: 'red',
};
