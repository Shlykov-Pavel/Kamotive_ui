import * as React from 'react';
import { ChangeEventHandler, CSSProperties, ReactNode } from 'react';
import { ETypographyVariants } from '../components/Typography/enums';
import { Accept } from 'react-dropzone/.';
/** @internal */
export interface BreadcrumbProps {
    /** Обработчик клика */
    onClick?: () => void;
    /** Активный */
    active?: boolean;
    /** Отображаемый текст */
    label?: string;
    /** Дочерние элементы */
    children?: ReactNode;
    /** Иконка */
    icon?: React.ReactNode;
}
export interface BreadcrumbsProps {
    /** Активный */
    className?: string;
    /** Разделитель */
    separator?: React.ReactNode;
    /** Дочерние элементы */
    children: React.ReactElement<BreadcrumbProps>[];
}
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
    /** Дочерние элементы */
    children?: ReactNode;
    /** Указатель на ошибку для установки condition */
    error?: boolean;
    /** Дополнительный цвет кнопки*/
    color?: string;
    /** Имя поля */
    name?: string;
    /** Тип кнопки */
    type?: 'button' | 'submit' | 'reset';
    /** Указатель на форму */
    form?: string;
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
    /** Стили передаваемые напрямую */
    style?: CSSProperties;
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
export interface DateInputProps {
    /** Идентификатор элемента */
    id?: string;
    /** Лейбл */
    label?: string;
    /** Размер */
    size?: 'sm' | 'md' | 'lg';
    /** Знчение */
    value?: string;
    /** Стили передаваемые напрямую */
    style?: CSSProperties;
    /** Дополнительный класс */
    className?: string;
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
    onChange?: (value: string | Date) => void;
    /** Callback при потере фокуса */
    onBlur?: React.FocusEventHandler<HTMLElement>;
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
export interface DropdownProps {
    /** Массив элементов для выпадающего списка */
    options: Array<string | number | TOptions>;
    /** Идентификатор */
    id?: string;
    /** Лейбл */
    label?: string;
    /** Подсказик заполнения */
    placeholder?: string;
    /** Обязательное поле */
    required?: boolean;
    /** Значение */
    value?: string | number | TOptions | null;
    /** Значение по умолчанию */
    defaultValue?: string | number | TOptions | null;
    /** Callback, который будет вызван при изменении значения */
    onChange?: (event: any, value: string | number | TOptions | null) => void;
    /** Функция для получения текста опции */
    getOptionLabel?: (option: TOptions) => keyof TOptions;
    /** Вариaнты выпадающего списка(текст + иконка, текст)' */
    variant?: 'icons' | 'text';
    /** Размер */
    size?: 'md' | 'lg';
    /** Стили передаваемые напрямую */
    style?: CSSProperties;
    /** Дополнительный класс */
    className?: string;
    /** Отображение левой метки */
    isLeftLabel?: boolean;
    /** Отображение разделителя */
    isDivider?: boolean;
    /** Заблокированный */
    disabled?: boolean;
    /** Только для чтения */
    readOnly?: boolean;
    /** Открытый */
    isOpened?: boolean;
    /** Ошибка */
    error?: boolean;
    /** Текст ошибки */
    helperText?: string;
    /** Callback, который будет вызван при клике */
    onClick?: (event: any) => void;
    /** Callback при потере фокуса */
    onBlur?: (event: any) => void;
    /** Callback при получении фокуса */
    onFocus?: (event: any) => void;
    /** Callback, который будет вызван при закрытии выпадающего списка */
    onClose?: (event: any) => void;
    /** Возможность сброса значения до первоначального */
    clearable?: boolean;
    /** Включение автозаполнения */
    enableAutocomplete?: boolean;
    /** Текст при отсутствии опций */
    noOptionsText?: string;
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
export interface SpinnerProps {
    /** Размер */
    size?: 'xs' | 'sm' | 'md' | 'lg';
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
    onMouseEnter?: (event: React.MouseEvent<HTMLButtonElement>) => void;
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
export interface LoaderProps {
    /** Название файла */
    name?: string;
    /** Размер файла */
    size?: number;
    /** Флаг загрузки файла */
    loading?: boolean;
    /** Текст ошибки загрузки файла */
    error?: string;
    /** Функция обработки */
    onClick?: () => void;
}
export interface FileAttachProps {
    /** Максимальный размер файла */
    maxFileSize?: number;
    /** Максимальное количество файлов */
    maxFileCount?: number;
    /**Поддерживаемые форматы файлов */
    acceptedFormats?: Accept;
    /**Добавленные файлы */
    addedFiles: File[];
    /**Состояние для добавления файлов */
    setAddedFiles: (addedFiles: File[]) => void;
    /**Заблокировано добавление файлов*/
    disabled?: boolean;
    /** Дополнительный класс */
    className?: string;
    /** Стили передаваемые напрямую */
    style?: CSSProperties;
}
export interface DialogProps {
    /** Флаг открытия окна */
    open: boolean;
    /** Максимальная ширина окна */
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string;
    /** Содержимое окна */
    children?: React.ReactNode;
    /** Стили передаваемые напрямую */
    style?: CSSProperties;
    /** Дополнительный класс */
    className?: string;
    /**Задний фон окна */
    overlay?: boolean;
    /**Окно растягивается до максимальной ширины*/
    fullWidth?: boolean;
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
}
