import React, { FC, MouseEventHandler } from 'react';

import styles from './Checkbox.module.css';
import classNames from 'classnames';
import { CheckboxProps } from 'kamotive_ui';

export const Checkbox: FC<CheckboxProps> = ({ checked, onChange, disabled = false, size = 'sm', label}) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };
  return (
    <label className={styles.checkbox}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className={classNames(styles.input, styles[size])}
      />
      {label}
    </label>
  );
};
