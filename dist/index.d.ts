import { ReactNode } from 'react';
import { ChangeEventHandler } from 'react';


declare module 'kamotive_ui' {
  import * as React from 'react';

  // Типы для Button
  export interface ButtonProps {
    // Текст кнопки
    label?: string;
    //Вид кнопки (заполненный/обводка/ссылка)
    variant?: 'fill' | 'outline' | 'link';
    //Размер кнопки
    size?: 'sm' | 'md' | 'lg';
    //Стиль кнопки(текст+иконка, текст, иконка)
    style?: 'default' | 'text' | 'icon';
    //Состояние кнопки
    condition?: 'default' | 'error' | 'success' | 'warning' | 'info';
    icon?: React.ReactNode;
    disabled?: boolean;
    onClick?: () => void;
  }

  export const Button: React.FC<ButtonProps>;

  // Типы для Input
  export interface InputProps {
    id?: string;
    className?: string;
    value?: string;
    label?: string;
    placeholder?: string;
    size?: 'sm' | 'md' | 'lg';
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    icon?: ReactNode;
    hasError?: boolean;
    helperText?: ReactNode;
    disabled?: boolean;
    readOnly?: boolean;
    isLeftLabel?: boolean;
    multiline?: boolean;
    resize?: boolean;
  }

  export const Input: React.FC<InputProps>;

  export interface DropdownProps {
    id?: string;
     name: string;
     label?: string;
     size?: 'sm' | 'md' | 'lg';
     disabled?: boolean;
     className?: string;
     defaultValue?: DropdownProps['items'][number] | null;
     items: Array<{
       key?: string;
       value: string;
       icon?: React.ReactNode;
       isDivider?: boolean;
       disabled?: boolean;
       children?: DropdownProps['items'];
     }>;
      isOpened?: boolean;
      //Стиль dropdown(текст+иконка, текст)
      style?: 'default' | 'text' ;
      readOnly?: boolean;
      isLeftLabel?:boolean;
      onChange?: (value: DropdownProps['items'][number]) => void;
      onClose?: () => void;
  }
  export const Dropdown: React.FC<DropdownProps>;


  // export const ProgressBar: React.FC<ProgressBarProps>;
}


