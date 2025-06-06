import React, { FC } from 'react';

export const IconHome: FC<{ color?: string; htmlColor?: string; strokeWidth?: string, onClick?: (event: React.MouseEvent<SVGSVGElement>) => void; }> = ({
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
        d="M16,8.41L11.5,3.91L4.41,11H6V12L6,19H9V13H14V19H17V11H18.59L17,9.41V6H16V8.41M2,12L11.5,2.5L15,6V5H18V9L21,12H18V20H13V14H10V20H5V12H2Z" 
      />
    </svg>
  );
};
