import * as React from 'react';
import { ChangeEventHandler, CSSProperties, ReactNode } from 'react';
import { ETypographyVariants } from '../components/Typography/enums';


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
    /** Количество строк в многострочном поле */
    rows?: number;
    /** Изменение размера многострочного поля */
    resize?: boolean;
    /** Заблокированное поле */
    disabled?: boolean;
    /** Только для чтения */
    readOnly?: boolean;
    /** Метка слева */
    isLeftLabel?: boolean;
    /** Иконка слева */
    icon?: React.ReactNode;
    /** Ошибка */
    error?: boolean;
    /** Текст ошибки */
    helperText?: string;
    /** Callback при изменении значения */
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    /** Обязательное поле */
    required?: boolean;
  }


  /** @internal */
  export interface TagProps {
    /** Лейбл */
    label: string;
    /** Цвет */
    color?: string;
    /**Наличие кнопки закрытия */
    closeButton?: boolean;
    /** Возможность изменить лейбл */
    editable?: boolean;
    /** Callback при изменении значения */
    onChange?: (label: string) => void;
    /** Callback при нажатии на кнопку закрытия */
    onClick?: () => void;
  }


  export interface SettingTagProps {
    /** Лейбл */
    label: string;
    /** Цвет */
    color?: string;
    /** Callback при изменении значения/цвета */
    onChange?: (data: string) => void;
  }


  export interface ToggleButtonProps {
    /** Знчение */
    value?: boolean;
    /** Callback при изменении значения */
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    /** Заблокированная кнопка */
    disabled?: boolean;
    /** Размер кнопки */
    size?: 'sm' | 'md';
    /** Текст кнопки */
    label?: string;
  }


  export type BaseOptions = {
    id?: string;
    key?: string | number;
    name?: string;
    description?: string;
    value?: string | number;
    icon?: React.JSX.Element;
    disabled?: boolean;
    isDivider?: boolean;
    children?: TOptions[];
  };

  export type TOptions<T = {}> = BaseOptions & T;

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
    options: Array<string | number | TOptions>;
    /** Функция для получения текста опции */
    getOptionLabel?: (option: TOptions) =>  keyof TOptions;
    /** Значение */
    value?: string | number | TOptions | null;
    /** Значение по умолчанию */
    defaultValue?: string | number | TOptions | null;
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
    onChange?: (event:any, value: string | number | TOptions | null) => void;
    /** Callback, который будет вызван при закрытии выпадающего списка */
    onClose?: (event: any) => void;
    /** Возможность сброса значения до первоначального */
    clearable?: boolean;
    /** Обязательное поле */
    required?: boolean;
    /** Отображение разделителя */
    isDivider?: boolean;
  }


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
    /** Callback функция при изменении цвета */
    onChange?: (color: string) => void;
    /** Функция обработки изменения цвета */
    onColorChange: (color: string) => void;
  }

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
