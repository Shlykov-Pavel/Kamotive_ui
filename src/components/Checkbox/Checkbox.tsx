import React, { FC, MouseEventHandler } from 'react';

import styles from './Checkbox.module.css';
import classNames from 'classnames';

export interface CheckboxProps {
  value?: boolean;
  onClick?: MouseEventHandler<HTMLInputElement>
  disabled?: boolean;
  size?: 'sm' | 'md';
}

export const Checkbox: FC<CheckboxProps> = ({ value, onClick, disabled = false, size = 'md' }) => {
  return (
    <label className={styles.checkbox}>
      <input
        type="checkbox"
        checked={value}
        onClick={onClick}
        disabled={disabled}
        className={classNames(styles.input, styles[size])}
      />
    </label>
  );
};
