import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import styles from './Dropdown.module.css';
import { Dropdown, DropdownListItem } from './Dropdown';
import { IconAccount10, IconAlarm10, IconBank10, IconBell10, IconBriefcase10, IconCalendar10 } from '../../Icons';
import { IconEyeOff10 } from '../../Icons/IconEyeOff/IconEyeOff10';
import { DropdownProps } from 'kamotive_ui';

const dropdownOptions = [
  { value: 'Выбор_1', icon: <IconAccount10 /> },
  { value: 'Выбор_2', icon: <IconAlarm10 /> },
  { value: 'Задизейбленный выбор', disabled: true, icon: <IconEyeOff10 /> },
  { value: 'Выбор_4', icon: <IconBell10 /> },
  { value: 'Выбор_5', icon: <IconBriefcase10 /> },
  { value: 'Длиный тексттттттттттттттттттттт', icon: <IconCalendar10 /> },
];

const withWrapper = (Story: any) => <div className={styles[`story--wrapper`]}>{<Story />}</div>;
const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [withWrapper],
  args: {
    name: 'Выпадающий список....',
    disabled: false,
    // className: 'default',
    items: dropdownOptions,
  },
  argTypes: {
    id: {
      description: 'Уникальный идетифиактор',
    },
    name: {
      description: 'Имя селекта',
      control: { type: 'text' },
    },
    label: {
      description: 'Лейбл селекта',
      control: { type: 'text' },
    },
    size: {
      description: 'Размер селекта',
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },

    disabled: {
      description: 'Заблокированный инпут для изменений',
      control: { type: 'boolean' },
    },
    className: { description: 'Дополнительный CSS класс для обертки dropdown' },

    defaultValue: {
      description: 'Значение по умолчанию',
    },
    items: {
      description: 'Список элементов',
    },
    isOpened: {
      description: 'Открытый по умолчанию',
      control: { type: 'boolean' },
    },
    style: {
      description: 'Стили выпадающего списка',
      control: { type: 'select' },
      options: ['default', 'text'],
    },
    readOnly: {
      description: 'Только чтение',
      control: { type: 'boolean' },
    },
    isLeftLabel: {
      description: 'Левый лейбл',
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
  items: dropdownOptions,
};

export const DropdownOpenedDefault = (argTypes: DropdownProps): JSX.Element => <Dropdown {...argTypes} />;
DropdownOpenedDefault.storyName = 'Dropdown открытый с иконками по умолчанию';
DropdownOpenedDefault.args = {
  isOpened: true,
  style: 'default',
  items: dropdownOptions,
};

export const DropdownOpenedDefaultSelected = (argTypes: DropdownProps): JSX.Element => <Dropdown {...argTypes} />;
DropdownOpenedDefaultSelected.storyName = 'Dropdown открытый с иконками по умолчанию c выбранным значением';
DropdownOpenedDefaultSelected.args = {
  defaultValue: { value: 'Выбор_2', icon: <IconAlarm10 /> },
  isOpened: true,
  style: 'default',
  items: dropdownOptions,
};
DropdownOpenedDefaultSelected.parameters = {
  controls: { disable: true },
};

export const DropdownOpenedText = (argTypes: DropdownProps): JSX.Element => <Dropdown {...argTypes} />;
DropdownOpenedText.storyName = 'Dropdown открытый без иконок по умолчанию';
DropdownOpenedText.args = {
  isOpened: true,
  style: 'text',
  items: dropdownOptions,
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
  items: dropdownOptions,
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
  items: dropdownOptions,
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
  items: dropdownOptions,
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
  items: dropdownOptions,
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
  items: dropdownOptions,
  label: 'Лейбл селекта',
  isLeftLabel: true,
  name: 'Лейбл селекта',
};
DropdownSelectVariantSelectLeftLabel.parameters = {
  controls: { disable: true },
};
