import React, { FC } from 'react';

export const IconSpaceChange: FC<{ color?: string; htmlColor?: string; strokeWidth?: string, onClick?: (event: React.MouseEvent<SVGSVGElement>) => void; }> = ({
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
        d="M2.7,11L11.37,4.25L20.3,11.23L11.63,18L2.7,11M18.7,11.21L11.39,5.5L4.32,11L11.63,16.73L18.7,11.21M11.63,21L2.7,14L3.5,13.4L11.61,19.75L19.5,13.59L20.3,14.23L11.63,21Z" 
      />
    </svg>
  );
};