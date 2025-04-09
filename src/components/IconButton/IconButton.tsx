import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { IconButtonProps } from '../../types';
import styles from './IconButton.module.css';

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = 'md',
  color,
  style,
  disabled = false,
  onClick,
  children,
  className
}) => {
  return (
    <button
      className={classNames(styles['iconButton'], styles[`iconButton--${size}`], className)}
      disabled={disabled}
      aria-disabled={disabled}
      type="button"
      onClick={onClick}
      style={style}
    >
      {(icon || (typeof children === 'object' && children)) &&
        React.cloneElement(icon as React.ReactElement, {
          htmlColor: color,
          strokeWidth: size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0',
        })}
    </button>
  );
};
