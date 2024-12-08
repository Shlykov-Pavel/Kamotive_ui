declare module 'kamotive_ui' {
    import * as React from 'react';
  
    // Типы для Button
    export interface ButtonProps {
      label: string;
      variant?: 'primary' | 'secondary' | 'danger';
      size?: 'small' | 'medium' | 'large';
      onClick?: () => void;
      backgroundColor?: string;
      primary?: boolean;
    }
  
    export const Button: React.FC<ButtonProps>;
  
    // Типы для Input
    export interface InputProps {
      value: string;
      onChange: (value: string) => void;
      placeholder?: string;
    }
  
    export const Input: React.FC<InputProps>;
  }