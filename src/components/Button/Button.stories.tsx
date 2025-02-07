import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import styles from './Button.module.css';
import { IconAccount10, IconAlarm10, IconBank10, IconBell10, IconBriefcase10, IconCalendar10 } from '../../Icons';
import { ButtonProps } from 'kamotive_ui';

const iconOptions = {
  IconAlarm10: <IconAlarm10 />,
  IconAccount: <IconAccount10 />,
  IconBank: <IconBank10 />,
  IconBell: <IconBell10 />,
  IconBriefcase10: <IconBriefcase10 />,
  IconCalendar10: <IconCalendar10 />,
  unset: null,
};

const withWrapper = (Story: any) => <div className={styles[`story--wrapper`]}>{<Story />}</div>;
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [withWrapper],
  // title: 'Button',
  args: {
    label: 'Кнопка',
    variant: 'fill',
    size: 'md',
    style: 'default',
    condition: 'default',
    icon: 'unset',
    disabled: false,
    // iconColor: '#FFFFFF',
  },
  argTypes: {
    label: { description: 'Текст кнопки' },
    variant: {
      description: 'Вариант кнопки',
      control: { type: 'select' },
      options: ['fill', 'outline', 'link'],
    },
    size: {
      description: 'Размер кнопки',
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
    style: {
      description: 'Стиль кнопки',
      control: { type: 'select' },
      options: ['default', 'text', 'icon'],
    },
    condition: {
      description: 'Состояние кнопки',
      control: { type: 'select' },
      options: ['default', 'error', 'success', 'warning', 'info'],
      mapping: {
        default: 'default',
        error: 'error',
        success: 'success',
        warning: 'warning',
        info: 'info',
      },
    },
    icon: {
      description: 'Иконка кнопки',
      control: { type: 'select' },
      options: Object.keys(iconOptions),
      mapping: iconOptions,
    },
    // iconColor: {
    //   description: 'Цвет иконки',
    //   control: { type: 'color' },
    // },
    disabled: { description: 'Заблокированная кнопка', control: { type: 'boolean' } },
    //onClick: { description: 'Callback, который будет вызван при клике по кнопке', action: 'клик' },
    // backgroundColor: { control: 'color' },
  },
};

export default meta;

type Story = StoryObj<ButtonProps>;

// Дефолтный Button
export const ButtonDefault = (argTypes: ButtonProps): JSX.Element => <Button {...argTypes} />;
ButtonDefault.storyName = 'Button по умолчанию';
ButtonDefault.args = {
  icon: <IconAccount10 />,
};

// Стандартная синияя кнопка без иконки
export const ButtonWithoutIcon = (argTypes: ButtonProps): JSX.Element => <Button {...argTypes} />;
ButtonWithoutIcon.storyName = 'Button без иконки';
ButtonWithoutIcon.args = {
  variant: 'fill',
  size: 'md',
  style: 'text',
};
ButtonWithoutIcon.parameters = {
  controls: { disable: true },
};

// Стандартная синияя кнопка только иконка
export const ButtonFillOnlyIcon = (argTypes: ButtonProps): JSX.Element => <Button {...argTypes} />;
ButtonFillOnlyIcon.storyName = 'Button только иконка';
ButtonFillOnlyIcon.args = {
  label: '',
  variant: 'fill',
  size: 'md',
  style: 'icon',
  icon: <IconAccount10 />,
  // iconColor: '#FFFFFF',
};
ButtonFillOnlyIcon.parameters = {
  controls: { disable: true },
};

// Outlined Button c иконкой
export const ButtonOutlinedWithIcon = (argTypes: ButtonProps): JSX.Element => <Button {...argTypes} />;
ButtonOutlinedWithIcon.storyName = 'Button outlined по умолчанию';
ButtonOutlinedWithIcon.args = {
  variant: 'outline',
  style: 'default',
  condition: 'default',
  icon: <IconAccount10 />,
  iconColor: '#0D99FF',
};
ButtonOutlinedWithIcon.parameters = {
  controls: { disable: true },
};

// Outlined Button
export const ButtonOutlinedWithoutIcon = (argTypes: ButtonProps): JSX.Element => <Button {...argTypes} />;
ButtonOutlinedWithoutIcon.storyName = 'Button outlined без иконки';
ButtonOutlinedWithoutIcon.args = {
  variant: 'outline',
  style: 'text',
  condition: 'default',
};
ButtonOutlinedWithoutIcon.parameters = {
  controls: { disable: true },
};

// Outlined Button
export const ButtonOutlinedOnlyIcon = (argTypes: ButtonProps): JSX.Element => <Button {...argTypes} />;
ButtonOutlinedOnlyIcon.storyName = 'Button outlined только иконка';
ButtonOutlinedOnlyIcon.args = {
  label: '',
  variant: 'outline',
  style: 'icon',
  condition: 'default',
  icon: <IconAccount10 />,
  // iconColor: '#0D99FF',
};
ButtonOutlinedOnlyIcon.parameters = {
  controls: { disable: true },
};

// Текстовый/ссылка Button
export const ButtonLink = (argTypes: ButtonProps): JSX.Element => <Button {...argTypes} />;
ButtonLink.args = {
  size: 'md',
  variant: 'link',
  disabled: false,
};
ButtonLink.storyName = 'Button текстовый/ссылка';
ButtonOutlinedOnlyIcon.parameters = {
  controls: { disable: true },
};

//Состояния
export const ButtonStates = (argTypes: ButtonProps): JSX.Element => {
  const [state, setState] = useState<'default' | 'error' | 'success' | 'warning' | 'info'>('default');
  const [label, setLabel] = useState('Клик дефолтная кнопка');

  const handleButtonClick = () => {
    if (label === 'Клик дефолтная кнопка') {
      setState('error');
      setLabel('Клик error');
    } else if (label === 'Клик error') {
      setState('success');
      setLabel('Клик success');
    } else if (label === 'Клик success') {
      setState('warning');
      setLabel('Клик warning');
    } else if (label === 'Клик warning') {
      setState('info');
      setLabel('Клик info');
    } else {
      setState('default');
      setLabel('Клик дефолтная кнопка');
    }
  };

  return (
    <Button
      label={label}
      variant="fill"
      style={'default'}
      icon={<IconAccount10 />}
      condition={state}
      onClick={handleButtonClick}
    />
  );
};
ButtonStates.storyName = 'Состояния button';
ButtonStates.parameters = {
  controls: { disable: true },
};

//Состояния
export const ButtonOutlineStates = (argTypes: ButtonProps): JSX.Element => {
  const [state, setState] = useState<'default' | 'error' | 'success' | 'warning' | 'info'>('default');
  const [label, setLabel] = useState('Клик дефолтная кнопка');

  const handleButtonClick = () => {
    if (label === 'Клик дефолтная кнопка') {
      setState('error');
      setLabel('Клик error');
    } else if (label === 'Клик error') {
      setState('success');
      setLabel('Клик success');
    } else if (label === 'Клик success') {
      setState('warning');
      setLabel('Клик warning');
    } else if (label === 'Клик warning') {
      setState('info');
      setLabel('Клик info');
    } else {
      setState('default');
      setLabel('Клик дефолтная кнопка');
    }
  };

  return (
    <Button
      label={label}
      variant="outline"
      style={'default'}
      condition={state}
      onClick={handleButtonClick}
      icon={<IconAccount10 />}
    />
  );
};
ButtonOutlineStates.storyName = 'Состояния outlined button';
ButtonOutlineStates.parameters = {
  controls: { disable: true },
};
