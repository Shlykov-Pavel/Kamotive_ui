import React, { useEffect, useState } from 'react';
import { IconClose, IconError, IconInfo, IconSuccess, IconWarning } from '../../Icons';
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
    success: React.createElement(IconSuccess, { htmlColor: "#34c759" }),
    error: React.createElement(IconError, { htmlColor: "#ff3b30" }),
    warning: React.createElement(IconWarning, { htmlColor: "#ff9500" }),
    info: React.createElement(IconInfo, { htmlColor: "#6F6F6F" }),
};
export const title = (lng) => ({
    success: lng === 'ru' ? 'Успешно' : 'Success',
    error: lng === 'ru' ? 'Ошибка' : 'Error',
    warning: lng === 'ru' ? 'Внимание' : 'Warning',
    info: lng === 'ru' ? 'Информация' : 'Info',
});
export const Snackbar = ({ children, type, duration = 10000, icon = true, onClose, style, lng = 'ru' }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isExiting, setIsExiting] = useState(false);
    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                handleClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);
    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            setIsVisible(false);
            onClose === null || onClose === void 0 ? void 0 : onClose();
        }, 300);
    };
    if (!isVisible)
        return null;
    const snackbarClasses = classNames(styles['snackbar-wrapper'], styles[`snackbar--${type}`], {
        [styles['snackbar-wrapper--exiting']]: isExiting
    });
    return (React.createElement("div", { className: snackbarClasses, style: style },
        React.createElement("div", { className: styles['snackbar-textAndIcon'] },
            icon && icons[type],
            React.createElement("div", { className: styles['snackbar-text'] },
                React.createElement(Typography, { variant: "Body1-Medium", color: 'var(--text-dark)' }, title(lng)[type]),
                React.createElement(Typography, { variant: "Body1", color: 'var(--text-btn-light)' }, children))),
        React.createElement("button", { className: styles.button, onClick: handleClose },
            React.createElement(IconClose, { htmlColor: 'var(--text-btn-light)' }))));
};
