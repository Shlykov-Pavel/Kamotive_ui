import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { IconButtonProps } from '../../types';
import styles from './IconButton.module.css';

export const IconButton= forwardRef<HTMLButtonElement, IconButtonProps>(({
  icon,
  size = 'md',
  color,
  style,
  disabled = false,
  onClick,
  children,
  className,
  title,
},ref) => {
  const validChildren = React.Children.toArray(children).filter((child) => React.isValidElement(child));
  const renderIcon = icon || validChildren[0];
  const combinedStyle = {
    ...style,
    ...(style?.backgroundColor && {
      '--hover-background': `color-mix(in ${style.backgroundColor} 85%, black)`,
    }),
    ...(style?.borderRadius && {
      '--hover-border-radius': style.borderRadius,
    }),
  };

  return (
    <button
      ref={ref}
      className={classNames(styles['iconButton'], styles[`iconButton--${size}`], className)}
      disabled={disabled}
      aria-disabled={disabled}
      type="button"
      onClick={(e) => onClick(e)}
      style={combinedStyle}
      title={title}
    >
      {renderIcon &&
        (() => {
          const iconElement = renderIcon as React.ReactElement;
          const defaultStrokeWidth = size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0';

          return React.cloneElement(iconElement, {
            htmlColor: color,
            strokeWidth: iconElement.props.strokeWidth ?? defaultStrokeWidth,
          });
        })()}
    </button>
  );
});
