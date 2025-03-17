import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { FileAttach } from './FileAttach';
import { Accept } from 'react-dropzone/.';

export interface FileAttachProps {
   /** Максимальный размер файла */
  maxFileSize?: number;
  /** Максимальное количество файлов */
  maxFileCount?: number; 
   /**Поддерживаемые форматы файлов */
  acceptedFormats?: Accept;
  /**Добавленные файлы */
  addedFiles: File[];
  /**Сосотояние для добавления файлов */
  setAddedFiles:(addedFiles: File[]) => void;
  /**Заблокировано добавление файлов*/
  disabled?: boolean;
  /** Дополнительный класс */
  className?: string;
  /** Стили передаваемые напрямую */
  style?: React.CSSProperties;
}

const meta: Meta<FileAttachProps> = {
  component: FileAttach,
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
        height: '500px'}}>
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
    acceptedFormats: {
      description: 'Поддерживаемые форматы файлов',
    },
    disabled: {
      description: 'Устанавливает атрибут disabled',
      control: { type: 'boolean' },
    },
  },
};

export default meta;

type Story = StoryObj<FileAttachProps>;

export const FileAttachDefault = (argTypes: FileAttachProps): JSX.Element => {
  const [addedFiles, setAddedFiles] = useState<File[]>([]);
  
  return <FileAttach {...argTypes} addedFiles={addedFiles} setAddedFiles={setAddedFiles} />;
};

FileAttachDefault.storyName = 'FileAttach по умолчанию';
FileAttachDefault.args = {
  maxFileSize: 2,
  maxFileCount: 2,
};

export const FileAttachDisabled = (argTypes: FileAttachProps): JSX.Element => {
  const [addedFiles, setAddedFiles] = useState<File[]>([]);

  return <FileAttach {...argTypes} addedFiles={addedFiles} setAddedFiles={setAddedFiles} />;
};
FileAttachDisabled.storyName = 'FileAttach заблокированный';
FileAttachDisabled.args = {
  disabled: true,
};
