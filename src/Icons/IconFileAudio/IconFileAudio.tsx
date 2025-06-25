import React, { CSSProperties, FC } from 'react';

export const IconFileAudio: FC<{ color?: string; htmlColor?: string; strokeWidth?: string; style?: CSSProperties }> = ({
  color = 'inherit',
  htmlColor,
  strokeWidth = '0.3',
  style,
}) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="#059669" />
      <polyline points="14,2 14,8 20,8" fill="#059669" />
      <path d="M9 12v4c0 1 1 2 2 2s2-1 2-2v-4" stroke="white" strokeWidth="1" fill="none" />
      <circle cx="11" cy="10" r="1" fill="white" />
    </svg>
  );
};
