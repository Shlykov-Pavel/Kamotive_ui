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

export const TooltipDefault = (argTypes: TextEditorProps): JSX.Element => <TextEditor {...argTypes} />;
TooltipDefault.storyName = 'TextEditor по умолчанию';
TooltipDefault.args = {};

export const TooltipWithError = (argTypes: TextEditorProps): JSX.Element => <TextEditor {...argTypes} />;
TooltipWithError.storyName = 'TextEditor с ошибкой';
TooltipWithError.args = {
  label: 'Введите текст',
  helperText: 'Текст ошибки',
  error: true,
};
