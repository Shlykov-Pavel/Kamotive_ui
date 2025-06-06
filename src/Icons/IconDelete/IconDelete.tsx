import React, { FC } from 'react';

export const IconDelete: FC<{ color?: string; htmlColor?: string; strokeWidth?: string, onClick?: (event: React.MouseEvent<SVGSVGElement>) => void; }> = ({
  color = 'inherit',
  htmlColor,
  strokeWidth,
  onClick,
}) => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={color}
      onClick={onClick}
    >
      <path
        fill={htmlColor || 'currentColor'}
        stroke={htmlColor || 'currentColor'}
        strokeWidth={strokeWidth || '0'}
        d="M18,19C18,20.66 16.66,22 15,22H8C6.34,22 5,20.66 5,19V7H4V4H8.5L9.5,3H13.5L14.5,4H19V7H18V19M6,7V19C6,20.1 6.9,21 8,21H15C16.1,21 17,20.1 17,19V7H6M18,6V5H14L13,4H10L9,5H5V6H18M8,9H9V19H8V9M14,9H15V19H14V9Z"
      />
    </svg>
  );
};

