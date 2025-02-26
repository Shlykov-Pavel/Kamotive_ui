import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Loader } from './Loader';
import './Loader.module.css';
import { LoaderProps } from 'kamotive_ui';

const meta: Meta<LoaderProps> = {
  component: Loader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="story--wrapper-loader">
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
