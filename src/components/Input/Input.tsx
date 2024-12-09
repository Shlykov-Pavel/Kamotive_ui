import React, { FC } from 'react';
import './Input.module.css'; 

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean; 
}

export const Input: FC<InputProps> = ({ value, onChange, placeholder, disabled, hasError }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      className={`input ${hasError ? 'input-error' : ''}`} 
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled} 
    />
  );
};