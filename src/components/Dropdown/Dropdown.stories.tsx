import React, { ChangeEvent, useEffect, useState } from 'react';
import { Meta } from '@storybook/react';
import { Dropdown } from './Dropdown';
import { IconAccount10, IconAlarm10, IconBell10, IconBriefcase10, IconCalendar10 } from '../../Icons';
import { IconEyeOff10 } from '../../Icons/IconEyeOff/IconEyeOff10';
import { Button } from '../Button/Button';

  export type BaseOptions = {
    id?: string;
    key?: string | number;
    name?: string;
    description?: string;
    value?: string | number;
    icon?: React.JSX.Element;
    disabled?: boolean;
    isDivider?: boolean;
    children?: TOptions[];
  };

  export type TOptions<T = {}> = BaseOptions & T;

export interface DropdownProps {
    /** Идентификатор */
    id?: string;
    /**  Лейбл */
    label?: string;
    /** Подсказик заполнения */
    placeholder?: string;
    /** Размер */
    size?: 'md' | 'lg';
    /** Массив элементов для выпадающего списка */
    options: Array<string | number | TOptions>;
    /** Функция для получения текста опции */
    getOptionLabel?: (option: TOptions) =>  keyof TOptions;
    /** Значение */
    value?: string | number | TOptions | null;
    /** Значение по умолчанию */
    defaultValue?: string | number | TOptions | null;
    /** Стиль выпадающего списка(текст+иконка, текст) */
    style?: 'icons' | 'text';
    /**Дополнительный класс */
    className?: string;
    /** Заблокированный */
    disabled?: boolean;
    /** Только для чтения */
    readOnly?: boolean;
    /** Открытый */
    isOpened?: boolean;
    /** Текст при отсутствии опций */
    noOptionsText: string;
    /** Отображение левой метки */
    isLeftLabel?: boolean;
    /** Ошибка */
    error?: boolean;
    /** Текст ошибки */
    helperText?: string;
    /** Callback, который будет вызван при изменении значения */
    onChange?: (event:any, value: string | number | TOptions | null) => void;
    /** Callback, который будет вызван при закрытии выпадающего списка */
    onClose?: (event: any) => void;
    /** Возможность сброса значения до первоначального */
    clearable?: boolean;
    /** Обязательное поле */
    required?: boolean;
    /** Отображение разделителя */
    isDivider?: boolean;
  }

const dropdownOptions = [
  { value: 'Выбор_1', icon: <IconAccount10 /> },
  { value: 'Выбор_2', icon: <IconAlarm10 /> },
  { value: 'Задизейбленный выбор', disabled: true, icon: <IconEyeOff10 /> },
  { value: 'Выбор_4', icon: <IconBell10 /> },
  { value: 'Выбор_5', icon: <IconBriefcase10 /> },
  { value: 'Длиный тексттттттттттттттттттттт', icon: <IconCalendar10 /> },
] ;

const withWrapper = (Story: React.ComponentType) => (
  <div
    style={{
      backgroundColor: 'var(--white)',
      padding: '30px',
      borderRadius: '10px',
      width: '900px',
    }}
  >
    {<Story />}
  </div>
);

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [withWrapper],
  args: {
    placeholder: 'Выберите опции',
    disabled: false,
    options: dropdownOptions,
    noOptionsText: 'Нет опций для выбора',
    label: 'Выпадающий список',
  },
  argTypes: {
    id: {
      description: 'Уникальный идетифиактор',
    },
    label: {
      description: 'Лейбл селекта',
      control: { type: 'text' },
    },
    placeholder: {
      description: 'Подсказка',
      control: { type: 'text' },
    },
    size: {
      description: 'Размер селекта',
      control: { type: 'radio' },
      options: ['md', 'lg'],
    },
    options: {
      description: 'Список элементов',
    },
    value: {
      description: 'Значение',
    },
    defaultValue: {
      description: 'Значение по умолчанию',
    },
    style: {
      description: 'Стили выпадающего списка',
      control: { type: 'select' },
      options: ['icons', 'text'],
    },
    className: { description: 'Дополнительный CSS класс для обертки dropdown' },
    disabled: {
      description: 'Заблокированный инпут для изменений',
      control: { type: 'boolean' },
    },
    readOnly: {
      description: 'Только чтение',
      control: { type: 'boolean' },
    },
    isOpened: {
      description: 'Открытый по умолчанию',
      control: { type: 'boolean' },
    },
    noOptionsText: {
      description: 'Текст, показываемый при отсутствии опций',
      control: { type: 'text' },
    },
    isLeftLabel: {
      description: 'Левый лейбл',
      control: { type: 'boolean' },
    },
    error: {
      description: 'Ошибка',
      control: { type: 'boolean' },
    },
    helperText: {
      description: 'Текст ошибки',
      control: { type: 'text' },
    },
    onChange: {
      description: 'Callback, который будет вызван при изменении значения',
      action: 'changed',
    },
    onClose: {
      description: 'Callback, который будет вызван при закрытии выпадающего списка',
      action: 'closed',
    },
    clearable: {
      description: 'Возможность сброса значения до первоначального',
      control: { type: 'boolean' },
    },
    required: {
      description: 'Обязательное поле',
      control: { type: 'boolean' },
    },
  },
};

export default meta;

// Дефолтный Dropdown
export const DropdownDefault = (argTypes: DropdownProps): JSX.Element => <Dropdown {...argTypes} />;
DropdownDefault.storyName = 'Dropdown по умолчанию';
DropdownDefault.args = {
  isOpened: false,
  options: dropdownOptions,
};

// Dropdown с выбором опций
export const DropdownChange = (argTypes: DropdownProps): JSX.Element => {
  const defaultOptions = [
    { id: '1', name: 'name 1', description: 'описание 1'},
    { id: '2', name: 'name 2', description: 'описание 2'},
    { id: '3', name: 'name 3', description: 'описание 3'},
  ]
  const [value, setValue] = useState<string | number | TOptions | null>(null);
  const [isOpened, setIsOpened] = useState(false);
  
  const handleChange = (e: any, value: string | number | TOptions | null) => {
    setValue(value);
    setIsOpened(false);
  };
  useEffect(() => {
    if (argTypes.error) setValue(null);
  }, [argTypes.error]);
  return <div style={{ display: 'flex', gap: '30px' }}>
  <Dropdown
      {...argTypes}
      options={defaultOptions}
      getOptionLabel={(option: TOptions) => option.description as keyof TOptions}
      value={value} 
      onChange={handleChange} 
      isOpened={isOpened} 
      required={true} />
  </div>
};
DropdownChange.storyName = 'Dropdown изменяемый';
DropdownChange.parameters = {
  controls: { disable: true },
};


// Dropdown с ошибкой
export const DropdownWithError = (argTypes: DropdownProps): JSX.Element => <Dropdown {...argTypes} />;
DropdownWithError.storyName = 'Dropdown c ошибкой';
DropdownWithError.args = {
  isOpened: false,
  options: dropdownOptions,
  error: true,
  helperText: 'Необходимо выбрать значение',
};
DropdownWithError.parameters = {
  controls: { disable: true },
};

// Dropdown с иконкой открытый
export const DropdownOpenedDefault = (argTypes: DropdownProps): JSX.Element => <Dropdown {...argTypes} />;
DropdownOpenedDefault.storyName = 'Dropdown открытый с иконками по умолчанию';
DropdownOpenedDefault.args = {
  isOpened: true,
  style: 'icons',
  options: dropdownOptions,
};
DropdownOpenedDefault.parameters = {
  controls: { disable: true },
};

// Dropdown c выбранным значением
export const DropdownOpenedDefaultSelected = (argTypes: DropdownProps): JSX.Element => <Dropdown {...argTypes} />;
DropdownOpenedDefaultSelected.storyName = 'Dropdown открытый с иконками по умолчанию c выбранным значением';
DropdownOpenedDefaultSelected.args = {
  defaultValue: { value: 'Выбор_2', icon: <IconAlarm10 /> },
  isOpened: true,
  style: 'icons',
  options: dropdownOptions,
};
DropdownOpenedDefaultSelected.parameters = {
  controls: { disable: true },
};

// Dropdown без иконок по умолчанию
export const DropdownOpenedText = (argTypes: DropdownProps): JSX.Element => <Dropdown {...argTypes} />;
DropdownOpenedText.storyName = 'Dropdown открытый без иконок по умолчанию';
DropdownOpenedText.args = {
  isOpened: true};
DropdownOpenedText.parameters = {
  controls: { disable: true },
};

// Dropdown без иконок с выбранным значением
export const DropdownOpenedTextSelected = (argTypes: DropdownProps): JSX.Element => <Dropdown {...argTypes} />;
DropdownOpenedTextSelected.storyName = 'Dropdown открытый без иконок по умолчанию c выбранным значением';
DropdownOpenedTextSelected.args = {
  defaultValue: { value: 'Длиный тексттттттттттттттттттттт', icon: <IconCalendar10 /> },
  isOpened: true,
  style: 'text',
  options: dropdownOptions,
};
DropdownOpenedTextSelected.parameters = {
  controls: { disable: true },
};

// Dropdown заблокированный
export const DropdownDisabled = (argTypes: DropdownProps): JSX.Element => <Dropdown {...argTypes} />;
DropdownDisabled.storyName = 'Dropdown заблокированный';
DropdownDisabled.args = {
  disabled: true,
  defaultValue: dropdownOptions.find((el) => el.value === 'Задизейбленный выбор'),
  isOpened: false,
  options: dropdownOptions,
};
DropdownDisabled.parameters = {
  controls: { disable: true },
};

// Dropdown только чтение
export const DropdownReadOnly = (argTypes: DropdownProps): JSX.Element => <Dropdown {...argTypes} />;
DropdownReadOnly.storyName = 'Dropdown только чтение';
DropdownReadOnly.args = {
  readOnly: true,
  defaultValue: { value: 'Только чтение' },
  isOpened: false,
  options: dropdownOptions,
};
DropdownReadOnly.parameters = {
  controls: { disable: true },
};

// Dropdown с лейблом
export const DropdownSelectVariantSelect = (argTypes: DropdownProps): JSX.Element => <Dropdown {...argTypes} />;
DropdownSelectVariantSelect.storyName = 'Dropdown селект c лейблом';
DropdownSelectVariantSelect.args = {
  label: 'Лейбл селекта',
  defaultValue: { value: 'Выбор_1', icon: <IconAccount10 /> },
  isOpened: false,
  options: dropdownOptions,
};
DropdownSelectVariantSelect.parameters = {
  controls: { disable: true },
};

// Dropdown с боковым лейблом
export const DropdownSelectVariantSelectLeftLabel = (argTypes: DropdownProps): JSX.Element => (
  <Dropdown {...argTypes} />
);
DropdownSelectVariantSelectLeftLabel.storyName = 'Dropdown селект c боковым лейблом';
DropdownSelectVariantSelectLeftLabel.args = {
  defaultValue: { value: 'Выбор_1', icon: <IconAccount10 /> },
  isOpened: false,
  options: dropdownOptions,
  label: 'Лейбл селекта',
  isLeftLabel: true,
  placeholder: 'Боковой лейбл',
};
DropdownSelectVariantSelectLeftLabel.parameters = {
  controls: { disable: true },
};
