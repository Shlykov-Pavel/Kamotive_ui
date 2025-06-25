import React, { CSSProperties, FC } from 'react';

export const IconHeader2: FC<{
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
        d="M1 1H11M6 1V12"
        stroke={htmlColor || "#55534E"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth || '1'}
      />
    </svg>
  );
};

export const IconHeader2ToString = (
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
      d="M1 1H11M6 1V12"
      stroke="${htmlColor || "#55534E"}"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="${strokeWidth || '1'}"
    />
  </svg>`;
};
