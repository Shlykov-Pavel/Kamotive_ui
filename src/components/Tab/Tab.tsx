import React, { FC, MouseEvent } from 'react';

import styles from './Tab.module.css';
import classNames from 'classnames';
import { TabProps } from '../../types';
import { Typography } from '../Typography/Typography';

export const Tab: FC<TabProps> = ({ value, onClick, onMouseEnter, label, selected, disabled = false, style, className }) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (onClick && value && !disabled) {
      onClick(value);
    }
  };
  return (
    <button
      role="tab"
      aria-selected={selected}
      aria-disabled={disabled}
      value={value}
      className={classNames(styles.tab, {
        [styles.selected]: selected,
        [styles.disabled]: disabled,
        [className || '']: className,
      })}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      style={style}
    >
      <Typography variant={selected ? 'Body1-SemiBold' : 'Body1'}>{label}</Typography>
    </button>
  );

};