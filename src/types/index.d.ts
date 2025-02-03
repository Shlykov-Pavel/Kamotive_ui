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


  export interface TagProps {
    label?: string;
    color?: string;
    closeButton?: boolean;
    onClick?: () => void;
  }

  export const Tag: React.FC<TagProps>;

  export interface SettingTagProps {
    label: string;
    color?: string;
    onChange?:(color: string) => void;
  }

  export const SettingTag: React.FC<SettingTagProps>;

  export interface ToggleButtonProps {
    value?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>
    disabled?: boolean;
    size?: 'sm' | 'md';
    label?:string;
  }

  export const ToggleButton:  React.FC<ToggleButtonProps>;
    
  //Типы для dropdown 
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

export interface TypographyProps {
  variant?: `${ETypographyVariants}`;
  children: ReactNode;
  className?: string;
  color?: CSSProperties['color'];
  style?: CSSProperties;
}

export const Typography: React.FC<TypographyProps>;

export interface ProgressBarProps {
  value?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  animated?: boolean;
}
 export const ProgressBar: React.FC<ProgressBarProps>;


 export interface ProgressLoaderProps {
   value: number;
   size?: 'sm' | 'md' | 'lg' | 'xl';
   showValue?: boolean;
   animated?: boolean;
 }
 export const ProgressLoader: React.FC<ProgressLoaderProps>;

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

  export interface TabProps {
    onClick?: (value: string ) => void;
    label?:string;
    selected?: boolean;
    disabled?:boolean;
    value?:string;
    children?: React.ReactNode;
  }
  
  export interface TabsProps {
    value?: string ;
    onChange?: (value: string) => void;
    children?: React.ReactElement<TabProps>[];
  }

  export const Tab:  React.FC<TabProps>;
  export const Tabs:  React.FC<TabsProps>;

}
