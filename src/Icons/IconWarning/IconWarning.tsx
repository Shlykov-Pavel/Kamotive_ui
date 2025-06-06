import React, { CSSProperties, FC } from 'react';
import styles from '../Icons.module.css';

export const IconWarning: FC<{ color?: string; htmlColor?: string; strokeWidth?: string; style?: CSSProperties }> = ({
  color = 'inherit',
  htmlColor,
  strokeWidth = '0.3',
  style
}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={color}
      style={style}
    >
      <path
        fill={htmlColor || 'currentColor'}
        stroke={htmlColor || 'currentColor'}
        style={{ strokeWidth: strokeWidth }}
        strokeLinejoin="round"
        d="M1,21L11.5,2.81L22,21H1M20.27,20L11.5,4.81L2.73,20H20.27M11,14V10H12V14H11M11,16H12V18H11V16Z" 
      />
    </svg>
  );
};
