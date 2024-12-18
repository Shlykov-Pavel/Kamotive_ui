import React, { ChangeEventHandler, FC, ReactNode } from 'react';
import styles from './Input.module.css';
import { InputProps } from 'kamotive_ui';
import classNames from 'classnames';

/**
 * Компонент Input для создания текстовых полей ввода различных стилей и размеров.
 */

export const Input: FC<InputProps> = ({
  id,
  className,
  value,
  label,
  placeholder,
  size = 'md',
  onChange,
  icon,
  hasError = false,
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

  const wrapperClassess = classNames(styles.wrapper, {
    [styles['left']]: isLeftLabel,
  });

  const inputWrapperClassess = classNames(styles.inputWrapper, {
    [styles['inputWrapper-multiline']]: multiline,
  });

  const inputClassess = classNames(styles.input, styles[size], className, {
    [styles['input-error']]: hasError,
    [styles['read_only']]: readOnly,
    [styles['with_icon']]: icon,
    [styles['textarea']]: multiline,
    [styles['resize']]: resize,
  });

  const labelClasses = classNames(styles.label, {
    [styles['label_default']]: !isLeftLabel,
    [styles['label_left']]: isLeftLabel,
  });

  const iconClassess = classNames(styles.icon, {
    [styles['disabled']]: disabled,
    [styles['icon_multiline']]: multiline,
  });

  return (
    <div className={wrapperClassess}>
      {((value && !isLeftLabel) || isLeftLabel) && (
        <label className={labelClasses} htmlFor={id}>
          {label}
        </label>
      )}
      <div className={inputWrapperClassess}>
        {icon && <div className={iconClassess}>{icon}</div>}
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
      </div>

      {hasError && helperText && <div className={styles.helperText}>{helperText}</div>}
    </div>
  );
};
