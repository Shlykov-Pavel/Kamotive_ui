import React, { FC } from 'react';

import styles from './ToggleButton.module.css';
import classNames from 'classnames';
import { ToggleButtonProps } from 'kamotive_ui';
import { Typography } from '../Typography/Typography';

export const ToggleButton: FC<ToggleButtonProps> = ({ value, onChange, disabled = false, size = 'md', label }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };
  return (
    <label className={styles.toggle}>
      <input
        type="checkbox"
        checked={value}
        onChange={handleChange}
        disabled={disabled}
        className={classNames(styles.toggleInput, styles[size])}
      />
       <Typography variant='Body2'>{label}</Typography>
    </label>
  );
};