import React from 'react';
import classNames from 'classnames';
import { IconButtonProps } from '../../types';
import styles from './IconButton.module.css';

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = 'md',
  color,
  style,
  disabled = false,
  onClick,
  children,
  className,
}) => {
  const validChildren = React.Children.toArray(children).filter((child) => React.isValidElement(child));
  const renderIcon = icon || validChildren[0];
  const combinedStyle = {
    ...style,
    ...(style?.backgroundColor && {
      '--hover-background': `color-mix(in srgb, ${style.backgroundColor} 90%, white)`,
    }),
    ...(style?.borderRadius && {
      '--hover-border-radius': style.borderRadius,
    }),
  };

  return (
    <button
      className={classNames(styles['iconButton'], styles[`iconButton--${size}`], className)}
      disabled={disabled}
      aria-disabled={disabled}
      type="button"
      onClick={(e) => onClick(e)}
      style={combinedStyle}
    >
      {renderIcon &&
        React.cloneElement(renderIcon as React.ReactElement, {
          htmlColor: color,
          strokeWidth: size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0',
        })}
    </button>
  );
};
