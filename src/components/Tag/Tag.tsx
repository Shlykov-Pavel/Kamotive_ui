import React, { FC, useEffect, useRef, useState } from 'react';

import { TagProps } from '../../types';;
import styles from './Tag.module.css';
import classNames from 'classnames';

const hexToRgba = (hex: string, alpha: number): string => {
  //преобразуем в rgba для заднего фона
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// функция для расчёта относительной яркости
const getLuminance = (hexColor: string): number => {
  const rgb = hexColor
    .replace('#', '')
    .match(/.{2}/g)
    ?.map((c) => parseInt(c, 16) / 255);

  if (!rgb) return 0;

  const [r, g, b] = rgb.map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

// функция для проверки контрастности
const getContrastRatio = (color1: string, color2: string): number => {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);

  return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
};

// проверка и смену цвета текста
const adjustTextColor = (backgroundColor: string): string => {
  const white = '#ffffff';
  const black = hexToRgba('#000000', 0.4);
  const contrastWithWhite = getContrastRatio(backgroundColor, white);

  return contrastWithWhite < 1.5 ? black : "";
};

export const Tag: FC<TagProps> = ({ 
  label, 
  color = 'red', 
  closeButton = false, 
  editable = 'false',
  onClick, 
  onChange,
}) => {
  interface CustomCSSProperties extends React.CSSProperties {
    '--close-color'?: string;
    '--placeholder-color'?: string;
  }

  const [newLabel, setNewLabel] = useState(label);
  const [width, setWidth] = useState(0);
  const measurementDivRef = useRef<HTMLDivElement>(null);
  const adjustedColor = adjustTextColor(color) || color

  useEffect(() => {
    if (measurementDivRef.current) {
      const textWidth = measurementDivRef.current.clientWidth;
      setWidth(textWidth);
    }
  }, [newLabel]);

  const handleBlur = () => {
    if (onChange) {
      onChange(newLabel);
    }
  }

  return (
    <span
      className={classNames(styles.tag, !color.startsWith('#') && styles[color])}
      style={
        color.startsWith('#')
          ? {
              color: adjustedColor,
              border: `1px solid ${adjustedColor}`,
              backgroundColor: hexToRgba(color, 0.2),
            }
          : {}
      }
    >
      {editable ? (
        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder={label}
            value={newLabel}
            onChange={(e) => {
              setNewLabel(e.target.value);
            }}
            onBlur={handleBlur}
            style={{
              color: color?.startsWith('#') ? adjustedColor : `var(--${color})`,
              '--placeholder-color': color?.startsWith('#') ? adjustedColor : `var(--${color})`,
              width: `${width}px`,
              minWidth: '25px',
            } as CustomCSSProperties }
          />
          <div
            ref={measurementDivRef}
            style={{
              position: 'absolute',
              visibility: 'hidden',
              height: 0,
              whiteSpace: 'pre',
              fontSize: 'inherit',
              fontFamily: 'inherit',
              fontWeight: 'inherit',
              letterSpacing: 'inherit',
            }}
          >
            {newLabel || 'Item'}
          </div>
        </div>
      ) : (
        <> {label} </>
      )}
      {closeButton && (
        <button
          type="button"
          aria-label="Закрыть"
          style={
            color.startsWith('#')
              ? { '--close-color': adjustedColor }
              : ({ '--close-color': `var(--${color})` } as CustomCSSProperties)
          }
          onClick={onClick}
        />
      )}
    </span>
  );
};