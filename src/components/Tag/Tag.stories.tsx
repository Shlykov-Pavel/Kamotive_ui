import React from 'react';
import { Meta } from '@storybook/react';

import './Tag.css';
import { Tag } from './Tag';

export interface TagProps {
  /** Лейбл */
  label?: string;
  /** Цвет */
  color?: string;
  /**Наличие кнопки закрытия */
  closeButton?: boolean;
  /** Callback при изменении значения */
  onClick?: () => void;
}

const meta: Meta<TagProps> = {
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='story--wrapper-tag'>
        <Story />
      </div>
    ),
  ],
  args: {
    closeButton: false,
  },
  argTypes: {
    label: { description: 'Задает текст тега', type: 'string' },
    color: {
      description: 'Задает цвет тега',
      control: { type: 'radio' },
      options: ['red', 'orange', 'yellow', 'green', 'purple', 'indigo', 'blue', 'teal', 'pink'],
    },
    closeButton: {
      description: 'Добавляет тегу кнопку закрытия',
      control: { type: 'boolean' },
    },
  },
};

export default meta;

export const defaultTag = (argTypes: TagProps): JSX.Element => <Tag {...argTypes} />;
defaultTag.storyName = 'Tag по умолчанию';
defaultTag.args = {
  label: 'Item',
  color:'red'
};

export const TagWithCloseButton = (argTypes: TagProps): JSX.Element => <Tag {...argTypes} />;
TagWithCloseButton.storyName = 'Tag с кнопкой закрытия';
TagWithCloseButton.args = {
  label: 'Item',
  closeButton: true,
};