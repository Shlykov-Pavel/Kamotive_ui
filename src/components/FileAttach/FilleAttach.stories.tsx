import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Accept, FileError } from 'react-dropzone';
import { FileAttach } from './FileAttach';

type TAttachments = {
  id: string;
  filename: string;
  uri?: string;
  size?: number;
  createDateTime?: string;
  updateDateTime?: string;
};

interface FileAttachProps {
  //Массив уже прикрепленных файлов(которые есть в объекте)
  filesList: TAttachments[];
  /** Максимальный размер файла */
  maxFileSize?: number;
  /** Максимальное количество файлов */
  maxFileCount?: number;
  /**Поддерживаемые форматы файлов */
  acceptedFormats?: Accept;
  /**Добавленные файлы */
  addedFiles: File[];
  /**Сосотояние для добавления файлов */
  setAddedFiles: (addedFiles: File[]) => void;
  /** Функция обработки скачивания файла */
  onDownload?: (file: TAttachments) => void;
  /** Функция обработки удаления файла */
  onDelete?: (id: string) => void;
  /**Разрешени на добавление файлов*/
  canAdd?: boolean;
  /**Разрешение на удаление файлов */
  canDelete?: boolean;
  /**Разрешение на скачивание файлов */
  canDownload?: boolean;
  /**Позиционирование блока прикрепленных файлов */
  position?: 'left' | 'right' | 'bottom';
  /** Язык */
  lng?: string;
  /** Дополнительный класс */
  className?: string;
  /** Стили передаваемые напрямую */
  style?: React.CSSProperties;
  /** Функция валидации файла */
  fileValidator?: (file: File) => (file: File) => FileError | FileError[] | null;
}

// Моковые данные для файлов
const createMockFile = (name: string, type: string, size: number): TAttachments => {
  const file = new File(['mock content'], name, { type });
  Object.defineProperty(file, 'size', {
    value: size,
    writable: false,
  });
  return {
    id: Math.random().toString(36).substring(2, 9),
    filename: name,
    size: size,
  };
};

const mockFiles: TAttachments[] = [
  createMockFile('document.pdf', 'application/pdf', 1024 * 1024 * 1.5),
  createMockFile('image.jpg', 'image/jpeg', 1024 * 512),
  createMockFile(
    'Длинное название с дополнительным данными и датой 02-03-1999.xlsx',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    1024 * 1024 * 0.8
  ),
  createMockFile(
    'presentation.pptx',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    1024 * 1024 * 2.2
  ),
];

const meta: Meta<FileAttachProps> = {
  component: FileAttach,
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
          width: '100%',
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    filesList: {
      description: 'Массив уже прикрепленных файлов(которые есть в объекте)',
    },
    addedFiles: {
      description: 'Добавленные файлы',
    },
    setAddedFiles: {
      description: 'Состояние для добавления файлов',
      type: 'function',
    },
    onDelete: {
      description: 'Функция обработки удаления файла',
    },
    onDownload: {
      description: 'Функция обработки скачивания файла',
    },

    maxFileSize: {
      description: 'Максимальный допустимый размер файла в гигабайтах',
      type: 'number',
    },
    maxFileCount: {
      description: 'Максимальное допустимое количество файлов',
      type: 'number',
    },
    acceptedFormats: {
      description: 'Поддерживаемые форматы файлов',
    },
    canAdd: {
      description: 'Устанавливает атрибут disabled добавления файла. Передаются разрешения на добавление файлов.',
      control: { type: 'boolean' },
    },
    canDelete: {
      description: 'Устанавливает атрибут disabled удаления файла. Передаются разрешения на удаление файлов.',
      control: { type: 'boolean' },
    },
    canDownload: {
      description: 'Устанавливает атрибут disabled скачивания файла. Передаются разрешения на скачивание файлов.',
      control: { type: 'boolean' },
    },
    position: {
      description: 'Позиционирование блока прикрепленных файлов',
      control: { type: 'select' },
      options: ['left', 'right', 'bottom'],
    },
    lng: {
      description: 'Язык',
      type: 'string',
    },
    className: {
      description: 'Дополнительный класс',
    },
    style: {
      description: 'Стили передаваемые напрямую',
    },
    fileValidator: {
      description: 'Функция валидации файла',
      type: 'function',
    }
  },
};

export default meta;

type Story = StoryObj<FileAttachProps>;

export const FileAttachDefault = (argTypes: FileAttachProps): JSX.Element => {
  const [addedFiles, setAddedFiles] = useState<File[]>([]);
  return (
    <FileAttach
      {...argTypes}
      filesList={mockFiles}
      addedFiles={addedFiles}
      setAddedFiles={setAddedFiles}
      style={{ width: '360px' }}
    />
  );
};

FileAttachDefault.storyName = 'FileAttach по умолчанию';

export const FileAttachWithExistingFiles = (argTypes: FileAttachProps): JSX.Element => {
  const [addedFiles, setAddedFiles] = useState<File[]>([]);
  return (
    <FileAttach
      {...argTypes}
      filesList={mockFiles}
      addedFiles={addedFiles}
      setAddedFiles={setAddedFiles}
      onDownload={action('download-clicked')}
      style={{
        width: '360px',
      }}
    />
  );
};

FileAttachWithExistingFiles.storyName = 'FileAttach с существующими файлами';
FileAttachWithExistingFiles.args = {
  maxFileSize: 2,
  maxFileCount: 5,
};

export const FileAttchLeftPosition = (argTypes: FileAttachProps): JSX.Element => {
  const mockFilesList: TAttachments[] = [
    createMockFile('document.pdf', 'application/pdf', 1024 * 1024 * 1.5),
    createMockFile('image.jpg', 'image/jpeg', 1024 * 512),
    createMockFile(
      'Длинное название с дополнительным данными и датой 02-03-1999.xlsx',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      1024 * 1024 * 0.8
    ),
    createMockFile(
      'presentation.pptx',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      1024 * 1024 * 2.2
    ),
    createMockFile('video.mp4', 'video/mp4', 1024 * 1024 * 5),
    createMockFile('audio.mp3', 'audio/mpeg', 1024 * 1024 * 1.2),
    createMockFile('archive.zip', 'application/zip', 1024 * 1024 * 3.5),
    createMockFile('text.txt', 'text/plain', 1024 * 1024 * 0.5),
    createMockFile('image.png', 'image/png', 1024 * 512),
  ];

  const initialFile = new File(['mock content'], 'initial-file.txt', { type: 'text/plain' });
  const [addedFiles, setAddedFiles] = useState<File[]>([initialFile]);

  return (
    <FileAttach
      {...argTypes}
      filesList={mockFilesList}
      addedFiles={addedFiles}
      setAddedFiles={setAddedFiles}
      position="left"
      style={{ height: '400px', width: '680px' }}
    />
  );
};
FileAttchLeftPosition.storyName = 'FileAttach с позиционированием слева';

export const FileAttchRightPosition = (argTypes: FileAttachProps): JSX.Element => {
  const [addedFiles, setAddedFiles] = useState<File[]>([]);
  return (
    <FileAttach
      {...argTypes}
      filesList={mockFiles}
      addedFiles={addedFiles}
      setAddedFiles={setAddedFiles}
      position="right"
      style={{ width: '680px' }}
    />
  );
};
FileAttchRightPosition.storyName = 'FileAttach с позиционированием справа';

export const FileAttachDisabled = (argTypes: FileAttachProps): JSX.Element => {
  const [addedFiles, setAddedFiles] = useState<File[]>([]);

  return (
    <FileAttach
      {...argTypes}
      filesList={mockFiles}
      addedFiles={addedFiles}
      setAddedFiles={setAddedFiles}
      canAdd={false}
      style={{
        width: '360px',
      }}
    />
  );
};

FileAttachDisabled.storyName = 'FileAttach заблокированный';

export const FileAttachDisabledDownload = (argTypes: FileAttachProps): JSX.Element => {
  const [addedFiles, setAddedFiles] = useState<File[]>([]);

  return (
    <FileAttach
      {...argTypes}
      filesList={mockFiles}
      addedFiles={addedFiles}
      setAddedFiles={setAddedFiles}
      canDownload={false}
      style={{
        width: '360px',
      }}
    />
  );
};

FileAttachDisabledDownload.storyName = 'FileAttach c запрещенным скачиванием';

export const FileAttachDisabledDelete = (argTypes: FileAttachProps): JSX.Element => {
  const [addedFiles, setAddedFiles] = useState<File[]>([]);

  return (
    <FileAttach
      {...argTypes}
      maxFileCount={2}
      filesList={mockFiles}
      addedFiles={addedFiles}
      setAddedFiles={setAddedFiles}
      canDelete={false}
      style={{
        width: '360px',
      }}
    />
  );
};

FileAttachDisabledDelete.storyName = 'FileAttach c запрещенным удалением';

export const FileAttachEnglish = (argTypes: FileAttachProps): JSX.Element => {
  const [addedFiles, setAddedFiles] = useState<File[]>([]);
  return (
    <FileAttach
      {...argTypes}
      filesList={mockFiles}
      addedFiles={addedFiles}
      setAddedFiles={setAddedFiles}
      lng="en"
      style={{
        width: '360px',
      }}
    />
  );
};
FileAttachEnglish.storyName = 'FileAttach на английском';
