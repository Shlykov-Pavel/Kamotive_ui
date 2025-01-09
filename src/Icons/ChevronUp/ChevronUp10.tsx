import React, { FC } from 'react';
import styles from '../Icons.module.css';

export const ChevronUp10: FC<{ color?: string; htmlColor?: string; strokeWidth?: string }> = ({
  color = 'inherit',
  htmlColor,
  strokeWidth,
}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${styles.icon} ${color && styles[color]}`}
    >
      <path
        fill={htmlColor || 'currentColor'}
        stroke={htmlColor || 'currentColor'}
        strokeWidth={strokeWidth || '0'}
        d="M5.84,15.41L11.5,9.75L17.16,15.41L16.45,16.11L11.5,11.16L6.55,16.11L5.84,15.41Z" 
        />
    </svg>
  );
};
