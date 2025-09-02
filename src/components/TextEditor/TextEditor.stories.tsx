import React from 'react';
import type { Meta } from '@storybook/react';
import { TextEditor } from './TextEditor';
import { TextEditorProps } from '../../types/index';

const meta: Meta<TextEditorProps> = {
  component: TextEditor,
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
