import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/manager-api';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Input } from './Input';
import styles from './Input.module.css';
import { IconAlarm10, IconAccount10, IconBank10, IconBell10, IconBriefcase10, IconCalendar10 } from '../../Icons/index';
import { InputProps } from 'kamotive_ui';

const labelText = 'Наименование поля';

const iconOptions = {
  IconAlarm10: <IconAlarm10 />,
  IconAccount: <IconAccount10 />,
  IconBank: <IconBank10 />,
  IconBell: <IconBell10 />,
  IconBriefcase10: <IconBriefcase10 />,
  IconCalendar10: <IconCalendar10 />,
  unset: null,
};

const withWrapper = (Story: any) => <div className={styles.story_wrapper}>{<Story />}</div>;

const meta: Meta<typeof Input> = {
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [withWrapper],
  args: {
    label: labelText,
    placeholder: 'Введите текст...',
    size: 'md',
    icon: 'unset',
    multiline: false,
    hasError: false,
    helperText: 'Поле обязательно для заполнения',
    disabled: false,
    isLeftLabel: false,
    readOnly: false,
    resize: false,
  },
  argTypes: {
    id: { description: 'Идентификатор компонента' },
    className: { description: 'Дополнительный CSS класс для обертки инпута' },
    value: { description: 'Значение поля инпут' },
    label: { description: 'Текст метки инпута' },
    placeholder: { description: 'Текст подсказки инпута' },
    size: {
      description: 'Свойство, позволяющее регулировать высоту инпута',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    // onChange: {
    //   description: 'Callback, который будет вызван при изменении значения внутри инпута',
    //   action: 'изменено value',
    // },
    icon: {
      description: 'Элемент с иконкой, который располагается с правой стороны инпута',
      control: { type: 'select' },
      options: Object.keys(iconOptions),
      mapping: iconOptions,
    },
    hasError: { description: 'Условие показа ошибки инпута', control: { type: 'boolean' } },
    helperText: { description: 'Строка для вспомогательно текста под инпутом' },
    disabled: { description: 'Заблокированный инпут для изменений', control: { type: 'boolean' } },
    readOnly: { description: 'Инпут только для чтения', control: { type: 'boolean' } },
    isLeftLabel: { description: 'Инпут с левой меткой', control: { type: 'boolean' } },
    multiline: { description: 'Свойство, для многострочного инпута', control: { type: 'boolean' } },
    resize: { description: 'Свойство, для изменения размера многострочного инпута', control: { type: 'boolean' } },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

// Дефолтный Input
export const InputDefault = (argTypes: InputProps): JSX.Element => {
  const [value, setValue] = useState('');
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    if (argTypes.hasError) setValue('Невалидные значения');
    else setValue('');
  }, [argTypes.hasError]);
  return <Input value={value} onChange={handleChange} {...argTypes} />;
};
InputDefault.storyName = 'Input по умолчанию';

// Заполненный инпут input
export const InputFilled = (argTypes: InputProps): JSX.Element => <Input {...argTypes} />;
InputFilled.storyName = 'Input заполненный';
InputFilled.args = {
  value: 'Заполненный инпут',
  className: 'filled',
};

// Инпут с ошибкой
export const InputWithError = (argTypes: InputProps): JSX.Element => <Input {...argTypes} />;
InputWithError.storyName = 'Input с ошибкой';
InputWithError.args = {
  value: 'Невалидные значения',
  hasError: true,
};

// Инпут в состоянии disabled
export const InputDisabled = (argTypes: InputProps): JSX.Element => <Input {...argTypes} />;
InputDisabled.storyName = 'Input заблокированный';
InputDisabled.args = {
  value: 'Заблокированный текст',
  className: 'disabled',
  disabled: true,
};

// Инпут в состоянии Read Only
export const InputReadOnly = (argTypes: InputProps): JSX.Element => <Input {...argTypes} />;
InputReadOnly.storyName = 'Input только чтение';
InputReadOnly.args = {
  value: 'Только чтение',
  className: 'read_only',
  readOnly: true,
};

//Инпут с иконкой
export const InputWithIconDefault = (argTypes: InputProps): JSX.Element => <Input {...argTypes} />;
InputWithIconDefault.storyName = 'Input с иконкой по умолчанию';
InputWithIconDefault.args = {
  value: 'Инпут с иконкой',
  className: 'with_icon',
  icon: <IconAccount10 />,
};

//Input c боковым лейблом
export const InputLeftLabelDefault = (argTypes: InputProps): JSX.Element => <Input {...argTypes} />;
InputLeftLabelDefault.storyName = 'Input c боковым лейблом';
InputLeftLabelDefault.args = {
  value: 'Инпут с боковым лейблом',
  className: 'left_label',
  isLeftLabel: true,
};

// Многострочный инпут не расширяемый
export const InputMultilineNoneResizable = (argTypes: InputProps): JSX.Element => {
  const [value, setValue] = useState('');
  const [className, setClassName] = useState('');
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    if (argTypes.hasError) setValue('Невалидные значения');
    if (argTypes.icon) setClassName('with_icon');
    else {
      setValue('');
      setClassName('');
    }
  }, [argTypes]);

  return <Input value={value} onChange={handleChange} className={className} {...argTypes} />;
};
InputMultilineNoneResizable.storyName = 'Input многострочный без расширения';
InputMultilineNoneResizable.args = {
  multiline: true,
  resize: false,
};

// Многострочный инпут расширяемый
export const InputMultilineResizable = (argTypes: InputProps): JSX.Element => {
  const [value, setValue] = useState('');
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    if (argTypes.hasError) setValue('Невалидные значения');
    else setValue('');
  }, [argTypes.hasError]);
  return <Input value={value} onChange={handleChange} {...argTypes} />;
};
InputMultilineResizable.storyName = 'Input многострочный расширяемый';
InputMultilineResizable.args = {
  multiline: true,
  resize: true,
};
