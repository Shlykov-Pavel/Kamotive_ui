import React, { FC } from 'react';
import styles from '../Icons.module.css';

export const IconBank10: FC<{ color?: string; htmlColor?: string; strokeWidth?: string }> = ({
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
        d="M11,2.5L20,7V9H2V7L11,2.5M15,10H19V18H15V10M2,22V19H20V22H2M9,10H13V18H9V10M3,10H7V18H3V10M3,20V21H19V20H3M4,11V17H6V11H4M10,11V17H12V11H10M16,11V17H18V11H16M3,8H19V7.6L11,3.58L3,7.6V8Z"
      />
    </svg>
  );
};
