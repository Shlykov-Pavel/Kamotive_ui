import React, { FC, useEffect, useState } from 'react';
import { IconClose, IconError, IconInfo, IconSuccess, IconWarning } from '../../Icons';
import { Typography } from '../Typography/Typography';
import styles from './Snackbar.module.css';
import classNames from 'classnames';
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

export const icons = {
  success: <IconSuccess htmlColor="#34c759" />,
  error: <IconError htmlColor="#ff3b30" />,
  warning: <IconWarning htmlColor="#ff9500" />,
  info: <IconInfo htmlColor="#6F6F6F" />,
};

export const title = {
  success: 'Успешно',
  error: 'Ошибка',
  warning: 'Внимание',
  info: 'Информация',
};

export const Snackbar: FC<SnackbarProps> = ({ children, type, duration = 10000, icon = true, onClose, style }) => {
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
      onClose?.();
    }, 300);
  };

  if (!isVisible) return null;

  const snackbarClasses = classNames(
    styles['snackbar-wrapper'], 
    styles[`snackbar--${type}`],
    {
      [styles['snackbar-wrapper--exiting']]: isExiting
    }
  );

  return (
    <div className={snackbarClasses} style={style}>
      <div className={styles['snackbar-textAndIcon']}>
        {icon && icons[type]}
        <div className={styles['snackbar-text']}>
          <Typography variant="Body1-Medium" color={'var(--text-dark)'}>
            {title[type]}
          </Typography>
          <Typography variant="Body1" color={'var(--text-btn-light)'}>
            {children}
          </Typography>
        </div>
      </div>
      <button className={styles.button} onClick={handleClose}>
        <IconClose htmlColor={'var(--text-btn-light)'} />
      </button>
    </div>
  );
};
