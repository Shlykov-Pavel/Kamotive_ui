import * as React from 'react';
import { ChangeEventHandler, CSSProperties, ReactNode, MouseEvent } from 'react';
import { ETypographyVariants } from '../components/Typography/enums';
import { Accept, FileError } from 'react-dropzone';
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
    mode?: 'default' | 'text' | 'icon';
    style?: CSSProperties;
    /** Состояние кнопки */
    condition?: 'default' | 'error' | 'success' | 'warning' | 'info';
    /** Иконка кнопки */
    icon?: React.ReactNode;
    /** Заблокированная кнопка */
    disabled?: boolean;
    /** Callback, который будет вызван при клике по кнопке */
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
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
    /** Дополнительный CSS класс */
    className?: string;
    /** Ref на элемент кнопки */
    ref?: React.Ref<HTMLButtonElement>;
    /** Активное состояние (имитирует hover) */
    active?: boolean;
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
    /** Callback при потере фокуса */
    onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
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
    /** Язык */
    lng?: string;
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
    [key: string]: any;
};
export type TOptions<T = {}> = BaseOptions & T;
export interface IDropdownItem {
    disabled?: boolean;
    children?: IDropdownItem[];
    value?: any;
    label?: string;
    [key: string]: any;
}
export interface DropdownBaseProps<T> {
    /** Массив элементов для выпадающего списка */
    options: T[];
    /** Идентификатор */
    id?: string;
    /** Лейбл */
    label?: string;
    /** Подсказик заполнения */
    placeholder?: string;
    /** Обязательное поле */
    required?: boolean;
    /** Значение по умолчанию */
    defaultValue?: IDropdownItem | null;
    /** Флаг, является ли выпадающий список пагинированным */
    showLoadMore?: boolean;
    /** Функция для загрузки списка при пагинированных данных */
    loadMore?: () => void;
    isOptionsLoading?: boolean;
    /** Функция для получения текста опции */
    getOptionLabel?: (option: IDropdownItem) => string;
    /** Варианты выпадающего списка */
    variant?: 'icons' | 'text' | 'filter';
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
    /** Callback, который будет вызван при открытии Dropdown */
    onOpen?: (event: any) => void;
    /** Callback при клике */
    onClick?: (event: any) => void;
    /** Callback при потере фокуса */
    onBlur?: (event: any) => void;
    /** Callback при получении фокуса */
    onFocus?: (event: any) => void;
    /** Callback при закрытии */
    onClose?: (event: any) => void;
    /** Возможность сброса значения */
    clearable?: boolean;
    /** Включение автозаполнения */
    enableAutocomplete?: boolean;
    /** Функция для получения данных по поиску */
    onSearch?: (value: string) => void;
    isSearchLoading?: boolean;
    /** Текст при отсутствии опций */
    noOptionsText?: string;
    /** Язык */
    lng?: string;
    /** Множественный выбор */
    multiple?: boolean;
    /** Количество видимых значений при множественном выборе */
    limitTags?: number;
}
export type DropdownProps<T> = (DropdownBaseProps<T> & {
    multiple: true;
    value?: T[] | null;
    onChange?: (event: any, value: T[]) => void;
}) | (DropdownBaseProps<T> & {
    multiple?: false;
    value?: T | null;
    onChange?: (event: any, value: T | null) => void;
});
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
    /** Длительность анимации */
    animationDuration?: number;
    /**Для выставления флага окончания загрузки */
    setIsLoadingFinished?: (value: boolean) => void;
    /** Ширина прогресс бара */
    width?: string;
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
    /** Цвет чекбока */
    color?: string;
    /** Заливка */
    filled?: boolean;
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
export interface TableFilterSidebarProps {
    /** Флаг открытия */
    open: boolean;
    /** Функция обработки закрытия */
    onClose: () => void;
    /** Содержимое окна */
    children: ReactNode;
    /** Язык */
    lng: string;
    /** Функция обработки сброса фильтров */
    onReset?: () => void;
    /** Функция обработки применения фильтров */
    onApply?: () => void;
    /** Флаги для дизейбла кнопок */
    isResetDisabled?: boolean;
    isApplyDisabled?: boolean;
    /** Стили передаваемые напрямую */
    style?: React.CSSProperties;
    /** Дополнительный класс */
    className?: string;
    /** Флаг загрузки контента */
    isLoading?: boolean;
    width?: string;
    zIndex?: number;
    /** Позиционирование */
    top?: number;
    right?: number;
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
    /** Стили передаваемые напрямую */
    style?: CSSProperties;
    /** Дополнительный класс */
    className?: string;
}
export interface TabsProps {
    /** Табы */
    children: React.ReactElement<TabProps>[];
    /** Значение */
    value?: string;
    /** Обработчик изменения значения */
    onChange?: (value: string) => void;
    /** Стили передаваемые напрямую */
    style?: CSSProperties;
    /** Дополнительный класс */
    className?: string;
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
    onColorChange?: (color: string) => void;
}
export type SnackbarProps = {
    /** Сообщение */
    children: ReactNode;
    /** Тип сообщения */
    type: 'success' | 'error' | 'warning' | 'info';
    /** Иконка */
    icon?: boolean;
    /** Длительность показа сообщения */
    duration?: number;
    /** Функция обработки закрытия сообщения */
    onClose?: () => void;
    /** Стили передаваемые напрямую */
    style?: CSSProperties;
    /** Язык */
    lng?: string;
};
export type TAttachments = {
    id?: string | null;
    filename?: string | null;
    uri?: string;
    size?: number;
    createDateTime?: string;
    updateDateTime?: string;
    file?: File[];
    preview?: string;
    lng?: string;
    [key: string]: any;
};
export interface FileAttachProps {
    filesList: TAttachments[];
    /** Максимальный размер файла */
    maxFileSize?: number;
    /** Максимальное количество файлов */
    maxFileCount?: number;
    /** Максимальное количество символов в названии файла */
    maxFileName?: number;
    /**Поддерживаемые форматы файлов */
    acceptedFormats?: Accept;
    /** Неподдерживаемые форматы файлов */
    rejectedFormats?: Accept;
    /**Добавленные файлы */
    addedFiles: File[];
    /**Сосотояние для добавления файлов */
    setAddedFiles: (addedFiles: File[]) => void;
    /** Функция обработки скачивания файла */
    onDownload?: (file: TAttachments) => void;
    /** Функция обработки удаления файла */
    onDelete?: (id: string) => void;
    /**Разрешени на добавление файлов*/
    canAdd?: boolean;
    /**Разрешение на удаление файлов */
    canDelete?: boolean;
    /**Разрешение на скачивание файлов */
    canDownload?: boolean;
    /**Позиционирование блока прикрепленных файлов */
    position?: 'left' | 'right' | 'bottom';
    /** Язык */
    lng?: string;
    /** Дополнительный класс */
    className?: string;
    /** Стили передаваемые напрямую */
    style?: React.CSSProperties;
    /** Функция валидации файла */
    fileValidator?: (file: File) => FileError | FileError[] | null;
}
export interface FileListAttaсhedProps {
    /** Список прикрепленных файлов */
    filesList: TAttachments[] | [] | undefined;
    /** Функция обработки удаления файла */
    onDelete?: (id: string) => void;
    /** Функция обработки скачивания файла */
    onDownload?: (file: TAttachments) => void;
    /**Разрешение на удаление файлов */
    canDelete?: boolean;
    /**Разрешение на скачивание файлов */
    canDownload?: boolean;
    /**Флаг для показа информационного текста */
    isInfoShown?: boolean;
    /** Язык */
    lng?: string;
    /** Дополнительный класс */
    className?: string;
    /** Стили передаваемые напрямую */
    style?: React.CSSProperties;
}
export interface FileItemProps {
    /** Файл */
    file: TAttachments;
    /** Флаг загрузки файла */
    loading?: boolean;
    /** Текст ошибки загрузки файла */
    error?: string | boolean;
    /** Функция обработки скачивания файла */
    onDownload?: (file: TAttachments) => void;
    /** Функция обработки удаления файла */
    onDelete?: (id: string) => void;
    /**Разрешение на удаление файлов */
    canDelete?: boolean;
    /**Разрешение на скачивание файлов */
    canDownload?: boolean;
    /** Стили передаваемые напрямую */
    style?: CSSProperties;
    /** Флаг добавленного файла */
    isAddedFile?: boolean;
    /** Флаг отклоненного файла */
    isRejectedFile?: boolean;
    /** Флаг для файлов комментариев */
    isComment?: boolean;
    /** Язык интерфейса для типов данных*/
    lng?: string;
}
export interface FileLoaderProps {
    /** Максимальный размер файла */
    maxFileSize?: number;
    /** Максимальное количество файлов */
    maxFileCount?: number;
    /** Максимальное количество символов в названии файла */
    maxFileName?: number;
    /**Поддерживаемые форматы файлов */
    acceptedFormats?: Accept;
    /** Неподдерживаемые форматы файлов */
    rejectedFormats?: Accept;
    /**Добавленные файлы */
    addedFiles: File[];
    /**Сосотояние для добавления файлов */
    setAddedFiles: (addedFiles: File[]) => void;
    /**Разрешени на добавление файлов*/
    canAdd?: boolean;
    /** Язык */
    lng?: string;
    /** Дополнительный класс */
    className?: string;
    /** Стили передаваемые напрямую */
    style?: React.CSSProperties;
    /** Функция валидации файла */
    fileValidator?: (file: File) => FileError | FileError[] | null;
}
export interface FileLoaderHandle {
    clearErrorFiles: () => void;
    clearAllFiles: () => void;
}
export interface DialogProps {
    /** Флаг открытия окна */
    open: boolean;
    /** Функция обработки закрытия окна */
    onClose?: () => void;
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
    /**Показ лоадера сверху диалогового окна*/
    isLoading?: boolean;
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
    onClick: (e: React.MouseEvent) => void;
    /** Дочерние элементы */
    children?: ReactNode;
    /** Дополнительный класс */
    className?: string;
    title?: string;
}
export interface BaseListProps {
    /** Идентификатор */
    id?: string;
    /** Стиль элемента списка */
    style?: CSSProperties;
    /** Дополнительный класс */
    className?: string;
    /** Обработчик клика */
    onClick?: () => void;
    /** Обработчик выбора чекбокса */
    onCheck?: (activeId: string | string[], isChecked: boolean) => void;
    /** Заблокированный чекбокс/RadioButton */
    disabled?: boolean;
    /** Кастомный цвет чекбокса */
    checkboxColor?: string;
    /** Заливка чекбокса */
    checkboxFilled?: boolean;
    /** Обработчик выбора RadioButton */
    onRadioSelect?: (id: string) => void;
    /** Активный чекбокс */
    checked?: boolean;
    /** Активный чекбокс родительского компонента */
    parentChecked?: boolean;
    /** Выбранный RadioButton */
    selected?: boolean;
    /** Отображаемый текст */
    label?: string;
    /** Добавлен чекбокс */
    withCheckbox?: boolean;
    /** Добавлен RadioButton */
    withRadioButton?: boolean;
    /** Кастомный буллит */
    customBullet?: React.ReactNode;
    /** Стиль кастомного буллита */
    bulletClassName?: string;
}
export interface ListItemProps extends BaseListProps {
    /** Дочерние элементы */
    children?: ReactNode;
}
export interface ListProps extends BaseListProps {
    /** Контент заголовка */
    titleContent?: ReactNode;
    /** Дочерние элементы */
    children: React.ReactElement<ListItemProps> | React.ReactElement<ListItemProps>[];
    /** Возможность раскрытия списка */
    collapsible?: boolean;
    /** Кастомный буллит дочернего компонента */
    customItemBullet?: React.ReactNode;
    /** Внешний компонент без буллитов/чекбоксов */
    isHeader?: boolean;
    /** Раскрытый список */
    open?: boolean;
}
export interface TooltipProps {
    /** Текст подсказки */
    label: string;
    /** Дочерние элементы */
    children: React.ReactNode;
    /** Дополнительный класс */
    className?: string;
    /** Стиль подсказки */
    style?: CSSProperties;
    /** Положение подсказки */
    overlayChildren?: boolean;
    /** Размер текста */
    textSize?: 'sm' | 'md' | 'lg';
    /** Позиция подсказки */
    position?: 'none' | 'bottom-center' | 'bottom-right' | 'bottom-left' | 'top-center' | 'top-right' | 'top-left';
    /** Время, через которое будет показана подсказка */
    displayDelay?: number;
    /** Время, через которое будет скрыта подсказка */
    hideDelay?: number;
    /** Прозрачность подсказки (значение от 0 до 1) */
    opacity?: number;
    /** Цвет подсказки */
    color?: string;
    /** Подсказка, следующая за курсором */
    followCursor?: boolean;
}
export interface TextEditorProps {
    defaultValue?: string;
    attachedFiles?: TAttachments[] | null;
    label?: string;
    onSubmit?: (value: string, files: File[]) => void;
    onCancel?: () => void;
    onDelete?: (id: string) => void;
    error?: boolean;
    setError?: (value: boolean) => void;
    helperText?: string;
    isEditMode?: boolean;
    canAttachFiles?: boolean;
    maxFileCount?: number;
    maxFileSize?: string;
    required?: boolean;
    className?: string;
    /** Язык */
    lng?: string;
}
export interface ChildCommentProps {
    id: string;
    text?: string | null;
    authorUser?: {
        id?: string | null | undefined;
        login?: string | null | undefined;
        firstName?: string | null | undefined;
        lastName?: string | null | undefined;
        middleName?: string | null | undefined;
        fullName?: string | null | undefined;
        admin?: boolean | null | undefined;
        [key: string]: any;
    } | null;
    createDate?: string | null;
    [key: string]: any;
}
export interface CommentProps {
    comment: ChildCommentProps;
    avatar?: string | null;
    creationDate?: string;
    canAttachFiles?: boolean;
    files?: TAttachments[];
    canEdit?: boolean;
    isEdit?: boolean;
    /** Ошибка */
    error?: boolean;
    setError?: (value: boolean) => void;
    /** Текст ошибки */
    helperText?: string;
    /** Callback при изменении значения */
    onSubmit?: (value: string, files: File[], commentId?: string) => void;
    onEdit?: (value: boolean) => void;
    onDelete?: (comment: ChildCommentProps) => void;
    onDownload?: (file: TAttachments) => void;
    canDeleteFile?: boolean;
    onFileDelete?: (id: string) => void;
    maxFileCount?: number;
    maxFileSize?: string;
    /** Язык */
    lng?: string;
    /** Стили передаваемые напрямую */
    style?: CSSProperties;
    /** Дополнительный класс */
    className?: string;
}
export interface LinkProps {
    /**Гипертекстовая ссылка */
    href?: string;
    /** Обработчик клика */
    onClick?: () => void;
    /** Дочерние элементы */
    children: ReactNode;
    /**Заголовок, содержащий дополнительную информацию о ссылке */
    title?: string;
    /** Дополнительный класс */
    className?: string;
    /** Стили передаваемые напрямую */
    style?: CSSProperties;
    /** Стили текста */
    contentStyle?: CSSProperties;
    /**Подчеркивание */
    underline?: 'hover' | 'underline' | 'none';
    /** Вариант шрифта */
    variant?: `${ETypographyVariants}`;
    /** Цвет текста */
    color?: CSSProperties['color'];
    /**Максимальная ширина - нужна для отображения тултипа */
    maxWidth?: string;
    /** Размер - для отображения тултипа */
    size?: number;
    widthInPixels?: number;
}
