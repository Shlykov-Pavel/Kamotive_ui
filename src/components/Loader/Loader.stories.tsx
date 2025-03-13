import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Loader } from './Loader';

export interface LoaderProps {
  /** Название файла */
 name?: string ;
  /** Размер файла */
 size?: number ;
 /** Флаг загрузки файла */
 loading?: boolean;
 /** Текст ошибки загрузки файла */
 error?: string;
 /** Функция обработки */
 onClick?: () => void;
}

const meta: Meta<LoaderProps> = {
  component: Loader,
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
        width: '300px',
        height: '300px', 
      }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      description: 'Размер файла',
      type: 'number',
    },
    name: {
      description: 'Название файла',
      type: 'string',
    },
    loading: {
      description: 'Флаг загрузки файла',
      type: 'boolean',
    },
    error: {
      description: 'Текст ошибки',
      type: 'string',
    },
  },
};

export default meta;

type Story = StoryObj<LoaderProps>;

export const LoaderDefault = (argTypes: LoaderProps): JSX.Element => <Loader {...argTypes} />;

LoaderDefault.storyName = 'Loader по умолчанию';

LoaderDefault.args = {
  name: 'file123.docx',
  size: '10',
};

export const LoaderProgress = (argTypes: LoaderProps): JSX.Element => <Loader {...argTypes} />;

LoaderProgress.storyName = 'Loader c progress bar';

LoaderProgress.args = {
  name: 'file123.docx',
  size: '10',
  loading: true,
};

export const LoaderError = (argTypes: LoaderProps): JSX.Element => <Loader {...argTypes} />;

LoaderError.storyName = 'Loader c ошибкой загрузки';

LoaderError.args = {
  name: 'file123.docx',
  size: '10',
  error: 'Произошла оошибка. Попробуйте снова'
};
