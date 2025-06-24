import React, { CSSProperties, FC } from 'react';

export const IconFileVideo: FC<{ color?: string; htmlColor?: string; strokeWidth?: string; style?: CSSProperties }> = ({
  color = 'inherit',
  htmlColor,
  strokeWidth = '0.3',
  style,
}) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="#dc2626" />
      <polyline points="14,2 14,8 20,8" fill="#dc2626" />
      <polygon points="10,12 16,8 16,16" fill="white" />
    </svg>
  );
};
