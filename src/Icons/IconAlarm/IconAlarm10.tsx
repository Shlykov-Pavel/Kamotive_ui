import React, { FC } from 'react';
import styles from '../Icons.module.css';

export const IconAlarm10: FC<{ color?: string; htmlColor?: string; strokeWidth?: string }> = ({
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
        d="M11.5,6C15.64,6 19,9.36 19,13.5C19,17.64 15.64,21 11.5,21C7.36,21 4,17.64 4,13.5C4,9.36 7.36,6 11.5,6M11.5,7C7.91,7 5,9.91 5,13.5C5,17.09 7.91,20 11.5,20C15.09,20 18,17.09 18,13.5C18,9.91 15.09,7 11.5,7M11,9H12V13.36L15.05,14.78L14.63,15.69L11,14V9M15.25,5.25L15.89,4.5L19.72,7.7L19.08,8.46L15.25,5.25M7.75,5.25L3.92,8.46L3.28,7.7L7.11,4.5L7.75,5.25Z"
      />
    </svg>
  );
};
