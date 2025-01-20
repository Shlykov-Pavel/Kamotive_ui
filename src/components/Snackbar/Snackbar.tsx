import React, { FC, ReactNode, useEffect, useState } from 'react';
import { IconClose10, IconError10, IconInfo10, IconSuccess10, IconWarning10 } from '../../Icons';
import { Typography } from '../Typography/Typography';
import styles from './Snackbar.module.css';
import classNames from 'classnames';

/**
 * Компонент Snackbar для отображения кратковременных сообщений
 */

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
  const snackbarClassess = classNames(styles['snackbar-wrapper'], styles[`snackbar--${type}`]);
  return (
    <div className={snackbarClassess}>
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
