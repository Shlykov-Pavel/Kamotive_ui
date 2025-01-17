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

  export interface TabProps {
    onClick?: (value: string ) => void;
    size?: 'sm' | 'md';
    label?:string;
    selected?: boolean;
    disabled?:boolean;
    value?:string;
  }
  
  export interface TabsProps {
    value?: string ;
    onChange?: (value: string) => void;
    children?: React.ReactElement<TabProps>[];
  }

  export interface TabPanelProps {
    value?: string ;
    children?: React.ReactNode;
    selected?:boolean;
  }

  export const Tab:  React.FC<TabProps>;
  export const Tabs:  React.FC<TabsProps>;
  export const TabPanel:  React.FC<TabPanelProps>;

}
