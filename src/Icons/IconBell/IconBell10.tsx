import React, { FC } from 'react';
import styles from '../Icons.module.css';

export const IconBell10: FC<{ color?: string; htmlColor?: string; strokeWidth?: string }> = ({
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
        color={htmlColor || 'currentColor'}
        stroke={htmlColor || 'currentColor'}
        strokeWidth={strokeWidth || '0'}
        d="M12,4.5C12,4.22 11.78,4 11.5,4C11.22,4 11,4.22 11,4.5V6.03C8.75,6.28 7,8.18 7,10.5V16.41L5.41,18H17.59L16,16.41V10.5C16,8.18 14.25,6.28 12,6.03V4.5M11.5,3C12.33,3 13,3.67 13,4.5V5.21C15.31,5.86 17,8 17,10.5V16L20,19H3L6,16V10.5C6,8 7.69,5.86 10,5.21V4.5C10,3.67 10.67,3 11.5,3M11.5,22C10.29,22 9.28,21.14 9.05,20H10.09C10.29,20.58 10.85,21 11.5,21C12.15,21 12.71,20.58 12.91,20H13.95C13.72,21.14 12.71,22 11.5,22Z"
      />
    </svg>
  );
};
