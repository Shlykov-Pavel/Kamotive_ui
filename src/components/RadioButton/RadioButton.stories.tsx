import React, { ChangeEvent, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import styles from './RadioButton.module.css';
import { RadioProps } from 'kamotive_ui';
import { RadioButton } from './RadioButton';

const meta: Meta<RadioProps> = {
  component: RadioButton,
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
    size: 'md',
    disabled: false,
  },
  argTypes: {
    size: {
      description: 'Свойство, позволяющее регулировать размер радио кнопки',
      control: { type: 'radio' },
      options: ['sm', 'md'],
    },
    disabled: { description: 'Устанавливает атрибут disabled', control: { type: 'boolean' } },
    checked: { description: 'Задаёт включённое состояние для компонента' },
    value: { description: 'Устанавливает checked у совпадающих value' },
    label: { description: 'Текст лейбла радио кнопки', type: 'string' },
  },
};

export default meta;

type Story = StoryObj<RadioProps>;

export const RadioButtonOff = (argTypes: RadioProps): JSX.Element => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
      setChecked(prev => !prev); 
  };

  return (
      <RadioButton 
        checked={checked} 
        onChange={handleChange} 
        {...argTypes} 
      />
  );
}
RadioButtonOff.storyName = 'RadioButton по умолчанию'; 

export const RadioButtonChecked = (argTypes: RadioProps): JSX.Element => <RadioButton {...argTypes} />;
RadioButtonChecked.storyName = 'RadioButton выбран';
RadioButtonChecked.args = {
  checked: true,
  disabled: false,
};

export const RadioButtonDisabled = (argTypes: RadioProps): JSX.Element => <RadioButton {...argTypes} />;
RadioButtonDisabled.storyName = 'RadioButton заблокирован';
RadioButtonDisabled.args = {
  checked: false,
  disabled: true,
};

export const RadioButtonCheckedDisabled = (argTypes: RadioProps): JSX.Element => <RadioButton {...argTypes} />;
RadioButtonCheckedDisabled.storyName = 'RadioButton выбран и заблокирован';
RadioButtonCheckedDisabled.args = {
  checked: true,
  disabled: true,
};


export const RadioButtonsGroup = (argTypes: RadioProps): JSX.Element => {
  const [checkedValue, setCheckedValue] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckedValue(e.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <RadioButton checked={checkedValue === 'k1'} onChange={handleChange} value="k1" label="Кнопка 1" {...argTypes} />
      <RadioButton checked={checkedValue === 'k2'} onChange={handleChange} value="k2" label="Кнопка 2" {...argTypes} />
      <RadioButton checked={checkedValue === 'k3'} onChange={handleChange} value="k3" label="Кнопка 3" {...argTypes} />
    </div>
  );
};
RadioButtonsGroup.storyName = 'Группы RadioButton'; 


