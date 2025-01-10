import type { Meta } from '@storybook/react';
import React, { useState } from 'react';
import styles from './Snackbar.module.css';
import { icons, Snackbar, SnackbarProps } from './Snackbar';
import { ESnackbarTypes } from './enums';

const withWrapper = (Story: any) => <div className={styles['story--wrapper']}>{<Story />}</div>;

const meta: Meta = {
  title: 'Components/Snackbar',
  component: Snackbar,
  tags: ['autodocs'],
  decorators: [withWrapper],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      description: 'Содержимое, которое будет отображаться на Snackbar, например текст.',
      control: { type: 'text' },
    },
    type: {
      description: 'Тип сообщения',
      control: { type: 'select' },
      options: ['error', 'success', 'warning', 'info'],
    },
    duration: {
      description: 'Длительность сообщения',
      control: { type: 'number' },
    },
    onClose: {
      description: 'Callback, который будет вызван при закрытии сообщения',
      action: 'клик',
    },
  },
};

export default meta;

export const SnackbarColors = (argTypes: SnackbarProps): JSX.Element => {
  const types = Object.keys(ESnackbarTypes) as Array<ESnackbarTypes>;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {types.map((type) => (
        <Snackbar {...argTypes} type={type} key={type} duration={0} onClose={argTypes.onClose}>
          Текст
        </Snackbar>
      ))}
    </div>
  );
};
SnackbarColors.storyName = 'Snackbar с разными вариантами цветов';
SnackbarColors.args = {
  icon: true,
};
SnackbarColors.parameters = {
  controls: { disable: true },
};

export const SnackbarDefault = (argTypes: SnackbarProps): JSX.Element => (
  <Snackbar {...argTypes} duration={0} type={'success'}>
    Текст
  </Snackbar>
);
SnackbarDefault.storyName = 'Snackbar дефолтный';

export const SnackbarLongText = (argTypes: SnackbarProps): JSX.Element => {
  return (
    <Snackbar {...argTypes} duration={0} type={'error'}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </Snackbar>
  );
};
SnackbarLongText.storyName = 'Snackbar с длинным текстом';
SnackbarLongText.parameters = {
  controls: { disable: true },
};

export const SnackbarClose = (argTypes: SnackbarProps): JSX.Element => {
  return (
    <Snackbar {...argTypes} duration={10000} type={'success'}>
      Автоматическое закрытие через 10 секунд
    </Snackbar>
  );
};
SnackbarClose.storyName = 'Snackbar закрытие';
SnackbarClose.parameters = {
  controls: { disable: true },
};
