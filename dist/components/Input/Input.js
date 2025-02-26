import React from 'react';
import styles from './Input.module.css';
import classNames from 'classnames';
/**
 * Компонент Input для создания текстовых полей ввода различных стилей и размеров.
 */
export const Input = ({ id, className, value, label, placeholder, size = 'md', onChange, icon, hasError = false, helperText, disabled = false, readOnly = false, isLeftLabel = false, multiline = false, resize = false, }) => {
    const handleChange = (e) => {
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
    return (React.createElement("div", { className: wrapperClassess },
        ((value && !isLeftLabel) || isLeftLabel) && (React.createElement("label", { className: labelClasses, htmlFor: id }, label)),
        React.createElement("div", { className: inputWrapperClassess },
            icon && React.createElement("div", { className: iconClassess }, icon),
            multiline ? (React.createElement("textarea", { id: id, className: inputClassess, value: value, placeholder: placeholder, onChange: handleChange, disabled: disabled })) : (React.createElement("input", { id: id, className: inputClassess, value: value, placeholder: placeholder, onChange: handleChange, disabled: disabled, readOnly: readOnly }))),
        hasError && helperText && React.createElement("div", { className: "helperText" }, helperText)));
};
