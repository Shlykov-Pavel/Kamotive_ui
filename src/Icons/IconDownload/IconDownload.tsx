import React, { CSSProperties, FC } from 'react';

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * IconDownload is a functional component that renders an SVG icon representing a download action.
 * 
 * Props:
 * - color: A string that sets the CSS class for the SVG element, default is 'inherit'.
 * - htmlColor: A string to set the fill and stroke color of the SVG path, defaults to 'currentColor'.

/*******  23580dc5-86f5-4f9d-89cc-230535275091  *******/
export const IconDownload: FC<{ color?: string; htmlColor?: string; strokeWidth?: string, onClick?: (event: React.MouseEvent<SVGSVGElement>) => void; style?: CSSProperties }> = ({
  color = 'inherit',
  htmlColor,
  strokeWidth = '0.3',
  onClick,
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
      onClick={onClick}
      style={style}
    >
      <path
        fill={htmlColor || 'currentColor'}
        stroke={htmlColor || 'currentColor'}
        style={{ strokeWidth: strokeWidth ?? '0.3 !important' }}
        d="M12,4V16.25L17.25,11L18,11.66L11.5,18.16L5,11.66L5.75,11L11,16.25V4H12M3,19H4V21H19V19H20V22H3V19Z"
      />
    </svg>
  );
};
