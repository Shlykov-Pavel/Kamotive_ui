import React, { FC } from 'react';
import { InputProps } from 'kamotive_ui';
import styles from './Input.module.css';
import classNames from 'classnames';
import { Typography } from '../Typography/Typography';

/**
 * Компонент Input для создания текстовых полей ввода различных стилей и размеров.
 */

export const Input: FC<InputProps> = ({
  id,
  className,
  value,
  label,
  placeholder,
  size = 'lg',
  onChange,
  icon,
  error = false,
  helperText,
  disabled = false,
  readOnly = false,
  isLeftLabel = false,
  multiline = false,
  resize = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  const wrapperClassess = classNames(styles['wrapper--input'], {
    [styles['wrapper--left']]: isLeftLabel,
    [styles['wrapper--input-label']]: label && !isLeftLabel,
    [styles['wrapper--input-helperText']]: error,
  });

  const inputClassess = classNames(styles.input, styles[size], className, {
    [styles['input--error']]: error,
    [styles['readOnly']]: readOnly,
    [styles['input--withIcon']]: icon,
    [styles['textarea']]: multiline,
    [styles['resize']]: resize,
    [styles['input--left']]: isLeftLabel,
  });

  const labelClasses = classNames(styles.label, styles[size], {
    [styles['label--default']]: !isLeftLabel,
    [styles['label--left']]: isLeftLabel,
  });

  return (
    <div className={wrapperClassess}>
      {label && (
        <Typography variant="Caption" className={labelClasses}>
          {label}
        </Typography>
      )}
      {icon && <div className={styles.icon}>{icon}</div>}
      {multiline ? (
        <textarea
          id={id}
          className={inputClassess}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          disabled={disabled}
        />
      ) : (
        <input
          id={id}
          className={inputClassess}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          disabled={disabled}
          readOnly={readOnly}
        />
      )}
      {error && helperText && (
        <Typography variant="Caption" className={classNames(styles.helperText, styles[size])}>
          {helperText}
        </Typography>
      )}
    </div>
  );
};
