import React, { FC } from 'react';

import styles from './ToggleButton.module.css';
import classNames from 'classnames';
import { ToggleButtonProps } from '../../types';;
import { Typography } from '../Typography/Typography';

export const ToggleButton: FC<ToggleButtonProps> = ({ value, onChange, disabled = false, size = 'md', label, testId = "default" }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };
  return (
    <label className={styles.toggle} data-test-id={`${testId}-toggle`}>
      <input
        type="checkbox"
        name="toggle"
        checked={value}
        onChange={handleChange}
        disabled={disabled}
        className={classNames(styles.toggleInput, styles[size])}
        data-test-id={`${testId}-toggle-input`}
      />
       <Typography variant='Body2' testId={`${testId}-toggle`}>{label}</Typography>
    </label>
  );
};