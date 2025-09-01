import React, { FC } from 'react';
import { SnackbarProps } from '../../types';
/**
* @description Snackbar компонент для отображения всплывающих уведомлений
* @component
@param {ReactNode} children - Содержимое уведомления
@param {'success' | 'error' | 'warning' | 'info'} type - Тип уведомления, определяющий его стиль и иконку
@param {number} duration - Время в миллисекундах, через которое уведомление исчезнет (по умолчанию 10000)
@param {boolean} icon - Флаг отображения иконки (по умолчанию true)
@param {() => void} onClose - Callback функция, вызываемая при закрытии уведомления
@example
Операция выполнена успешно
@returns {JSX.Element | null} Возвращает компонент уведомления или null если оно скрыто */
export declare const icons: {
    success: React.JSX.Element;
    error: React.JSX.Element;
    warning: React.JSX.Element;
    info: React.JSX.Element;
};
export declare const title: (lng: string) => {
    success: string;
    error: string;
    warning: string;
    info: string;
};
export declare const Snackbar: FC<SnackbarProps>;
