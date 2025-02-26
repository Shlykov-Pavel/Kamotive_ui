import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { FileAttach } from './FileAttach';
import './FileAttach.module.css';
import { FileAttachProps } from 'kamotive_ui';

const meta: Meta<FileAttachProps> = {
  component: FileAttach,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="story--wrapper-fileAttach">
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
