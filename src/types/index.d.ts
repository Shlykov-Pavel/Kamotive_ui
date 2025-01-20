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

  //Типы для Checkbox
  export interface CheckboxProps {
    checked?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>
    disabled?: boolean;
    size?: 'sm' | 'md';
    label?: string;
  }

  export const Checkbox: React.FC<CheckboxProps>;

  //Типы для Radio
  export interface RadioProps {
    value?: string;
    label?: string;
    checked?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    disabled?: boolean;
    size?: 'sm' | 'md';
  }

  export const RadioButton: React.FC<RadioProps>;

}
