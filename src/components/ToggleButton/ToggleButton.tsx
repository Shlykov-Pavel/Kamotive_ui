import React, { FC, MouseEventHandler } from 'react';

import './ToggleButton.css';
import classNames from 'classnames';
import { ToggleButtonProps } from 'kamotive_ui';

export const ToggleButton: FC<ToggleButtonProps> = ({ value, onChange, disabled = false, size = 'sm', label }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };
  return (
    <label className='toggle'>
      <input
        type="checkbox"
        checked={value}
        onChange={handleChange}
        disabled={disabled}
        className={classNames('toggleInput', `${size}`)}
      />
      {label}
    </label>
  );
};