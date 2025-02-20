import React, { FC, MouseEvent } from 'react';

import './Tab.css';
import classNames from 'classnames';
import { TabProps } from 'kamotive_ui';

export const Tab: FC<TabProps> = ({ value, onClick, label, selected, disabled = false }) => {
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
      className={classNames('tab', {
        'selected': selected,
        'disabled': disabled,
      })}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};