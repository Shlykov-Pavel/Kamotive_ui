import React from 'react';
import styles from './Button.module.css';
import classNames from 'classnames';
import { ButtonProps } from 'kamotive_ui';
/**
 * Компонент Button представляет собой кнопку, которую можно настроить с помощью различных параметров (размер, иконки, стили, состояние).
 */

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'fill',
  size = 'md',
  style = 'text',
  condition = 'default',
  icon,
  disabled = false,
  onClick,
}) => {
  const buttonClassess = classNames(
    styles.button,
    styles[`button--${variant}-${condition}`],
    styles[`button--${size}`],
    styles[`button--${style}`]
    // {
    //   [styles['button--disabled']]: disabled,
    // }
  );

  const iconColorFn = () => {
    switch (condition) {
      case 'default':
        if (variant === 'outline') {
          return disabled ? '#8dc6ef' : '#0d99ff';
        }
        return disabled ? 'var(--blue-disabled)' : '#FFFFFF';
      case 'error':
        if (variant === 'outline') {
          return disabled ? '#ff8d87' : '#ff3b30';
        }
        return disabled ? 'var(--red-disabled)' : '#FFFFFF';
      case 'success':
        if (variant === 'outline') {
          return disabled ? '#8ac99a' : '#34c759';
        }
        return disabled ? 'var(--green-disabled)' : '#FFFFFF';
      case 'warning':
        if (variant === 'outline') {
          return disabled ? '#ffb44a' : '#ff9500';
        }
        return disabled ? 'var(--orange-disabled)' : '#FFFFFF';
      case 'info':
        return disabled ? 'var(--gray-disabled)' : '#6F6F6F';
      default:
        return disabled ? 'var(--blue-disabled)' : '#FFFFFF';
    }
  };
  const iconColorStyle = iconColorFn();
  return (
    <button className={buttonClassess} onClick={onClick} disabled={disabled}>
      {icon &&
        React.cloneElement(icon as React.ReactElement, {
          htmlColor: iconColorStyle,
          strokeWidth: size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0',
        })}
      {label}
    </button>
  );
};
