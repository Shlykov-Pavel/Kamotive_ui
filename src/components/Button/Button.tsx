import React from 'react';
import styles from './Button.module.css';
import classNames from 'classnames';
import { ButtonProps } from '../../types';
import { Typography } from '../Typography/Typography';
/**
 * Компонент Button представляет собой кнопку, которую можно настроить с помощью различных параметров (размер, иконки, стили, состояние).
 */

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  label,
  variant = 'fill',
  size = 'md',
  mode,
  style,
  condition,
  icon,
  disabled = false,
  onClick,
  children,
  error,
  color,
  name,
  type = 'button',
  form,
  className,
  active,
  testId = 'default'
}, ref) => {

  const btnIcon = icon || typeof children === 'object' && children;
  
  let modeStyle = 'text';
  if (mode) {
    modeStyle = mode;
  } else if (btnIcon && variant !== 'link') {
    modeStyle = (!label && !children) ? 'icon' : 'default';
  }
  
  const buttonCondition = error ? 'error' : (condition || 'default');
  const buttonClasses = classNames(
    styles['button'],
    styles[`button--${size}`],
    styles[`button--${modeStyle}`],
    className,
    {
    [styles[`button--${variant}-${buttonCondition}`]]: buttonCondition && !color,
    [styles[`button--${variant}-custom`]]: color && !error,
    [styles[`button--${variant}-${buttonCondition}--active`]]: active && buttonCondition && !color,
    },
  );  
  
  const iconColorFn = () => {
    if (buttonCondition && !color){
      switch (buttonCondition) {
        case 'default':
          if (variant === 'outline') {
            return disabled ? '#8dc6ef' : '#0d99ff';
          }
          return '#FFFFFF';
        case 'error':
          if (variant === 'outline') {
            return disabled ? '#ff8d87' : '#ff3b30';
          }
          return '#FFFFFF';
        case 'success':
          if (variant === 'outline') {
            return disabled ? '#8ac99a' : '#34c759';
          }
          return '#FFFFFF';
        case 'warning':
          if (variant === 'outline') {
            return disabled ? '#ffb44a' : '#ff9500';
          }
          return '#FFFFFF';
        case 'info':
          return disabled ? 'var(--gray-disabled)' : '#6F6F6F';
        default:
          return  '#FFFFFF';
      }
    } 
    else if (color && !error) {
      if (variant === 'outline') {
        return disabled ? `color-mix(in srgb, ${color} 50%, white)` : color;
      }
      return '#FFFFFF';
    }
  };
  const iconColorStyle = iconColorFn(); 


  if (!modeStyle) {
    return (
      <button data-test-id={`${testId}-button`} className={buttonClasses}>
        <Typography variant="Body1" testId={`${testId}-button`}>Кнопка</Typography>
      </button>
    );
  }

  return (
    <button data-test-id={`${testId}-button`} className={buttonClasses}  
    ref={ref}
    style={{
      ...style,
      ...(color && !error ? {
      '--button-color': color,
      '--button-hover-color': variant === 'fill' || variant === 'link' ? `color-mix(in srgb, ${color} 90%, black)` : `color-mix(in srgb, ${color} 10%, transparent)`,
      '--button-active-color':  variant === 'fill' || variant === 'link' ? `color-mix(in srgb, ${color} 80%, black)` : `color-mix(in srgb, ${color} 20%, transparent)`,
      '--button-disabled-color':  variant === 'fill' || variant === 'link' ? `color-mix(in srgb, ${color} 80%, white)` : `color-mix(in srgb, ${color} 10%, transparent)`,
      '--button-disabled-textColor':  variant === 'fill' ? `color-mix(in srgb, ${color} 80%, white)` : `color-mix(in srgb, ${color} 50%, transparent)`,
      } : {})
      } as React.CSSProperties
      }
      onClick={(e)=>onClick?.(e)} 
      disabled={disabled}
      aria-disabled={disabled}
      type={type}
      name={name ? name : label ? `button-${label}` : 'button'}
      form={form}
      >
      {btnIcon && (modeStyle === 'icon' || modeStyle === 'default') && (() => {
        const iconElement = btnIcon as React.ReactElement;
        const defaultStrokeWidth = size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0';
 
        return (
          <span 
            data-test-id={`${testId}-button-icon`}
            className="button-icon-wrapper" 
            style={{ display: 'inline-flex' }}
          >
            {React.cloneElement(iconElement, {
              htmlColor: iconColorStyle,
              strokeWidth: iconElement.props.strokeWidth ?? defaultStrokeWidth,
            })}
          </span>
        );
      })()}
      {(modeStyle === 'text' || modeStyle === 'default') && (
        <Typography testId={`${testId}-button`} variant="Body1">{label ? label : typeof children === 'string' && children}</Typography>
      )}
    </button>
  );
});
