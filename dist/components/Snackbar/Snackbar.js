import React, { useEffect, useState } from 'react';
import { IconClose10, IconError10, IconInfo10, IconSuccess10, IconWarning10 } from '../../Icons';
import { Typography } from '../Typography/Typography';
import styles from './Snackbar.module.css';
import classNames from 'classnames';
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
export const icons = {
    success: React.createElement(IconSuccess10, { htmlColor: "#34c759" }),
    error: React.createElement(IconError10, { htmlColor: "#ff3b30" }),
    warning: React.createElement(IconWarning10, { htmlColor: "#ff9500" }),
    info: React.createElement(IconInfo10, { htmlColor: "#6F6F6F" }),
};
export const title = {
    success: 'Успешно',
    error: 'Ошибка',
    warning: 'Внимание',
    info: 'Информация',
};
export const Snackbar = ({ children, type, duration = 10000, icon = true, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);
    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                setIsVisible(false);
                onClose === null || onClose === void 0 ? void 0 : onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);
    const handleClose = () => {
        setIsVisible(false);
        onClose === null || onClose === void 0 ? void 0 : onClose();
    };
    if (!isVisible)
        return null;
    const snackbarClasses = classNames(styles['snackbar-wrapper'], type ? `snackbar--${type}` : '');
    return (React.createElement("div", { className: snackbarClasses },
        React.createElement("div", { className: styles['snackbar-textAndIcon'] },
            icon && icons[type],
            React.createElement("div", { className: styles['snackbar-text'] },
                React.createElement(Typography, { variant: "Body2-Medium", color: 'var(--text-dark)' }, title[type]),
                React.createElement(Typography, { variant: "Caption", color: 'var(--text-btn-light)' }, children))),
        React.createElement("button", { className: styles['button'], onClick: handleClose },
            React.createElement(IconClose10, { htmlColor: 'var(--text-btn-light)' }))));
};
