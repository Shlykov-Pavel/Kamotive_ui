import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './ColorPicker.module.css';
import classNames from 'classnames';

import { Chrome } from '@uiw/react-color';
import EditableInput from '@uiw/react-color-editable-input';
import { ColorResult } from '@uiw/react-color';
import { GithubPlacement } from '@uiw/react-color-github';
import { IconColorPicker10 } from '../../Icons';

export interface ColorPickerProps {
  /**
   * @description Цвет выбранный пользователем
   */
  color?: string;
   /**
   * @description Основной цвет
   */
   mainColor?: string;
   /** @description Последние использованные цвета
   */
  recentColors?: string[];
  /**
   * @description Ширина ColorPicker
   */
  width?: number;
  /**
   * @description Высота ColorPicker
   */
  height?: number;
  /**
   * @description Автофокус ColorPicker
   */
  autoOpen?: boolean;
  /**
   * @description Функция обработки изменения цвета
   */
  onChange?: (color: string) => void;
}
export const ColorPicker: FC<ColorPickerProps> = ({
  color = '#ffffff',
  mainColor,
  recentColors,
  width = 20,
  height = 20,
  autoOpen = false,
  onChange,
}) => {
 
  const [colorValue, setColorValue] = useState(mainColor);
  const [selectedColor, setSelectedColor] = useState(color);
  const [isColorChanged, setIsColorChanged] = useState(false);
  const [isOpen, setIsOpen] = useState(autoOpen);
  const [popoverPosition, setPopoverPosition] = useState<'top' | 'bottom'>('bottom');
  const circleRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Обработчик клика вне компонента развертывания выбора цвета
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen && 
        popoverRef.current && 
        circleRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !circleRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen && circleRef.current && popoverRef.current) {
      const circle = circleRef.current.getBoundingClientRect();
      const popover = popoverRef.current.getBoundingClientRect();
      const viewport = {
        top: 0,
        bottom: window.innerHeight
      };

      // Проверяем, достаточно ли места снизу
      const bottomSpace = viewport.bottom - circle.bottom;
      const topSpace = circle.top - viewport.top;

      // Если снизу недостаточно места и сверху места больше, размещаем сверху
      if (bottomSpace < popover.height && topSpace > bottomSpace) {
        setPopoverPosition('top');
      } else {
        setPopoverPosition('bottom');
      }
    }
 
    !autoOpen && document.addEventListener('mousedown', handleClickOutside);
    return () => {
      !autoOpen && document.removeEventListener('mousedown', handleClickOutside);}
  }, [isOpen]);

  const mainColorClasses = classNames(styles.circle, {
    [styles['mainColor']]: mainColor,
  });

  const colorCircleDefaultClasses = classNames(styles.circle, {
    [styles.colorCircleDefault]: color === '#ffffff' && !isColorChanged || isColorChanged && selectedColor !== colorValue});

  const popoverClassess = classNames(styles.popover, {
    [styles[`popover--${popoverPosition}`]]: true,
  });
  
  // Функция для преобразования HEXA в HEX
  const hexaToHex = (hexa: string = 'fff'): string => {
    const cleanHex = hexa.replace('#', '');
    if (cleanHex.length >= 8) {
      return `#${cleanHex.slice(0, 6)}`;
    }
    if (cleanHex.length === 6) {
      return `#${cleanHex}`;
    }
    if (cleanHex.length === 3) {
      return `#${cleanHex[0]}${cleanHex[0]}${cleanHex[1]}${cleanHex[1]}${cleanHex[2]}${cleanHex[2]}`;
    }
    if (cleanHex.length < 6) {
      return `#${cleanHex + '0'.repeat(6 - cleanHex.length)}`;
    }
    return '#ffffff';
  };
  const colorChangeHandler = (color: ColorResult | string) => {
    const newColor = typeof color === 'string' ? color : color.hexa;
    setIsColorChanged(true);
    setColorValue(newColor);
    setSelectedColor(newColor);
    onChange?.(newColor);
  };

  useEffect(()=>{
    setSelectedColor(color);
  },[color])
  
  return (
  <div className={(mainColor || recentColors) && styles.colorPickerWrapper}>
    {mainColor && <div className={mainColorClasses} style={{ 
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: colorValue
        }} />}
      {recentColors && recentColors.map((color, index) => (
        <div
          key={index}
          className={styles.circle}
          style={{  
            width: `${width}px`,
            height: `${height}px`,
            backgroundColor: color }}
          onClick={() =>setColorValue(color)}
        />
      ))}
     
      <div className={styles.colorPicker}>
      <div 
      ref={circleRef}
        className={colorCircleDefaultClasses}
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          width:`${width}px`,
          height:`${height}px`,
          backgroundColor: selectedColor
        }}
        
      />
      {isOpen && (
        <div ref={popoverRef} className={popoverClassess}>
          {isOpen && <IconColorPicker10 className={styles.colorPickerIcon} htmlColor={'var(--white)'}/> } 
          <Chrome
            color={selectedColor}
            placement={GithubPlacement.Right}
            onChange={colorChangeHandler}
            className={styles.customChrome}
            showEyeDropper={false}

          />
          <div className={styles.hex} style={{ padding: '0 10px 0 20px' }}>
            <EditableInput
              value={hexaToHex(selectedColor)}
              style={{ width: 68, alignItems: 'flex-start' }}
              onChange={(e, color) => {
                const formattedColor = hexaToHex(color.toString());
                // colorChangeHandler(`#${ formattedColor }`)
                colorChangeHandler(formattedColor);
              }}            
              />
          </div>
        </div>
      )}
      </div>

    </div>
  );
};

export default ColorPicker;