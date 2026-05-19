import React, { FC } from 'react';

import styles from './RadioButton.module.css'
import classNames from 'classnames';
import { RadioProps } from '../../types';;
import { Typography } from '../Typography/Typography';

export const RadioButton: FC<RadioProps> = ({ value, label, checked, onChange, disabled = false, size = 'sm', testId = 'default' }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <label className={styles.radio} data-test-id={`${testId}-radio`}>
      <input
        type="radio"
        name="radio"
        checked={checked}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={classNames(styles.input, styles[size])}
        data-test-id={`${testId}-radio-input`}
      />
      <Typography variant='Body2' testId={`${testId}-radio`}>{label}</Typography>
    </label>
  );
};