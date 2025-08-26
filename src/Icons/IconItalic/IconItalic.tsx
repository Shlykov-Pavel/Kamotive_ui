import React, { CSSProperties, FC } from 'react';

export const IconItalic: FC<{
  color?: string;
  htmlColor?: string;
  strokeWidth?: string;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  style?: CSSProperties;
}> = ({ color = 'inherit', htmlColor, strokeWidth, onClick, style }) => {
  return (
    <svg
      width="12"
      height="13"
      viewBox="0 0 12 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={color}
      onClick={onClick}
      style={style}
    >
      <path
        d="M4.9375 1.25L11.5 1.25M1 11.75H7.5625M8.21875 1.25L4.28125 11.75"
        stroke={htmlColor || "#55534E"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth || '1'}
      />
    </svg>
  );
};

export const IconItalicToString = (
  color = 'inherit',
  htmlColor?: string,
  strokeWidth?: string,
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void,
  style?: CSSProperties
) => {
  return `<svg
    width="12"
    height="13"
    viewBox="0 0 12 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="${color}"
    onclick="${onClick}"
    style="${style}"
  >
    <path
      d="M4.9375 1.25L11.5 1.25M1 11.75H7.5625M8.21875 1.25L4.28125 11.75"
      stroke="${htmlColor || "#55534E"}"
      strokeLinecap="round"
      stroke-linejoin="round"
      strokeWidth="${strokeWidth || '1'}"
    />
  </svg>`;
};
