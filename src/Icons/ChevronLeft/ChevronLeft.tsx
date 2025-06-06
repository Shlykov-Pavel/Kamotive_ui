import React, { CSSProperties, FC } from 'react';

export const ChevronLeft: FC<{ color?: string; htmlColor?: string; strokeWidth?: string, style?: CSSProperties }> = ({
  color = 'inherit',
  htmlColor,
  strokeWidth = '0.1',
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
		<g transform="translate(6, 6) scale(0.75)">
	  <path
			fill={htmlColor || 'currentColor'}
			stroke={htmlColor || 'currentColor'}
		  strokeWidth={`${strokeWidth} !important`}
			d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" 
	  />
		</g>
	</svg>

  );
};
