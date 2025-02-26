import React from 'react';
import styles from './ToggleButton.module.css';
import classNames from 'classnames';
export const ToggleButton = ({ value, onChange, disabled = false, size = 'sm', label }) => {
    const handleChange = (e) => {
        if (onChange) {
            onChange(e);
        }
    };
    return (React.createElement("label", { className: styles['toggle'] },
        React.createElement("input", { type: "checkbox", checked: value, onChange: handleChange, disabled: disabled, className: classNames(styles['toggleInput'], `${size}`) }),
        label));
};
