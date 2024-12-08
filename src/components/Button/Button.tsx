import React from 'react';
import styles from './Button.module.scss'; 

export interface ButtonProps {
  label: string; 
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large'; 
  onClick?: () => void; 
  backgroundColor?: string; 
  primary?: boolean; 
}

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  size = 'medium',
  onClick,
  backgroundColor,
}) => {
  const customStyle = backgroundColor ? { backgroundColor } : {}; 

  return (
    <button
      // className={`${styles.button}` `${styles[button--${variant}]}` `${styles[button--${size}]}`}
      className={
        styles.button +
        ' ' +
        styles['button--' + variant] +
        ' ' +
        styles['button--' + size]
      }
      onClick={onClick}
      style={customStyle} 
    >
      {label}
    </button>
  );
};

