import type { Meta } from '@storybook/react';
import React, { ChangeEvent, ChangeEventHandler, ReactNode, useEffect, useState } from 'react';
import { Input } from './Input';
import { IconAlarm, IconAccount, IconAddress, IconBell, IconBriefcase, IconCalendar } from '../../Icons/index';

export interface InputProps {
  /** Идентификатор элемента */
  id?: string;
  /** Лейбл */
  label?: string;
  /** Подсказка */
  placeholder?: string;
  /** Размер */
  size?: 'sm' | 'md' | 'lg';
  /** Знчение */
  value?: string;
  /** Стили передаваемые напрямую */
  style?: React.CSSProperties;
  /** Дополнительный класс */
  className?: string;
  /** Многострочное поле */
  multiline?: boolean;
  /** Количество строк в многострочном поле */
  rows?: number;
  /** Изменение размера многострочного поля */
  resize?: boolean;
  /** Заблокированное поле */
  disabled?: boolean;
  /** Только для чтения */
  readOnly?: boolean;
  /** Метка слева */
  isLeftLabel?: boolean;
  /** Иконка слева */
  icon?: ReactNode;
  /** Ошибка */
  error?: boolean;
  /** Текст ошибки */
  helperText?: string;
  /** Callback при изменении значения */
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /** Обязательное поле */
  required?: boolean;
  testId?: string
}

const iconOptions = {
  IconAlarm: <IconAlarm />,
  IconAccount: <IconAccount />,
  IconAddress: <IconAddress />,
  IconBell: <IconBell />,
  IconBriefcase: <IconBriefcase />,
  IconCalendar: <IconCalendar />,
  unset: null,
};

const withWrapper = (Story: React.ComponentType) => (
  <div
    style={{
      backgroundColor: 'var(--white)',
      padding: '30px',
      borderRadius: '10px',
      width: '300px',
    }}
  >
    {<Story />}
  </div>
);

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [withWrapper],
  args: {
    label: 'Наименование поля',
    placeholder: 'Введите текст...',
    size: 'lg',
    icon: 'unset',
    multiline: false,
    error: false,
    helperText: 'Поле обязательно для заполнения',
    disabled: false,
    isLeftLabel: false,
    readOnly: false,
    resize: false,
    testId: 'storybook'
  },
  argTypes: {
    id: { description: 'Идентификатор компонента' },
    label: { description: 'Текст метки инпута' },
    placeholder: { description: 'Текст подсказки инпута' },
    size: {
      description: 'Свойство, позволяющее регулировать высоту инпута',
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
    value: { description: 'Значение поля инпут' },
    className: { description: 'Дополнительный CSS класс для обертки инпута' },
    multiline: { description: 'Свойство, для многострочного инпута', control: { type: 'boolean' } },
    rows: { description: 'Количество строк в многострочном инпуте', control: { type: 'number' } },
    resize: { description: 'Свойство, для изменения размера многострочного инпута', control: { type: 'boolean' } },
    disabled: { description: 'Заблокированный инпут для изменений', control: { type: 'boolean' } },
    readOnly: { description: 'Инпут только для чтения', control: { type: 'boolean' } },
    isLeftLabel: { description: 'Инпут с левой меткой', control: { type: 'boolean' } },
    icon: {
      description: 'Элемент с иконкой, который располагается с правой стороны инпута',
      control: { type: 'select' },
      options: Object.keys(iconOptions),
      mapping: iconOptions,
    },
    error: { description: 'Условие показа ошибки инпута', type: 'boolean', control: { type: 'boolean' } },
    helperText: { description: 'Строка для вспомогательно текста под инпутом', type: 'string' },
    onChange: {
      description: 'Callback, который будет вызван при изменении значения внутри инпута',
      action: 'изменено value',
    },
    required: { description: 'Обязательное поле инпута', control: { type: 'boolean' } },
  },
};

export default meta;

// Дефолтный Input
export const InputDefault = (argTypes: InputProps): JSX.Element => {
  const [value, setValue] = useState('');
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    if (argTypes.error) setValue('Невалидные значения');
    else setValue('');
  }, [argTypes.error]);
  return <Input value={value} onChange={handleChange} {...argTypes} />;
};
InputDefault.storyName = 'Input по умолчанию';

// Заполненный инпут input
export const InputFilled = (argTypes: InputProps): JSX.Element => <Input {...argTypes} />;
InputFilled.storyName = 'Input заполненный';
InputFilled.args = {
  value: 'Заполненный инпут',
  className: 'filled',
  required: true,
};
InputFilled.parameters = {
  controls: { disable: true },
};

// Input без лейбла
export const InputWithoutLabel = (argTypes: InputProps): JSX.Element => <Input placeholder='Название поля'/>;
InputWithoutLabel.storyName = 'Input без лейбла';
InputWithoutLabel.parameters = {
  controls: { disable: true },
};

// Инпут с ошибкой
export const InputWithError = (argTypes: InputProps): JSX.Element => <Input {...argTypes} />;
InputWithError.storyName = 'Input с ошибкой';
InputWithError.args = {
  value: 'Невалидные значения',
  error: true,
};
InputWithError.parameters = {
  controls: { disable: true },
};

// Инпут в состоянии disabled
export const InputDisabled = (argTypes: InputProps): JSX.Element => <Input {...argTypes} />;
InputDisabled.storyName = 'Input заблокированный';
InputDisabled.args = {
  value: 'Заблокированный текст',
  disabled: true,
};
InputDisabled.parameters = {
  controls: { disable: true },
};

// Инпут в состоянии Read Only
export const InputReadOnly = (argTypes: InputProps): JSX.Element => <Input {...argTypes} />;
InputReadOnly.storyName = 'Input только чтение';
InputReadOnly.args = {
  value: 'Только чтение',
  className: 'readOnly',
  readOnly: true,
};
InputReadOnly.parameters = {
  controls: { disable: true },
};

//Инпут с иконкой
export const InputWithIconDefault = (argTypes: InputProps): JSX.Element => <Input {...argTypes} />;
InputWithIconDefault.storyName = 'Input с иконкой по умолчанию';
InputWithIconDefault.args = {
  value: 'Инпут с иконкой',
  className: 'input--withIcon',
  icon: <IconAccount />,
};
InputWithIconDefault.parameters = {
  controls: { disable: true },
};

//Input c боковым лейблом
export const InputLeftLabelDefault = (argTypes: InputProps): JSX.Element => <Input {...argTypes} />;
InputLeftLabelDefault.storyName = 'Input c боковым лейблом';
InputLeftLabelDefault.args = {
  value: 'Инпут с боковым лейблом',
  className: 'left_label',
  isLeftLabel: true,
};
InputLeftLabelDefault.parameters = {
  controls: { disable: true },
};

// Многострочный инпут не расширяемый
export const InputMultilineNoneResizable = (argTypes: InputProps): JSX.Element => {
  const [value, setValue] = useState('');
  const [className, setClassName] = useState('');
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    if (argTypes.error) setValue('Невалидные значения');
    if (argTypes.icon) setClassName('input--withIcon');
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
InputMultilineNoneResizable.parameters = {
  controls: { disable: true },
};

// Многострочный инпут расширяемый
export const InputMultilineResizable = (argTypes: InputProps): JSX.Element => {
  const [value, setValue] = useState('');
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    if (argTypes.error) setValue('Невалидные значения');
    else setValue('');
  }, [argTypes.error]);
  return <Input value={value} onChange={handleChange} {...argTypes} />;
};
InputMultilineResizable.storyName = 'Input многострочный расширяемый';
InputMultilineResizable.args = {
  multiline: true,
  resize: true,
};
InputMultilineResizable.parameters = {
  controls: { disable: true },
};
