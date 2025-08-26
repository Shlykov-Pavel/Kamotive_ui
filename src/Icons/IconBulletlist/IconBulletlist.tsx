import React, { CSSProperties, FC } from 'react';

export const IconBulletlist: FC<{
  color?: string;
  htmlColor?: string;
  strokeWidth?: string;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  style?: CSSProperties;
}> = ({ color = 'inherit', htmlColor, strokeWidth, onClick, style }) => {
  return (
    <svg
      width="14"
      height="11"
      viewBox="0 0 14 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={color}
      onClick={onClick}
      style={style}
    >
      <path
        d="M1.38735 1.77467C1.87741 1.77467 2.27469 1.37739 2.27469 0.887333C2.27469 0.397273 1.87741 0 1.38735 0C0.897278 0 0.5 0.397273 0.5 0.887333C0.5 1.37739 0.897278 1.77467 1.38735 1.77467Z"
        fill={htmlColor || "#55534E"}
      />
      <path
        d="M4.50732 0.886665H12.3508"
        stroke={htmlColor || "#55534E"}
        strokeWidth={strokeWidth || "1.5"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.38735 6.38733C1.87741 6.38733 2.27469 5.99006 2.27469 5.5C2.27469 5.00994 1.87741 4.61267 1.38735 4.61267C0.897278 4.61267 0.5 5.00994 0.5 5.5C0.5 5.99006 0.897278 6.38733 1.38735 6.38733Z"
        fill={htmlColor || "#55534E"}
      />
      <path
        d="M4.50732 5.5H12.3508"
        stroke={htmlColor || "#55534E"}
        strokeWidth={strokeWidth || "1.5"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.38735 11C1.87741 11 2.27469 10.6027 2.27469 10.1127C2.27469 9.62261 1.87741 9.22533 1.38735 9.22533C0.897278 9.22533 0.5 9.62261 0.5 10.1127C0.5 10.6027 0.897278 11 1.38735 11Z"
        fill={htmlColor || "#55534E"}
      />
      <path
        d="M4.50732 10.1133H12.3508"
        stroke={htmlColor || "#55534E"}
        strokeWidth={strokeWidth || "1.5"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const IconBulletlistToString = (
  color = 'inherit',
  htmlColor?: string,
  strokeWidth?: string,
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void,
  style?: CSSProperties
) => {
  return `<svg
    width="14"
    height="11"
    viewBox="0 0 14 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="${color}"
    onclick="${onClick}"
    style="${style}"
  >
    <path
      d="M1.38735 1.77467C1.87741 1.77467 2.27469 1.37739 2.27469 0.887333C2.27469 0.397273 1.87741 0 1.38735 0C0.897278 0 0.5 0.397273 0.5 0.887333C0.5 1.37739 0.897278 1.77467 1.38735 1.77467Z"
      fill="${htmlColor || "#55534E"}"
    />
    <path
      d="M4.50732 0.886665H12.3508"
      stroke="${htmlColor || "#55534E"}"
      strokeWidth="${strokeWidth || "1.5"}"
      strokeLinecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M1.38735 6.38733C1.87741 6.38733 2.27469 5.99006 2.27469 5.5C2.27469 5.00994 1.87741 4.61267 1.38735 4.61267C0.897278 4.61267 0.5 5.00994 0.5 5.5C0.5 5.99006 0.897278 6.38733 1.38735 6.38733Z"
      fill="${htmlColor || "#55534E"}"
    />
    <path
      d="M4.50732 5.5H12.3508"
      stroke="${htmlColor || "#55534E"}"
      strokeWidth="${strokeWidth || "1.5"}"
      strokeLinecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M1.38735 11C1.87741 11 2.27469 10.6027 2.27469 10.1127C2.27469 9.62261 1.87741 9.22533 1.38735 9.22533C0.897278 9.22533 0.5 9.62261 0.5 10.1127C0.5 10.6027 0.897278 11 1.38735 11Z"
      fill="${htmlColor || "#55534E"}"
    />
    <path
      d="M4.50732 10.1133H12.3508"
      stroke="${htmlColor || "#55534E"}"
      strokeWidth="${strokeWidth || "1.5"}"
      strokeLinecap="round"
      stroke-linejoin="round"
    />
  </svg>`;
};
