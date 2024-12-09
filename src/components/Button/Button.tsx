import React from 'react';
import clsx from 'clsx'; 
import styles from './Button.module.css'; 

export interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  backgroundColor?: string;
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
      className={clsx(styles.button, styles[`button--${variant}`], styles[`button--${size}`])}
      onClick={onClick}
      style={customStyle}
    >
      {label}
    </button>
  );
};
