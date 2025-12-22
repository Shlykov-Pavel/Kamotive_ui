import React, { useState } from 'react';
import type { Meta } from '@storybook/react';
import { TextEditor } from './TextEditor';

export interface FilePreview {
  file: File;
  id: string;
  preview?: string;
  lng: string;
}
export interface TextEditorProps {
  label?: string;
  onSubmit?: (value: string, files: FilePreview[]) => void;
  onChange?: (value: string, files: FilePreview[]) => void;
  onCancel?: () => void;
  defaultValue?: string;
  error?: boolean;
  helperText?: string;
  isEditMode?:boolean;
  canAttachFiles?: boolean;
  files?: FilePreview[];
  required?: boolean;
  className?: string;
  isButtonDisabled?: boolean;
  /** Язык */
  lng?: string;
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
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)
  const handleChangeInput = (value: string, files:any)=>{
    console.log('value',value);
    console.log('files', files);
    
    // const cleanText = value.replace(/<[^>]*>/g, '').trim();
    // setIsButtonDisabled(cleanText.length === 0);
  }
  return <TextEditor {...argTypes} onChange={handleChangeInput} canAttachFiles={true}/>
};
TextEditorWithEdit.storyName = 'TextEditor c проверкой на пустоту в комментарии';
// TextEditorWithEdit.args = {
//   label: 'Введите текст',
//   helperText: 'Текст ошибки',
//   error: true,
// };
TextEditorWithEdit.parameters = {
  controls: { disable: true },
};
