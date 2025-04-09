import React, { FC } from 'react';

export const ChevronDown10: FC<{ color?: string; htmlColor?: string; strokeWidth?: string, rotation?: number }> = ({
  color = 'inherit',
  htmlColor,
  strokeWidth,
  rotation = 0,
}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={color}
    >
      <g transform={`rotate(${rotation}, 12, 12)`}>
        <path
          fill={htmlColor || 'currentColor'}
          stroke={htmlColor || 'currentColor'}
          strokeWidth={strokeWidth || '0'}
          d="M5.84,9.59L11.5,15.25L17.16,9.59L16.45,8.89L11.5,13.84L6.55,8.89L5.84,9.59Z" 
        />
      </g>
    </svg>
  );
};
