import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { FileLoader } from './FileLoader';
import { Accept } from 'react-dropzone';

type TAttachments = {
  id: string;
  filename: string;
  uri?: string;
  size?: number;
  createDateTime?: string;
  updateDateTime?: string;
};
export interface FileLoaderProps {
  /** Максимальный размер файла */
  maxFileSize?: number;
  /** Максимальное количество файлов */
  maxFileCount?: number;
  /** Максимальное количество символов в названии файла */
  maxFileName?: number
  /**Поддерживаемые форматы файлов */
  acceptedFormats?: Accept;
  /**Добавленные файлы */
  addedFiles: File[];
  /**Сосотояние для добавления файлов */
  setAddedFiles: (addedFiles: File[]) => void;
  /** Список прикрепленных файлов */
  filesList?: TAttachments[] | [] | undefined;
  /**Заблокировано добавление файлов*/
  canAdd?: boolean;
  /** Язык */
  lng?: string;
  /** Дополнительный класс */
  className?: string;
  /** Стили передаваемые напрямую */
  style?: React.CSSProperties;
   /** Функция валидации файла */
  fileValidator?: (file: File) => boolean;
}

const meta: Meta<FileLoaderProps> = {
  title: 'Components/FileAttach/FileLoader',
  component: FileLoader,
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
          height: '500px',
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    maxFileSize: {
      description: 'Максимальный допустимый размер файла в гигабайтах',
      type: 'number',
    },
    maxFileCount: {
      description: 'Максимальное допустимое количество файлов',
      type: 'number',
    },
    maxFileName: {
      description: 'Максимальное допустимое количество символов в названии файла',
      type: 'number',
    },
    addedFiles: {
      description: 'Добавленные файлы',
    },
    setAddedFiles: {
      description: 'Состояние для добавления файлов'
    },
    filesList: {
      description: 'Список прикрепленных файлов',
    },
    acceptedFormats: {
      description: 'Поддерживаемые форматы файлов',
    },
    canAdd: {
      description: 'Устанавливает атрибут disabled добавления файла. Передаются разрешения на добавление файлов.',
      control: { type: 'boolean' },
    },
    lng: {
      description: 'Язык',
      type: 'string',
    },
  },
};

export default meta;

type Story = StoryObj<FileLoaderProps>;

export const FileLoaderDefault = (argTypes: FileLoaderProps): JSX.Element => {
  const [addedFiles, setAddedFiles] = useState<File[]>([]);

  return <FileLoader {...argTypes} addedFiles={addedFiles} setAddedFiles={setAddedFiles} />;
};

FileLoaderDefault.storyName = 'FileLoader по умолчанию';
FileLoaderDefault.args = {
  maxFileSize: 2,
  maxFileCount: 2,
};

export const FileLoaderDownload = (argTypes: FileLoaderProps): JSX.Element => {
  const [addedFiles, setAddedFiles] = useState<File[]>([]);

  return <FileLoader {...argTypes} addedFiles={addedFiles} setAddedFiles={setAddedFiles} />;
};

FileLoaderDownload.storyName = 'FileLoader с загрузкой файлов';
FileLoaderDownload.args = {
  maxFileSize: 2,
  maxFileCount: 2,
  onDownload: action('download-clicked'),
};

export const FileLoaderDisabled = (argTypes: FileLoaderProps): JSX.Element => {
  const [addedFiles, setAddedFiles] = useState<File[]>([]);

  return <FileLoader {...argTypes} addedFiles={addedFiles} setAddedFiles={setAddedFiles} />;
};
FileLoaderDisabled.storyName = 'FileLoader заблокированный';
FileLoaderDisabled.args = {
  canAdd: false,
};

export const FileLoaderWithMaxFileName = (argTypes: FileLoaderProps): JSX.Element => {
  const [addedFiles, setAddedFiles] = useState<File[]>([]);

  return <FileLoader {...argTypes} addedFiles={addedFiles} setAddedFiles={setAddedFiles} />;
};

FileLoaderWithMaxFileName.storyName = 'FileLoader c ограничением длины символов в названии файлов до 20 символов';
FileLoaderWithMaxFileName.args = {
  maxFileName: 20
};

export const FileLoaderEnglish = (argTypes: FileLoaderProps): JSX.Element => {
  const [addedFiles, setAddedFiles] = useState<File[]>([]);

  return <FileLoader {...argTypes} addedFiles={addedFiles} setAddedFiles={setAddedFiles} lng="en" />;
};
FileLoaderEnglish.storyName = 'FileLoader на английском';
FileLoaderEnglish.args = {
  maxFileSize: 2,
  maxFileCount: 2,
};
