import React, { CSSProperties, FC } from 'react';

export const IconUndo: FC<{
  color?: string;
  htmlColor?: string;
  strokeWidth?: string;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  style?: CSSProperties;
}> = ({ color = 'inherit', htmlColor, strokeWidth, onClick, style }) => {
  return (
    <svg
      width="15"
      height="9"
      viewBox="0 0 15 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={color}
      onClick={onClick}
      style={style}
    >
      <path
        d="M14.3506 8C14.3506 4.32927 11.3173 1.34146 7.59059 1.34146C5.33725 1.42683 3.08392 2.62195 1.78392 4.5M1.35059 1V4.41463C1.35059 4.67073 1.52392 4.84146 1.78392 4.84146H5.25059"
        stroke={htmlColor || "#55534E"}
        strokeLinecap="round"
        strokeWidth={strokeWidth || '1'}
      />
    </svg>
  );
};

export const IconUndoToString = (
  color = 'inherit',
  htmlColor?: string,
  strokeWidth?: string,
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void,
  style?: CSSProperties
) => {
  return `<svg
    width="15"
    height="9"
    viewBox="0 0 15 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="${color}"
    onclick="${onClick}"
    style="${style}"
  >
    <path
      d="M14.3506 8C14.3506 4.32927 11.3173 1.34146 7.59059 1.34146C5.33725 1.42683 3.08392 2.62195 1.78392 4.5M1.35059 1V4.41463C1.35059 4.67073 1.52392 4.84146 1.78392 4.84146H5.25059"
      stroke="${htmlColor || "#55534E"}"
      strokeLinecap="round"
      strokeWidth="${strokeWidth || '1'}"
    />
  </svg>`;
};
