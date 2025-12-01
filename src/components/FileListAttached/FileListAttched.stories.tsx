import React, { CSSProperties, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { FileListAttaсhed } from './FileListAttaсhed';
import { Snackbar } from '../Snackbar/Snackbar';

type TAttachments = {
  id: string;
  filename: string;
  uri?: string;
  size?: number;
  createDateTime?: string;
  updateDateTime?: string;
};

interface FileListAttaсhedProps {
  /** Список прикрепленных файлов */
  filesList: TAttachments[] | [] | undefined;
  /** Функция обработки удаления файла */
  onDelete?: (id: string) => void;
  /** Функция обработки скачивания файла */
  onDownload?: (file: TAttachments) => void;
  /**Разрешение на удаление файлов */
  canDelete?: boolean;
  /**Разрешение на скачивание файлов */
  canDownload?: boolean;
  /**Флаг для показа информационного текста */
  isInfoShown?: boolean;
  /** Язык */
  lng?: string;
  /** Дополнительный класс */
  className?: string;
  /** Стили передаваемые напрямую */
  style?: React.CSSProperties;
}

const createMockFile = (name: string, size: number): TAttachments => ({
  id: Math.random().toString(36).substring(2, 9),
  filename: name,
  size: size,
});

const fileListMocked: TAttachments[] = [
  createMockFile('file1.txt', 1024),
  createMockFile('Длинное название с дополнительным данными и датой 02-03-1999.xlsx', 2048),
  createMockFile('file3.txt', 3072),
];

const meta: Meta<FileListAttaсhedProps> = {
  title: 'Components/FileAttach/FileListAttaсhed',
  component: FileListAttaсhed,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: 'var(--white)',
          marginTop: '30px',
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
    filesList: fileListMocked,
    onDelete: action('onDelete'),
    onDownload: action('onDownload'),
    canDelete: true,
    canDownload: true,
    isInfoShown: true,
    className: '',
    style: {},
    lng: 'ru',
  },
  argTypes: {
    filesList: {
      description: 'Массив уже прикрепленных файлов(которые есть в объекте)',
    },
    onDelete: {
      description: 'Функция обработки удаления файла',
    },
    onDownload: {
      description: 'Функция обработки скачивания файла',
    },
    canDelete: {
      description: 'Разрешение на добавление файлов',
      type: 'boolean',
    },
    canDownload: {
      description: 'Разрешение на добавление файлов',
      type: 'boolean',
    },
    isInfoShown: {
      description: 'Флаг для показа информационного текста',
      type: 'boolean',
    },
    lng: {
      description: 'Язык',
      type: 'string',
      control: { type: 'select' },
      options: ['ru', 'en'],
    },
    className: {
      description: 'Дополнительный класс',
      type: 'string',
    },
    style: {
      description: 'Стили передаваемые напрямую',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FileListAttaсhedDefault = (argTypes: FileListAttaсhedProps): JSX.Element => {
  const [filesList, setFilesList] = useState(fileListMocked);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showSnackbarText, setShowSnackbarText] = useState('');

  const downloadFile = (file: TAttachments) => {
    setShowSnackbar(true);
    if (file) {
      const name = file.filename;
      setShowSnackbarText(`Файл ${name} успешно скачан`);
    }
  };
  const deleteFile = (id: string) => {
    setFilesList(filesList.filter((file) => file.id !== id));
    setShowSnackbar(true);
    const file = fileListMocked.find((file) => file.id === id);
    if (file) {
      const name = file.filename;
      setShowSnackbarText(`Файл ${name} успешно удален`);
    }
  };

  return (
    <>
      <FileListAttaсhed
        {...argTypes}
        filesList={filesList}
        onDownload={downloadFile}
        onDelete={deleteFile}
        canDelete={true}
        canDownload={true}
        lng={argTypes.lng}
      />

      {showSnackbar && (
        <Snackbar duration={3000} type={'success'} onClose={() => setShowSnackbar(false)}>
          {showSnackbarText}
        </Snackbar>
      )}
    </>
  );
};

FileListAttaсhedDefault.storyName = 'FileListAttaсhed по умолчанию';

export const FileListAttaсhedBlockedDownload = (argTypes: FileListAttaсhedProps): JSX.Element => {
  return <FileListAttaсhed {...argTypes} lng={argTypes.lng} />;
};

FileListAttaсhedBlockedDownload.storyName = 'FileListAttaсhed c заблокированным скачиванием';
FileListAttaсhedBlockedDownload.args = {
  filesList: fileListMocked,
  canDelete: true,
  canDownload: false,
};

export const FileListAttaсhedBlockedDelete = (argTypes: FileListAttaсhedProps): JSX.Element => {
  return <FileListAttaсhed {...argTypes} lng={argTypes.lng} />;
};

FileListAttaсhedBlockedDelete.storyName = 'FileListAttaсhed c заблокированным удалением';
FileListAttaсhedBlockedDelete.args = {
  filesList: fileListMocked,
  canDelete: false,
  canDownload: true,
};

export const FileListAttaсhedWithoutText = (argTypes: FileListAttaсhedProps): JSX.Element => {
  return (
    <FileListAttaсhed
      {...argTypes}
      filesList={fileListMocked}
      canDelete={true}
      canDownload={true}
      isInfoShown={false}
      lng={argTypes.lng}
    />
  );
};
FileListAttaсhedWithoutText.storyName = 'FileListAttaсhed без текста';

export const FileListAttaсhedEnglish = (argTypes: FileListAttaсhedProps): JSX.Element => {
  return <FileListAttaсhed {...argTypes} lng={argTypes.lng} />;
};
FileListAttaсhedEnglish.storyName = 'FileListAttaсhed на английском';
FileListAttaсhedEnglish.args = {
  filesList: fileListMocked,
  canDelete: true,
  canDownload: true,
  isInfoShown: true,
  lng: 'en',
};
