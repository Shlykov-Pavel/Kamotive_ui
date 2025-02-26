import React from 'react';
import styles from './RadioButton.module.css';
import classNames from 'classnames';
export const RadioButton = ({ value, label, checked, onChange, disabled = false, size = 'sm' }) => {
    const handleChange = (e) => {
        if (onChange) {
            onChange(e);
        }
    };
    return (React.createElement("label", { className: styles["radio"] },
        React.createElement("input", { type: "radio", checked: checked, value: value, onChange: handleChange, disabled: disabled, className: classNames(styles['input'], size) }),
        label));
};
