import React, { ChangeEventHandler, useState } from 'react';
import type { Meta } from '@storybook/react';
import { ToggleButton } from './ToggleButton';


interface ToggleButtonProps {
  /** Знчение */
   value?: boolean;
   /** Callback при изменении значения */
   onChange?: ChangeEventHandler<HTMLInputElement>
   /** Заблокированная кнопка */
   disabled?: boolean;
   /** Размер кнопки */
   size?: 'sm' | 'md';
   /** Текст кнопки */
   label?:string;
   testId?: string;
 }

const meta: Meta<ToggleButtonProps> = {
  component: ToggleButton,
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
    size: 'md',
    disabled: false,
    testId: "storybook"
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

export const ToggleButtonOff = (argTypes: ToggleButtonProps): JSX.Element => {
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
ToggleButtonOff.storyName = 'ToggleButton по умолчанию'; 

export const ToggleButtonLabel = (argTypes: ToggleButtonProps): JSX.Element => <ToggleButton {...argTypes} />;
ToggleButtonLabel.storyName = 'ToggleButton с лейблом';
ToggleButtonLabel.args = {
  label: 'Toggle Button',
};


export const ToggleButtonChecked = (argTypes: ToggleButtonProps): JSX.Element => <ToggleButton {...argTypes} />;
ToggleButtonChecked.storyName = 'ToggleButton выбран';
ToggleButtonChecked.args = {
  value: true,
  disabled: false,
};

export const ToggleButtonDisabled = (argTypes: ToggleButtonProps): JSX.Element => <ToggleButton {...argTypes} />;
ToggleButtonDisabled.storyName = 'ToggleButton заблокирован';
ToggleButtonDisabled.args = {
  value: false,
  disabled: true,
};

export const ToggleButtonCheckedDisabled = (argTypes: ToggleButtonProps): JSX.Element => <ToggleButton {...argTypes} />;
ToggleButtonCheckedDisabled.storyName = 'ToggleButton выбран и заблокирован';
ToggleButtonCheckedDisabled.args = {
  value: true,
  disabled: true,
};