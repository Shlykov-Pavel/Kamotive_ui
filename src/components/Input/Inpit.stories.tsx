import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Input from './Input';

const meta: Meta<typeof Input> = {
  title: 'Example/Input',
  component: Input,
  parameters: {
    layout: 'centered', 
  },
  argTypes: {
    value: { control: 'text' }, 
    placeholder: { control: 'text' }, 
    onChange: { action: 'changed' }, 
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

// История с пустым инпутом и плейсхолдером
export const EmptyWithPlaceholder: Story = {
  args: {
    value: '',
    placeholder: 'Введите текст...',
  },
};

// История с предзаполненным значением
export const PreFilled: Story = {
  args: {
    value: 'Предзаполненный текст',
    placeholder: 'Введите текст...',
  },
};

// История с управляемым состоянием
export const ControlledInput: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>(args.value || '');

    return (
      <Input
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          args.onChange && args.onChange(newValue); // Логируем изменения
        }}
      />
    );
  },
  args: {
    value: '',
    placeholder: 'Управляемый инпут',
  },
};

// История с длинным текстом
export const LongText: Story = {
  args: {
    value:
      'Длинный текстттттттттттттттттттттттттттттттттттттттттттттттттт.',
    placeholder: 'Введите текст...',
  },
};

// История без плейсхолдера
export const WithoutPlaceholder: Story = {
  args: {
    value: '',
  },
};
