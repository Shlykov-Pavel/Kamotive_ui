import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import { SettingTag } from './SettingTag';


export interface SettingTagProps {
  /** Лейбл */
  label: string;
  /** Цвет */
  color?: string;
  /** Callback при изменении значения */
  onChange?:(color: string) => void;
}

const meta: Meta<SettingTagProps> = {
  component: SettingTag,
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

  argTypes: {
    label: { description: 'Задает текст тега', type: 'string' },
    color: {
      description: 'Задает цвет тега',
    },
    onChange: {
      description: 'Callback, который будет вызван при выборе цвета',
    },
  },
};

export default meta;

export const defaultTag = (argTypes: SettingTagProps): JSX.Element => {
  const [tagColor, setTagColor] = useState('red');

  const handleColorChange = (newColor: string) => {
    setTagColor(newColor);
  };
  
  return <SettingTag color={tagColor} onChange={handleColorChange} {...argTypes} />;
};
defaultTag.storyName = 'Tag c color picker для настроек';
defaultTag.args = {
  label: 'Item',
};
