import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import styles from '../Tag/Tag.module.css';

import { SettingTag } from './SettingTag';
import { SettingTagProps } from 'kamotive_ui';

const meta: Meta<SettingTagProps> = {
  component: SettingTag,
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

type Story = StoryObj<SettingTagProps>;

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
