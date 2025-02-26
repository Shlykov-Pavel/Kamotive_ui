import React, { FC } from 'react';
import { InputProps } from 'kamotive_ui';
import styles from './Input.module.css'
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

  const wrapperClassess = classNames(styles['wrapper'], {
    'wrapper--left': isLeftLabel,
  });

  const inputWrapperClassess = classNames(styles['wrapper--input']);

  const inputClassess = classNames(styles['inputText'], size, className, {
    'input--error': hasError,
    'readOnly': readOnly,
    'input--withIcon': icon,
    'textarea': multiline,
    'resize': resize,
  });

  const labelClasses = classNames(styles['label'], {
    'label--default': !isLeftLabel,
    'label--left': isLeftLabel,
  });

  const iconClassess = classNames(styles['icon'], {
    'input--withIcon': multiline,
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

      {hasError && helperText && <div className="helperText">{helperText}</div>}
    </div>
  );
};
