import React, { CSSProperties, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { FileItem } from './FileItem';

type TAttachemnts = {
  id: string;
  filename: string;
  uri?: string;
  size?: number;
  createDateTime?: string;
  updateDateTime?: string;
};

interface FileItemProps {
  /** Файл */
  file: TAttachemnts;
  /** Флаг загрузки файла */
  loading?: boolean;
  /** Текст ошибки загрузки файла */
  error?: string;
  /** Функция обработки скачивания файла */
  onDownload?: (id: string) => void;
  /** Функция обработки удаления файла */
  onDelete?: (id: string) => void;
  /**Разрешение на удаление файлов */
  canDelete?: boolean;
  /**Разрешение на скачивание файлов */
  canDownload?: boolean;
  /** Стили передаваемые напрямую */
  style?: CSSProperties;
  /** Флаг добавленного файла */
  isAddedFile?: boolean;
  /** Флаг отклоненного файла */
  isRejectedFile?: boolean;
  /** Id загруженного файла */
  onLoadingFinished?: (id: string) => void;
}

const meta: Meta<FileItemProps> = {
  title: 'Components/FileAttach/FileItem',
  component: FileItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: 'var(--white)',
          padding: '30px',
          borderRadius: '10px',
          width: '300px',
          height: '300px',
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    file: {
      description: 'Файл',
    },

    error: {
      description: 'Текст ошибки',
      type: 'string',
    },
    onDownload: {
      description: 'Функция обработки скачивания файла',
    },
    onDelete: {
      description: 'обработки удаления файла',
    },
    canDelete: {
      description: 'Разрешение на добавление файлов',
      type: 'boolean',
    },
    canDownload: {
      description: 'Разрешение на удаление файлов',
      type: 'boolean',
    },
    style: {
      description: 'Стили передаваемые напрямую',
      type: 'symbol',
    },
    isAddedFile: {
      description: 'Флаг добавленного файла',
      type: 'boolean',
    },
    isRejectedFile: {
      description: 'Флаг отклоненного файла',
      type: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<FileItemProps>;

const createMockFile = (name: string, size: number): TAttachemnts => ({
  id: Math.random().toString(36).substring(2, 9),
  filename: name,
  size: size,
});

export const FileItemDefault = (argTypes: FileItemProps): JSX.Element => {
  return <FileItem {...argTypes} />;
};

FileItemDefault.storyName = 'FileItem по умолчанию';

FileItemDefault.args = {
  file: createMockFile('file123.docx', 10240),
  onDownload: action('download-clicked'),
  onDelete: action('delete-clicked'),
};

export const FileItemProgress = (argTypes: FileItemProps): JSX.Element => <FileItem {...argTypes} />;

FileItemProgress.storyName = 'FileItem c progress bar';

FileItemProgress.args = {
  file: createMockFile('file123.docx', 10240),
  loading: true,
};

export const FileItemError = (argTypes: FileItemProps): JSX.Element => <FileItem {...argTypes} />;

FileItemError.storyName = 'FileItem c ошибкой загрузки';

FileItemError.args = {
  file: createMockFile('file123.docx', 10240),
  error: 'Произошла ошибка. Попробуйте снова',
};
