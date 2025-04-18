import React, { CSSProperties, ReactNode, useState } from 'react';
import type { Meta } from '@storybook/react';
import { ChevronDown10, ChevronLeft, ChevronRight, ChevronUp10, IconAccount10, IconAdd, IconAlarm10, IconBank10, IconBell10, IconBriefcase10, IconCalendar10, IconCheck10, IconClose10, IconColorPicker10, IconDownload, IconError10, IconEyeOff10, IconFile, IconInfo10, IconSuccess10, IconUpload, IconWarning10 } from '../../Icons';
import { IconButton } from '../IconButton/IconButton';
import { Typography } from '../Typography/Typography';

export interface IconsProps {
  color?: string;
  htmlColor?: string;
  strokeWidth?: string;
}

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
    onClick: () => void;
    /** Дочерние элементы */
    children?: ReactNode;
    /** Дополнительный класс */
    className?: string;
  }

const meta: Meta<IconButtonProps> = {
    component: IconButton,
    parameters: {
      layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
      (Story) => (
        <div
          style={{
            backgroundColor: 'var(--white)',
            padding: '30px',
            borderRadius: '10px',
            width: '900px',
            height: '500px',
          }}
        >
          <Story />
        </div>
      ),
    ],
    args: {
        size: 'md',
        disabled: false,
        color: '#0d99ff'
      },
    argTypes: {
        size: {
            description: 'Размер кнопки',
            control: { type: 'radio' },
            options: ['sm', 'md', 'lg'],
          },
          style: {description: 'Дополнительные стили для компонента' },
          icon: {
            description: 'Иконка кнопки',
          },
          disabled: { description: 'Заблокированная кнопка', control: { type: 'boolean' } },
          onClick: { description: 'Callback, который будет вызван при клике по кнопке', action: 'clicked' },
          children: { description: 'Дочерние элементы', control: { type: 'text' } },
          color: { description: 'Дополнительный цвет кнопки', control: { type: 'color' } },
          className: { description: 'Дополнительные классы для компонента' },
    },
  };

const iconOptions = [
  { name: 'ChevronDown10', icon: <ChevronDown10 /> },
  { name: 'ChevronUp10', icon: <ChevronUp10 /> },
  { name: 'ChevronLeft', icon: <ChevronLeft /> },
  { name: 'ChevronRight', icon: <ChevronRight /> },
  { name: 'IconSuccess10', icon: <IconSuccess10 /> },
  { name: 'IconError10', icon: <IconError10 /> },
  { name: 'IconInfo10', icon: <IconInfo10 /> },
  { name: 'IconWarning10', icon: <IconWarning10 /> },
  { name: 'IconDownload', icon: <IconDownload /> },
  { name: 'IconUpload', icon: <IconUpload /> },
  { name: 'IconFile', icon: <IconFile /> },
  { name: 'IconEyeOff10', icon: <IconEyeOff10 /> },
  { name: 'IconAdd', icon: <IconAdd /> },
  { name: 'IconCheck10', icon: <IconCheck10 /> },
  { name: 'IconClose10', icon: <IconClose10 /> },
  { name: 'IconColorPicker10', icon: <IconColorPicker10 /> },
  { name: 'IconAlarm10', icon: <IconAlarm10 /> },
  { name: 'IconCalendar10', icon: <IconCalendar10 /> },
  { name: 'IconAccount', icon: <IconAccount10 /> },
  { name: 'IconBell', icon: <IconBell10 /> },
  { name: 'IconBank', icon: <IconBank10 /> },
  { name: 'IconBriefcase10', icon: <IconBriefcase10 /> },
  
];
  
  export default meta;

  export const defaultIcons = (argTypes: IconButtonProps): JSX.Element => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 2fr)', gap: '20px' }}>
            {iconOptions.map((iconItem, index) => (
                <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <IconButton {...argTypes} onClick={()=> {}}>
                  {iconItem.icon}
                </IconButton>
                <Typography variant="Caption">{iconItem.name}</Typography>
                </div>
            ))}
        </div>
    );
  };

  defaultIcons.storyName = 'Все иконки';