declare module 'kamotive_ui' {
  import * as React from 'react';

  /** @internal */
  export interface ButtonProps {
    /** Тест кнопки */
    label?: string;
    /** Вид кнопки (заполненный/обводка/ссылка) */
    variant?: 'fill' | 'outline' | 'link';
    /** Размер кнопки */
    size?: 'sm' | 'md' | 'lg';
    /** Стиль кнопки(текст+иконка, текст, иконка) */
    style?: 'default' | 'text' | 'icon';
    /** Состояние кнопки */
    condition?: 'default' | 'error' | 'success' | 'warning' | 'info';
    /** Иконка кнопки */
    icon?: React.ReactNode;
    /** Заблокированная кнопка */
    disabled?: boolean;
    /** Callback, который будет вызван при клике по кнопке */
    onClick?: () => void;
  }

  export const Button: React.FC<ButtonProps>;

  /** @internal */
  export interface InputProps {
    /** Идентификатор элемента */
    id?: string;
    /** Лейбл */
    label?: string;
    /** Подсказка */
    placeholder?: string;
    /** Размер */
    size?: 'sm' | 'md' | 'lg';
    /** Знчение */
    value?: string;
    /** Дополнительный класс */
    className?: string;
    /** Многострочное поле */
    multiline?: boolean;
    /** Изменение размера многострочного поля */
    resize?: boolean;
    /** Заблокированное поле */
    disabled?: boolean;
    /** Только для чтения */
    readOnly?: boolean;
    /** Метка слева */
    isLeftLabel?: boolean;
    /** Иконка слева */
    icon?: ReactNode;
    /** Ошибка */
    error?: boolean;
    /** Текст ошибки */
    helperText?: string;
    /** Callback при изменении значения */
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    /** Обязательное поле */
    required?: boolean;
  }

  export const Input: React.FC<InputProps>;

  /** @internal */
  export interface TagProps {
    /** Лейбл */
    label?: string;
    /** Цвет */
    color?: string;
    /**Наличие кнопки закрытия */
    closeButton?: boolean;
    /** Callback при изменении значения */
    onClick?: () => void;
  }

  export const Tag: React.FC<TagProps>;

  export interface SettingTagProps {
    /** Лейбл */
    label: string;
    /** Цвет */
    color?: string;
    /** Callback при изменении значения */
    onChange?: (color: string) => void;
  }

  export const SettingTag: React.FC<SettingTagProps>;

  export interface ToggleButtonProps {
    /** Знчение */
    value?: boolean;
    /** Callback при изменении значения */
    onChange?: ChangeEventHandler<HTMLInputElement>;
    /** Заблокированная кнопка */
    disabled?: boolean;
    /** Размер кнопки */
    size?: 'sm' | 'md';
    /** Текст кнопки */
    label?: string;
  }

  export const ToggleButton: React.FC<ToggleButtonProps>;

  //Типы для dropdown
  export interface DropdownProps {
    /** Идентификатор */
    id?: string;
    /**  Лейбл */
    label?: string;
    /** Подсказик заполнения */
    placeholder?: string;
    /** Размер */
    size?: 'md' | 'lg';
    /** Массив элементов для выпадающего списка */
    options: any[];
    /** Значение */
    value?: DropdownProps['options'][number] | null | string | number;
    /** Значение по умолчанию */
    defaultValue?: DropdownProps['options'][number] | null | string | number;
    /** Стиль выпадающего списка(текст+иконка, текст) */
    style?: 'icons' | 'text';
    /**Дополнительный класс */
    className?: string;
    /** Заблокированный */
    disabled?: boolean;
    /** Только для чтения */
    readOnly?: boolean;
    /** Открытый */
    isOpened?: boolean;
    /** Текст при отсутствии опций */
    noOptionsText: string;
    /** Отображение левой метки */
    isLeftLabel?: boolean;
    /** Ошибка */
    error?: boolean;
    /** Текст ошибки */
    helperText?: string;
    /** Callback, который будет вызван при изменении значения */
    onChange?: (event: ChangeEvent<HTMLInputElement>, value: DropdownProps['options'][number]) => void;
    /** Callback, который будет вызван при закрытии выпадающего списка */
    onClose?: (event: ChangeEvent<HTMLInputElement>) => void;
    /** Возможность сброса значения до первоначального */
    clearable?: boolean;
    /** Обязательное поле */
    required?: boolean;
  }
  export const Dropdown: React.FC<DropdownProps>;

  /** @internal */
  export interface TypographyProps {
    /** Вариант шрифта */
    variant?: `${ETypographyVariants}`;
    /** Текст */
    children: ReactNode;
    /** Дополнительный класс */
    className?: string;
    /** Цвет текста */
    color?: CSSProperties['color'];
    /** Стиль текста */
    style?: CSSProperties;
  }

  export const Typography: React.FC<TypographyProps>;

  export interface ProgressBarProps {
    /** Значение */
    value?: number;
    /** Максимальное значение */
    max?: number;
    /** Размер */
    size?: 'sm' | 'md' | 'lg';
    /** Показывать значение */
    showValue?: boolean;
    /** Анимация */
    animated?: boolean;
  }
  export const ProgressBar: React.FC<ProgressBarProps>;

  export interface ProgressLoaderProps {
    /** Значение */
    value: number;
    /** Размер */
    size?: 'sm' | 'md' | 'lg' | 'xl';
    /** Показывать значение */
    showValue?: boolean;
    /** Анимация */
    animated?: boolean;
  }
  export const ProgressLoader: React.FC<ProgressLoaderProps>;

  export interface CheckboxProps {
    /** Идентификатор */
    checked?: boolean;
    /** Обработчик изменения состояния */
    onChange?: ChangeEventHandler<HTMLInputElement>;
    /** Заблокированный чекбокс */
    disabled?: boolean;
    /** Размер чекбокса */
    size?: 'sm' | 'md';
    /** Текст лейбла */
    label?: string;
  }

  export const Checkbox: React.FC<CheckboxProps>;

  export interface RadioProps {
    /** Значение */
    value?: string;
    /**  Лейбл */
    label?: string;
    /** Выбраный */
    checked?: boolean;
    /** Обработчик изменения состояния */
    onChange?: ChangeEventHandler<HTMLInputElement>;
    /** Заблокированный чекбокс */
    disabled?: boolean;
    /** Размер чекбокса */
    size?: 'sm' | 'md';
  }

  export const RadioButton: React.FC<RadioProps>;

  export interface TabProps {
    /** Значение */
    value?: string;
    /** Обработчик клика */
    onClick?: (value: string) => void;
    /** Текст лейбла */
    label?: string;
    /** Размер */
    selected?: boolean;
    /** Заблокированный */
    disabled?: boolean;
    /** Табы */
    children?: React.ReactNode;
  }

  export interface TabsProps {
    /** Табы */
    children: React.ReactElement<TabProps>[];
    /** Значение */
    value?: string;
    /** Обработчик изменения значения */
    onChange?: (value: string) => void;
  }

  export const Tab: React.FC<TabProps>;
  export const Tabs: React.FC<TabsProps>;

  export interface ColorPickerProps {
    /** Цвет выбранный пользователем */
    color?: string;
    /** Основной цвет */
    mainColor?: string;
    /** Последние использованные цвета*/
    recentColors?: string[];
    /** Флаг наведения на меню*/
    setIsHovered: (isHover: boolean) => void;
    /** Ширина ColorPicker */
    width?: number;
    /** Высота ColorPicker*/
    height?: number;
    /** Автофокус ColorPicker*/
    autoOpen?: boolean;
    /** Функция обработки изменения цвета */
    onChange?: (color: string) => void;
  }
  export const ColorPicker: React.FC<ColorPickerProps>;

  export type SnackbarProps = {
    /** Сообщение */
    children: ReactNode;
    /** Тип сообщения */
    type: 'success' | 'error' | 'warning' | 'info';
    /** Иконка */
    icon?: boolean;
    /** Длительность показа сообщения */
    duration: number;
    /** Функция обработки закрытия сообщения */
    onClose?: () => void;
  };
  export const Snackbar: React.FC<SnackbarProps>;
}
