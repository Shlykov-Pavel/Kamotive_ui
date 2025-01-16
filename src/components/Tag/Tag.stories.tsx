import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import styles from './Tag.module.css';
import { TagProps } from 'kamotive_ui';
import { Tag } from './Tag';

const meta: Meta<TagProps> = {
  component: Tag,
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

type Story = StoryObj<TagProps>;

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