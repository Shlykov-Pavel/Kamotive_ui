import React from 'react';
import { Meta } from '@storybook/react';
import { Tag } from './Tag';

export interface TagProps {
    /** Лейбл */
    label: string;
    /** Цвет */
    color?: string;
    /**Наличие кнопки закрытия */
    closeButton?: boolean;
    /** Возможность изменить лейбл */
    editable?: boolean;
    /** Callback при изменении значения */
    onChange?: (label: string) => void;
    /** Callback при нажатии на кнопку закрытия */
    onClick?: () => void;
    testId?: string
}

const meta: Meta<TagProps> = {
  component: Tag,
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
    closeButton: false,
    testId: 'storybook'
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