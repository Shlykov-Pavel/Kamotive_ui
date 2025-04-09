import React, { FC } from 'react';

import styles from './Checkbox.module.css';
import classNames from 'classnames';
import { CheckboxProps } from '../../types';;
import { Typography } from '../Typography/Typography';

export const Checkbox: FC<CheckboxProps> = ({ checked, onChange, disabled = false, size = 'sm', label, color }) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  const checkboxStyles = {
    '--border-color': color || 'var(--icons-active)',  
    '--border-color-hover': color ? 'color-mix(in srgb, var(--border-color) 60%, white)' : 'var(--blue-main)',
    '--border-color-checked': color || 'var(--icons-medium)',
    '--border-color-disabled': color ? 'color-mix(in srgb, var(--border-color) 30%, white)' : 'var(--icons-light)',
  } as React.CSSProperties;

  return (
    <label className={styles.checkbox} style={checkboxStyles}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className={classNames(styles.input, styles[size])}
      />
      <Typography variant='Body2'>{label}</Typography>
    </label>
  );
};