import React, { CSSProperties, FC } from 'react';

export const IconUnderline: FC<{
  color?: string;
  htmlColor?: string;
  strokeWidth?: string;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  style?: CSSProperties;
}> = ({ color = 'inherit', htmlColor, strokeWidth, onClick, style }) => {
  return (
    <svg
      width="13"
      height="14"
      viewBox="0 0 13 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={color}
      onClick={onClick}
      style={style}
    >
      <path
        d="M10.1667 1V6.14286C10.1667 7.05217 9.78036 7.92424 9.09273 8.56722C8.40509 9.21021 7.47246 9.57143 6.5 9.57143C5.52754 9.57143 4.59491 9.21021 3.90728 8.56722C3.21964 7.92424 2.83333 7.05217 2.83333 6.14286V1M1 13H12"
        stroke={htmlColor || '#55534E'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth || '1'}
      />
    </svg>
  );
};

export const IconUnderlineToString = (
  color = 'inherit',
  htmlColor?: string,
  strokeWidth?: string,
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void,
  style?: CSSProperties
) => {
  return `<svg
    width="13"
    height="14"
    viewBox="0 0 13 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className=${color}
    onClick=${onClick}
    style=${style}
  >
    <path
      d="M10.1667 1V6.14286C10.1667 7.05217 9.78036 7.92424 9.09273 8.56722C8.40509 9.21021 7.47246 9.57143 6.5 9.57143C5.52754 9.57143 4.59491 9.21021 3.90728 8.56722C3.21964 7.92424 2.83333 7.05217 2.83333 6.14286V1M1 13H12"
      stroke=${htmlColor || '#55534E'}
      strokeLinecap="round"
      stroke-linejoin="round"
      strokeWidth=${strokeWidth || '1'}
    />
  </svg>`;
};
