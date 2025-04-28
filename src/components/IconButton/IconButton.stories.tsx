import React, { CSSProperties, ReactNode } from 'react';
import type { Meta } from '@storybook/react';

import { IconButton } from './IconButton';
import {
  IconAccount10,
  IconAdd,
  IconAlarm10,
  IconBank10,
  IconBell10,
  IconBriefcase10,
  IconCalendar10,
  IconClose10,
} from '../../Icons';

export interface IconButtonProps {
  /** Иконка кнопки */
  icon?: React.ReactNode;
  /** Размер кнопки */
  size?: 'sm' | 'md' | 'lg';
  /**Цвет кнопки */
  color?: string;
  /** Стиль кнопки иконки*/
  style?: CSSProperties;
  /** Заблокированная кнопка */
  disabled?: boolean;
  /** Callback, который будет вызван при клике по кнопке */
  onClick: (e: React.MouseEvent) => void;
  /** Дочерние элементы */
  children?: React.ReactNode;
  /** Дополнительный класс */
  className?: string;
}

const withWrapper = (Story: React.ComponentType) => (
  <div
    style={{
      backgroundColor: 'var(--white)',
      padding: '30px',
      borderRadius: '10px',
    }}
  >
    <Story />
  </div>
);

const iconOptions = {
  IconAlarm10: <IconAlarm10 />,
  IconAccount: <IconAccount10 />,
  IconBank: <IconBank10 />,
  IconBell: <IconBell10 />,
  IconBriefcase10: <IconBriefcase10 />,
  IconCalendar10: <IconCalendar10 />,
  IconClose10: <IconClose10 />,
  unset: null,
};

const meta: Meta<IconButtonProps> = {
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [withWrapper],
  args: {
    size: 'md',
    disabled: false,
    color: '#0d99ff',
  },
  argTypes: {
    size: {
      description: 'Размер кнопки',
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
    style: { description: 'Дополнительные стили для компонента' },
    icon: {
      description: 'Иконка кнопки',
      control: { type: 'select' },
      options: Object.keys(iconOptions),
      mapping: iconOptions,
    },
    disabled: { description: 'Заблокированная кнопка', control: { type: 'boolean' } },
    onClick: { description: 'Callback, который будет вызван при клике по кнопке', action: 'clicked' },
    children: { description: 'Дочерние элементы', control: { type: 'text' } },
    color: { description: 'Дополнительный цвет кнопки', control: { type: 'color' } },
    className: { description: 'Дополнительные классы для компонента' },
  },
};

export default meta;

export const defaultIconButton = (argTypes: IconButtonProps): JSX.Element => <IconButton {...argTypes} />;
defaultIconButton.storyName = 'IconButton по умолчанию';
defaultIconButton.args = {
  icon: <IconClose10 />,
  color: '#0D99FF',
};
defaultIconButton.parameters = {
  controls: { disable: true },
};

export const defaultIconButtonChidren = (argTypes: IconButtonProps): JSX.Element => {
  return (
    <IconButton
      onClick={() => {}}
      color="var(--white)"
      size="lg"
      style={{ backgroundColor: 'var(--blue-main)', width: '30px', height: '30px', borderRadius: '10px' }}
    >
      {' '}
      <IconAdd />{' '}
    </IconButton>
  );
};

defaultIconButtonChidren.storyName = 'IconButton при передаче иконки через дочерний компонент';
defaultIconButtonChidren.parameters = {
  controls: { disable: true },
};

export const defaultIconButtonIcon = (argTypes: IconButtonProps): JSX.Element => {
  return <IconButton onClick={() => {}} color="#0D99FF" icon={<IconAdd />} />;
};
defaultIconButtonIcon.storyName = 'IconButton при передаче иконки через пропсы';
defaultIconButtonIcon.parameters = {
  controls: { disable: true },
};
