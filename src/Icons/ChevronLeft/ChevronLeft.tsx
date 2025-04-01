import React, { FC } from 'react';

export const ChevronLeft: FC<{ color?: string; htmlColor?: string; strokeWidth?: string }> = ({
  color = 'inherit',
  htmlColor,
  strokeWidth,
}) => {
  return (
	<svg
	  width="16"
	  height="16"
	  viewBox="0 0 16 16"
	  fill="none"
	  xmlns="http://www.w3.org/2000/svg"
	  className={color}
	>
	  <path
		fill={htmlColor || 'currentColor'}
		stroke={htmlColor || 'currentColor'}
		strokeWidth={strokeWidth || '0'}
		d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" 
	  />
	</svg>
  );
};
