import React, { FC } from 'react';

import { TagProps } from 'kamotive_ui';
import styles from './Tag.module.css';
import classNames from 'classnames';

export const Tag: FC<TagProps> = ({ label, color = 'red', closeButton = false, onClick }) => {
  interface CustomCSSProperties extends React.CSSProperties {
    '--close-color'?: string;
  }

  const hexToRgba = (hex: string, alpha: number): string => {
    //преобразуем в rgba для заднего фона
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <span
      className={classNames(styles.tag, !color.startsWith('#') && styles[color])}
      style={
        color.startsWith('#')
          ? {
              color: color,
              border: `1px solid ${color}`,
              backgroundColor: hexToRgba(color, 0.2),
            }
          : {}
      }
    >
      {label}
      {closeButton && (
        <button
          type="button"
          aria-label="Закрыть"
          style={
            color.startsWith('#')
              ? { '--close-color': color }
              : ({ '--close-color': `var(--${color})` } as CustomCSSProperties)
          }
          onClick={onClick}
        />
      )}
    </span>
  );
};