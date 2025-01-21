import React, { FC, ReactNode, useEffect, useState } from 'react';
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
  success: <IconSuccess10 htmlColor="#34c759" />,
  error: <IconError10 htmlColor="#ff3b30" />,
  warning: <IconWarning10 htmlColor="#ff9500" />,
  info: <IconInfo10 htmlColor="#6F6F6F" />,
};

export const title = {
  success: 'Успешно',
  error: 'Ошибка',
  warning: 'Внимание',
  info: 'Информация',
};

export type SnackbarProps = {
  children: ReactNode;
  type: 'success' | 'error' | 'warning' | 'info';
  icon?: boolean;
  duration: number;
  onClose?: () => void;
};
export const Snackbar: FC<SnackbarProps> = ({ children, type, duration = 10000, icon = true, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };
  if (!isVisible) return null;
  const snackbarClasses = classNames(styles['snackbar-wrapper'], styles[`snackbar--${type}`]);
  return (
    <div className={snackbarClasses}>
      <div className={styles[`snackbar-textAndIcon`]}>
        {icon && icons[type]}
        <div className={styles[`snackbar-text`]}>
          <Typography variant="Body2-Medium" color={'var(--text-dark)'}>
            {title[type]}
          </Typography>
          <Typography variant="Caption" color={'var(--text-btn-light)'}>
            {children}
          </Typography>
        </div>
      </div>
      <button className={styles.button} onClick={handleClose}>
        <IconClose10 htmlColor={'var(--text-btn-light)'} />
      </button>
    </div>
  );
};
