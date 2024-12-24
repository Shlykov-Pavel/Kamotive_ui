declare module 'kamotive_ui' {
  import * as React from 'react';

  // Типы для Button
  export interface ButtonProps {
    label: string;
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'medium' | 'large';
    onClick?: () => void;
    backgroundColor?: string;
    primary?: boolean;
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
    value?: boolean;
    onClick?: MouseEventHandler<HTMLInputElement>
    disabled?: boolean;
    size?: 'sm' | 'md';
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
