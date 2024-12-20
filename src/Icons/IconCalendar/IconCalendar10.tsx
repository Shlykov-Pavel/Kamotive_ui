import React, { FC } from 'react';
import styles from '../Icons.module.css';

export const IconCalendar10: FC<{ color?: string; htmlColor?: string; strokeWidth?: string }> = ({
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
      className={`${color && styles[color]}`}
    >
      <path
        fill={htmlColor || 'currentColor'}
        stroke={htmlColor || 'currentColor'}
        strokeWidth={strokeWidth || '0'}
        d="M7,2H8C8.55,2 9,2.45 9,3V4H14V3C14,2.45 14.45,2 15,2H16C16.55,2 17,2.45 17,3V4C18.66,4 20,5.34 20,7V18C20,19.66 18.66,21 17,21H6C4.34,21 3,19.66 3,18V7C3,5.34 4.34,4 6,4V3C6,2.45 6.45,2 7,2M15,4H16V3H15V4M8,4V3H7V4H8M6,5C4.9,5 4,5.9 4,7V8H19V7C19,5.9 18.1,5 17,5H6M4,18C4,19.1 4.9,20 6,20H17C18.1,20 19,19.1 19,18V9H4V18M12,13H17V18H12V13M13,14V17H16V14H13Z"
      />
    </svg>
  );
};
