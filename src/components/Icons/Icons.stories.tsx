import React, { CSSProperties, ReactNode, useState } from 'react';
import type { Meta } from '@storybook/react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, IconAccount, IconAdd, IconAlarm, IconAddress, IconBell, IconBriefcase, IconCalendar, IconCheck, IconClose, IconColorPicker, IconDownload, IconError, IconEyeOff, IconFile, IconInfo, IconSuccess, IconUpload, IconWarning, IconPhone, IconLocation, IconEmail, IconEye, IconPencil, IconDelete, IconDublicate, IconSpaceChange, IconGoTo, IconHome } from '../../Icons';
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
  { name: 'Вниз / ChevronDown', icon: <ChevronDown /> },
  { name: 'Вверх / ChevronUp', icon: <ChevronUp /> },
  { name: 'Влево / ChevronLeft', icon: <ChevronLeft /> },
  { name: 'Вправо / ChevronRight', icon: <ChevronRight /> },
  { name: 'Успех / IconSuccess', icon: <IconSuccess /> },
  { name: 'Ошибка / IconError', icon: <IconError /> },
  { name: 'Информация / IconInfo', icon: <IconInfo /> },
  { name: 'Предупреждение / IconWarning', icon: <IconWarning /> },
  { name: 'Скачать / IconDownload', icon: <IconDownload /> },
  { name: 'Загрузить / IconUpload', icon: <IconUpload /> },
  { name: 'Файл / IconFile', icon: <IconFile /> },
  { name: 'Почта / IconEmail', icon: <IconEmail /> },
  { name: 'Добавить / IconAdd', icon: <IconAdd /> },
  { name: 'Выбрать / IconCheck', icon: <IconCheck /> },
  { name: 'Закрыть / IconClose', icon: <IconClose /> },
  { name: 'Выбор цвет / IconColorPicker', icon: <IconColorPicker /> },
  { name: 'Предупреждение / IconAlarm', icon: <IconAlarm /> },
  { name: 'Календарь / IconCalendar', icon: <IconCalendar /> },
  { name: 'Профиль / IconAccount', icon: <IconAccount /> },
  { name: 'Уведолмение / IconBell', icon: <IconBell /> },
  { name: 'Адрес / IconAddress', icon: <IconAddress /> },
  { name: 'Портфолио / IconBriefcase', icon: <IconBriefcase /> },
  { name: 'Телефон / IconPhone', icon: <IconPhone /> },
  { name: 'Местоположение / IconLocation', icon: <IconLocation /> },
  { name: 'Просмотр / IconEye', icon: <IconEye /> },
  { name: 'Просмотр заблокирован / IconEyeOff', icon: <IconEyeOff /> },
  { name: 'Редактировать / IconPencil', icon: <IconPencil /> },
  { name: 'Удалить / IconDelete', icon: <IconDelete />},
  { name: 'Копировать / IconDublicate', icon: <IconDublicate />},
  { name: 'Сменить пространство / IconSpaceChange', icon: <IconSpaceChange />},
  { name: 'Переход / IconGoTo', icon: <IconGoTo />},
  { name: 'Домашняя страница / IconHome', icon: <IconHome />  },
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