import React from 'react';
;
import styles from './Input.module.css';
import classNames from 'classnames';
import { Typography } from '../Typography/Typography';
/**
 * Компонент Input для создания текстовых полей ввода различных стилей и размеров.
 */
export const Input = ({ id, label, placeholder, size = 'lg', value, className, multiline = false, rows = 4, resize = false, disabled = false, readOnly = false, isLeftLabel = false, icon, error = false, helperText, onChange, required = false, }) => {
    const handleChange = (event) => {
        event.stopPropagation();
        onChange === null || onChange === void 0 ? void 0 : onChange(event);
    };
    const wrapperClassess = classNames(styles['wrapper--input'], {
        [styles['wrapper--left']]: isLeftLabel,
        [styles['wrapper--input-label']]: label && !isLeftLabel && !required,
        [styles['wrapper--input-helperText']]: error,
    });
    const inputClassess = classNames(styles.input, styles[size], className, {
        [styles['input--error']]: error,
        [styles['readOnly']]: readOnly,
        [styles['input--withIcon']]: icon,
        [styles['textarea']]: multiline,
        // [styles['textarea-rows-&{rows}']]: multiline && rows,
        [styles['resize']]: resize,
        [styles['input--left']]: isLeftLabel,
    });
    const labelClasses = classNames(styles.label, styles[size], {
        [styles['label--default']]: !isLeftLabel,
        [styles['label--left']]: isLeftLabel,
        [styles['label--required']]: required,
    });
    return (React.createElement("div", { className: wrapperClassess },
        label && (React.createElement(Typography, { variant: "Caption", className: labelClasses }, label)),
        icon && React.createElement("div", { className: styles.icon }, icon),
        multiline ? (React.createElement("textarea", { id: id, className: inputClassess, value: value, placeholder: placeholder, onChange: handleChange, disabled: disabled, style: { height: `${rows * 20}px` } })) : (React.createElement("input", { id: id, className: inputClassess, value: value, placeholder: placeholder, onChange: handleChange, disabled: disabled, readOnly: readOnly })),
        error && helperText && (React.createElement(Typography, { variant: "Caption", className: classNames(styles.helperText, styles[size]) }, helperText))));
};
