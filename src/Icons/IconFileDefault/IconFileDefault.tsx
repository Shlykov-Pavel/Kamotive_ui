import React, { CSSProperties, FC } from 'react';

export const IconFileDefault: FC<{
  color?: string;
  htmlColor?: string;
  strokeWidth?: string;
  style?: CSSProperties;
  text?: string;
}> = ({ color = 'inherit', htmlColor, strokeWidth = '0.3', style, text }) => {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill={htmlColor || "#6b7280"} />
      <polyline points="14,2 14,8 20,8" fill={htmlColor || "#6b7280"} />
      {text ? (<text x="12" y="16" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold">ZIP</text>) : (<path d="M16 13H8M16 17H8M10 9H8" stroke="white" strokeWidth="1" />)}
    </svg>
  );
};
