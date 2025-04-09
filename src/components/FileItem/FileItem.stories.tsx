import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { FileItem } from './FileItem';

export interface FileItemProps {
  /** Название файла */
 name?: string ;
  /** Размер файла */
 size?: number ;
 /** Флаг загрузки файла */
 loading?: boolean;
 /** Текст ошибки загрузки файла */
 error?: string;
 /** Функция обработки скачивания файла */
 onDownload?: () => void;
 /** Функция обработки удаления файла */
 onDelete?: () => void;
}

const meta: Meta<FileItemProps> = {
  component: FileItem,
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
    onDownload : {
      description: 'Функция обработки скачивания файла',
    },
    onDelete : {
      description: 'обработки удаления файла',
    }
  },
};

export default meta;

type Story = StoryObj<FileItemProps>;

export const FileItemDefault = (argTypes: FileItemProps): JSX.Element => <FileItem {...argTypes} />;

FileItemDefault.storyName = 'FileItem по умолчанию';

FileItemDefault.args = {
  name: 'file123.docx',
  size: '10',
  onDownload: action('download-clicked'),
  onDelete: action('delete-clicked'),
};

export const FileItemProgress = (argTypes: FileItemProps): JSX.Element => <FileItem {...argTypes} />;

FileItemProgress.storyName = 'FileItem c progress bar';

FileItemProgress.args = {
  name: 'file123.docx',
  size: '10',
  loading: true,
};

export const FileItemError = (argTypes: FileItemProps): JSX.Element => <FileItem {...argTypes} />;

FileItemError.storyName = 'FileItem c ошибкой загрузки';

FileItemError.args = {
  name: 'file123.docx',
  size: '10',
  error: 'Произошла оошибка. Попробуйте снова'
};
