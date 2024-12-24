import React, { FC, MouseEventHandler } from 'react';

import styles from './RadioButton.module.css';
import classNames from 'classnames';
import { RadioProps } from 'kamotive_ui';

export const RadioButton: FC<RadioProps> = ({
  value ,
  label ,
  checked,
  onChange,
  disabled = false,
  size = 'md',
}) => {
  return (
    <label className={styles.radio}>
      <input
        type="radio"
        checked={checked}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={classNames(styles.input, styles[size])}
      />
        {label}
    </label>
  );
};
