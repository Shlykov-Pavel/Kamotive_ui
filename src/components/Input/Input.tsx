import React, { FC } from 'react';
import styles from './Input.module.scss';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const Input: FC<InputProps> = ({ value, onChange, placeholder }) => {
  const hanleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
<input
      className={styles.input}
      value={value}
      onChange={(e: { target: { value: string; }; }) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
};

// export default Input;