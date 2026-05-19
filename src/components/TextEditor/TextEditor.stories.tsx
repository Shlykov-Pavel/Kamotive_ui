import React, { useState } from 'react';
import type { Meta } from '@storybook/react';
import { TextEditor } from './TextEditor';

export interface FilePreview {
  file: File;
  id: string;
  preview?: string;
  lng: string;
}

export type TAttachments = {
  id: string;
  filename: string;
  uri?: string;
  size?: number;
  createDateTime?: string;
  updateDateTime?: string;
  file?:File[],
  preview?: string;
  lng?: string;
};
export interface TextEditorProps {
  defaultValue?: string;
  label?: string;
  onSubmit?: (value: string, files: File[]) => void;
  onCancel?: () => void;
  error?: boolean;
  helperText?: string;
  isEditMode?:boolean;
  canAttachFiles?: boolean;
  files?: TAttachments[];
  required?: boolean;
  className?: string;
  isButtonDisabled?: boolean;
  /** Язык */
  lng?: string;
  testId?:string
}



const meta: Meta<TextEditorProps> = {
  component: TextEditor,
  title: 'Components/Comment/TextEditor',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: 'var(--white)',
          width: '500px',
        }}
      >
        <Story />
      </div>
    ),
  ],
  args:{
    testId:'storybook'
  },
  argTypes: {
    label: {},
    helperText: {},
    error: { control: { type: 'boolean' } },
  },
};

export default meta;

export const TextEditorDefault = (argTypes: TextEditorProps): JSX.Element => <TextEditor {...argTypes} />;
TextEditorDefault.storyName = 'TextEditor по умолчанию';
TextEditorDefault.args = {};

export const TextEditorWithFileAttach = (argTypes: TextEditorProps): JSX.Element => <TextEditor {...argTypes} />;
TextEditorWithFileAttach.storyName = 'TextEditor с добавлением файлов';
TextEditorWithFileAttach.args = {
  canAttachFiles: true,
};

export const TextEditorWithError = (argTypes: TextEditorProps): JSX.Element => <TextEditor {...argTypes} />;
TextEditorWithError.storyName = 'TextEditor с ошибкой';
TextEditorWithError.args = {
  label: 'Введите текст',
  helperText: 'Текст ошибки',
  error: true,
};


export const TextEditorWithEdit = (argTypes: TextEditorProps): JSX.Element => {

  return <TextEditor {...argTypes} canAttachFiles={true}/>
};
TextEditorWithEdit.storyName = 'TextEditor c проверкой на пустоту в комментарии';
TextEditorWithEdit.parameters = {
  controls: { disable: true },
};
