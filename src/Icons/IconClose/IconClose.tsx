import React, { CSSProperties, FC } from 'react';

export const IconClose: FC<{
  color?: string;
  htmlColor?: string;
  strokeWidth?: string;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  style?: CSSProperties;
}> = ({ color = 'inherit', htmlColor, strokeWidth = '0.3', onClick, style }) => {
  return (
    <svg
      width="20" 
      height="20" 
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={color}
      onClick={onClick}
    >
      <path
        fill={htmlColor || 'currentColor'}
        stroke={htmlColor || 'currentColor'}
        style={{ strokeWidth: strokeWidth }}
        // d="M16.24,7.76L12,12L7.76,7.76L7.05,8.47L11.29,12.71L7.05,16.95L7.76,17.66L12,13.42L16.24,17.66L16.95,16.95L12.71,12.71L16.95,8.47L16.24,7.76Z"
        d="M17,7L12,12L7,7L6.3,7.7L11.3,12.7L6.3,17.7L7,18.4L12,13.4L17,18.4L17.7,17.7L12.7,12.7L17.7,7.7L17,7Z"
      />
    </svg>
  );
};
