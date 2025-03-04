import React from 'react';
import { Meta } from '@storybook/react';
import { Dropdown } from './Dropdown';
import { IconAccount10, IconAlarm10, IconBell10, IconBriefcase10, IconCalendar10 } from '../../Icons';
import { IconEyeOff10 } from '../../Icons/IconEyeOff/IconEyeOff10';
export interface DropdownProps {
  /** Идентификатор */
  id?: string;
  /** Подсказка */
  placeholder?: string;
  /**  Лейбл */
  label?: string;
  /** Размер */
  size?: 'md' | 'lg';
  /** Заблокированный */
  disabled?: boolean;
  /**Дополнительный класс */
  className?: string;
  /** Значение по умолчанию */
  defaultValue?: DropdownProps['options'][number] | null;
  /** Массив элементов для выпадающего списка [{key, value - обязательное значение, icon, isDivider, disabled, children}, ...] */
  options: any[];
  /** Открытый */
  isOpened?: boolean;
  /** Текст, показываемый при отсутствии опций */
  noOptionsText: string;
  /** Стиль выпадающего списка(текст+иконка, текст) */
  style?: 'icons' | 'text';
  /** Только для чтения */
  readOnly?: boolean;
  /** Отображение левой метки */
  isLeftLabel?: boolean;
  /** Callback, который будет вызван при изменении значения */
  onChange?: (value: DropdownProps['options'][number]) => void;
  /** Callback, который будет вызван при закрытии выпадающего списка */
  onClose?: () => void;
  /** Ошибка */
  error?: boolean;
  /** Текст ошибки */
  helperText?: string;
}

const dropdownOptions = [
  { value: 'Выбор_1', icon: <IconAccount10 /> },
  { value: 'Выбор_2', icon: <IconAlarm10 /> },
  { value: 'Задизейбленный выбор', disabled: true, icon: <IconEyeOff10 /> },
  { value: 'Выбор_4', icon: <IconBell10 /> },
  { value: 'Выбор_5', icon: <IconBriefcase10 /> },
  { value: 'Длиный тексттттттттттттттттттттт', icon: <IconCalendar10 /> },
];

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
    placeholder: {
      description: 'Подсказка',
      control: { type: 'text' },
    },
    label: {
      description: 'Лейбл селекта',
      control: { type: 'text' },
    },
    size: {
      description: 'Размер селекта',
      control: { type: 'radio' },
      options: ['md', 'lg'],
    },

    disabled: {
      description: 'Заблокированный инпут для изменений',
      control: { type: 'boolean' },
    },
    className: { description: 'Дополнительный CSS класс для обертки dropdown' },

    defaultValue: {
      description: 'Значение по умолчанию',
    },
    options: {
      description: 'Список элементов',
    },
    isOpened: {
      description: 'Открытый по умолчанию',
      control: { type: 'boolean' },
    },
    noOptionsText: {
      description: 'Текст, показываемый при отсутствии опций',
      control: { type: 'text' },
    },
    style: {
      description: 'Стили выпадающего списка',
      control: { type: 'select' },
      options: ['icons', 'text'],
    },
    readOnly: {
      description: 'Только чтение',
      control: { type: 'boolean' },
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

//
export const DropdownWithError = (argTypes: DropdownProps): JSX.Element => <Dropdown {...argTypes} />;
DropdownWithError.storyName = 'Dropdown c ошибкой';
DropdownWithError.args = {
  isOpened: false,
  options: dropdownOptions,
  error: true,
  helperText: 'Необходимо выбрать значение',
};

export const DropdownOpenedDefault = (argTypes: DropdownProps): JSX.Element => <Dropdown {...argTypes} />;
DropdownOpenedDefault.storyName = 'Dropdown открытый с иконками по умолчанию';
DropdownOpenedDefault.args = {
  isOpened: true,
  style: 'icons',
  options: dropdownOptions,
};

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

export const DropdownOpenedText = (argTypes: DropdownProps): JSX.Element => <Dropdown {...argTypes} />;
DropdownOpenedText.storyName = 'Dropdown открытый без иконок по умолчанию';
DropdownOpenedText.args = {
  isOpened: true,
  style: 'text',
  options: [
    { id: '1111', name: '1111' },
    { id: '2222', name: '22222' },
    { id: '3333', name: '333333' },
  ],
};
DropdownOpenedText.parameters = {
  controls: { disable: true },
};

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
