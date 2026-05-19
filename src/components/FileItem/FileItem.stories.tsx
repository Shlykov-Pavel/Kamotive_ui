import React, { CSSProperties, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { FileItem } from './FileItem';

type TAttachments = {
  id: string;
  filename: string;
  uri?: string;
  size?: number;
  createDateTime?: string;
  updateDateTime?: string;
};

interface FileItemProps {
  /** Файл */
    file: TAttachments;
    /** Флаг загрузки файла */
    loading?: boolean;
    /** Текст ошибки загрузки файла */
    error?: string | boolean;
    /** Функция обработки скачивания файла */
    onDownload?: (file: TAttachments) => void;
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
    /** Флаг для файлов комментариев */
    isComment?:boolean;
    /** Язык интерфейса для типов данных*/
    lng?: string;
    testId?:string;
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
  args: {
    testId: 'storybook',
  },
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
    lng: {
      description: 'Язык интерфейса',
      type: 'string',
      control: { type: 'select' },
      options: ['ru', 'en'],
    },
  },
};

export default meta;

type Story = StoryObj<FileItemProps>;

const createMockFile = (name: string, size: number): TAttachments => ({
  id: Math.random().toString(36).substring(2, 9),
  filename: name,
  size: size,
});

export const FileItemDefault = (argTypes: FileItemProps): JSX.Element => {
  return <FileItem {...argTypes} onDownload={action('download-clicked')} />;
};

FileItemDefault.storyName = 'FileItem по умолчанию';

FileItemDefault.args = {
  file: createMockFile('file123.docx', 10240),
  onDownload: action('download-clicked'),
  onDelete: action('delete-clicked'),
  lng: 'ru',
};

export const FileItemProgress = (argTypes: FileItemProps): JSX.Element => <FileItem {...argTypes} onDownload={action('download-clicked')}/>;

FileItemProgress.storyName = 'FileItem c progress bar';

FileItemProgress.args = {
  file: createMockFile('file123.docx', 10240),
  loading: true,
  lng: 'ru',
};

export const FileItemError = (argTypes: FileItemProps): JSX.Element => <FileItem {...argTypes} onDownload={action('download-clicked')}/>;

FileItemError.storyName = 'FileItem c ошибкой загрузки';

FileItemError.args = {
  file: createMockFile('file123.docx', 10240),
  error: 'Произошла ошибка. Попробуйте снова',
  lng: 'ru',
};

export const FileItemEnglish = (argTypes: FileItemProps): JSX.Element => <FileItem {...argTypes} onDownload={action('download-clicked')}/>;

FileItemEnglish.storyName = 'FileItem на английском';

FileItemEnglish.args = {
  file: createMockFile('file123.docx', 10240),
  onDownload: action('download-clicked'),
  onDelete: action('delete-clicked'),
  lng: 'en',
};
